import Compacto from "../src/compacto"
import Reserva from "../src/reserva"
import Cliente from "../src/cliente"
import Vehiculo from "../src/vehiculo"

describe("Calculadora de tarifas para Compactos", () => {
    let fechaInicio: Date
    let fechaFin: Date
    let cliente: Cliente
    let vehiculo: Vehiculo
    let reserva: Reserva

    beforeEach(() => {
        fechaInicio = new Date("2025-09-13")
        fechaFin = new Date("2025-09-20")
        cliente = new Cliente(123, "Cliente", 12345678)
        vehiculo = new Compacto("Vehículo 1", 123)
        reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin)
    })

    it("Debe cobrar solo la tarifa base si no se superan los km", () => {
        reserva.setKmRecorridos(100)
        expect(vehiculo.calcularTarifa(reserva)).toBe(30 * 7)
    })

    it("Debe cobrar extra si se superan los km", () => {
        reserva.setKmRecorridos(150)
        const adicional = (150 - 100) * 0.15
        expect(vehiculo.calcularTarifa(reserva)).toBe(30 * 7 + adicional)
    })
})

