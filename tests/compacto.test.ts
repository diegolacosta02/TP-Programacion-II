import Compacto from "../src/compacto"
import Reserva from "../src/reserva"
import { DeepMockProxy, mock, mockDeep } from 'jest-mock-extended'

describe("Calculadora de tarifas para Compactos",() =>{
    let compacto:Compacto
    let reserva: DeepMockProxy<Reserva>;

    beforeEach(()=>{
        compacto = new Compacto(1011);
        reserva = mockDeep<Reserva>();
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"))
        reserva.getDiasReservados.mockReturnValue(7);
    })

    it("Debe cobrar solo la tarifa base si no se superan los km diarios", () =>{
        reserva.getKmRecorridos.mockReturnValue(500)
        expect(compacto.calcularTarifa(reserva)).toBe(30*7)
    })
    it("Debe cobrar solo la tarifa base si se recorren exactamente los km diarios", () =>{
        reserva.getKmRecorridos.mockReturnValue(700)
        expect(compacto.calcularTarifa(reserva)).toBe(30*7)
    })
    it("Debe cobrar extra si se superan los km diarios", () =>{
        reserva.getKmRecorridos.mockReturnValue(800)
        const extra = 800 * 0.15
        expect(compacto.calcularTarifa(reserva)).toBe(30 * 7 + extra)
    })
})