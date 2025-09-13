import Compacto from "../src/compacto"
import Reserva from "../src/reserva"
import Cliente from "../src/cliente"

describe("Calculadora de tarifas para Compactos",() =>{
    let fechaInicio:Date
    let fechaFin:Date
    let cliente:Cliente
    let compacto:Compacto
    let reserva:Reserva

    beforeEach(()=>{
        fechaInicio = new Date("2025-09-13")
        fechaFin = new Date("2025-09-20")
        cliente = new Cliente()
        compacto = new Compacto()
        reserva = new Reserva(cliente, compacto, fechaInicio, fechaFin)
    })

    it("Debe cobrar solo la tarifa base si no se superan los km diarios", () =>{
        reserva.setKmRecorridos(500)
        expect(compacto.calcularTarifa(reserva)).toBe(30*7)
    })
    it("Debe cobrar solo la tarifa base si se recorren exactamente los km diarios", () =>{
        reserva.setKmRecorridos(700)
        expect(compacto.calcularTarifa(reserva)).toBe(30*7)
    })
    it("Debe cobrar extra si se superan los km diarios", () =>{
        reserva.setKmRecorridos(800)
        const extra = (800 - 700) * 0.15
        expect(compacto.calcularTarifa(reserva)).toBe(30*7 + extra)
    })
})