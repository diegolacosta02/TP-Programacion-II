import Reserva from "../src/reserva"
import Cliente from "../src/cliente"
import Compacto from "../src/compacto"

describe("Reserva getters de fechas", () => {
    let fechaInicio:Date
    let fechaFin:Date
    let cliente:Cliente
    let compacto:Compacto
    let reserva:Reserva

    beforeEach(() =>{
    fechaInicio = new Date("2025-09-01")
    fechaFin = new Date("2025-09-05")

    cliente = {} as Cliente
    compacto = {} as Compacto
    reserva = new Reserva(cliente, compacto, fechaInicio, fechaFin)
    })

    it("debería devolver la fecha de inicio correctamente", () => {
        expect(reserva.getFechaInicio()).toBe(fechaInicio)
    })

    it("debería devolver la fecha de fin correctamente", () => {
        expect(reserva.getFechaFin()).toBe(fechaFin)
    })
})
    