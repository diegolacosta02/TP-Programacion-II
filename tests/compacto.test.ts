import Compacto from "../src/compacto"
import { IGestorTemporadas } from "../src/IGestorTemporadas"
import Reserva from "../src/reserva"
import { DeepMockProxy, mock, mockDeep } from 'jest-mock-extended'

describe("Calculadora de tarifas para Compactos",() =>{
    let compacto:Compacto
    let reserva: DeepMockProxy<Reserva>;
    let gestorTemporadas: DeepMockProxy<IGestorTemporadas>;

    beforeEach(()=>{
        gestorTemporadas = mockDeep<IGestorTemporadas>()
        reserva = mockDeep<Reserva>()
        reserva.getDiasReservados.mockReturnValue(7)
        compacto = new Compacto(1011, gestorTemporadas)
    })

    it("Debe cobrar solo la tarifa base si no se superan los km diarios", () =>{
        gestorTemporadas.getPorcentajeTemporada.mockReturnValue(0)
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"))
        reserva.getKmRecorridos.mockReturnValue(500)
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7)
    })
    it("Debe cobrar solo la tarifa base si se recorren exactamente los km diarios", () =>{
        gestorTemporadas.getPorcentajeTemporada.mockReturnValue(0)
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"))
        reserva.getKmRecorridos.mockReturnValue(700)
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7)
    })
    it("Debe cobrar extra si se superan los km diarios", () => {
        gestorTemporadas.getPorcentajeTemporada.mockReturnValue(0)
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"))
        reserva.getKmRecorridos.mockReturnValue(800)
        const extra = 800 * 0.15
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7 + extra)
    })

    it("Debe aplicar un recargo de 20% en temporada alta", () => {
        gestorTemporadas.getPorcentajeTemporada.mockReturnValue(20)
        reserva.getFechaInicio.mockReturnValue(new Date("2025-01-10"))
        reserva.getKmRecorridos.mockReturnValue(700)
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7 + 30 * 7 * 0.20)
    })

    it("Debe aplicar un descuento del 10% en temporada baja", () => {
        gestorTemporadas.getPorcentajeTemporada.mockReturnValue(-10)
        reserva.getFechaInicio.mockReturnValue(new Date("2025-07-10"))
        reserva.getKmRecorridos.mockReturnValue(700)
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7 - 30 * 7 * 0.10)
    })    
})