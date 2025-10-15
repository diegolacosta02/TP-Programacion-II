import Sedan from "../src/sedan";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";

describe("Calculadora de tarifas para Sedán", () => {
    let fechaInicio: Date;
    let fechaFin: Date;
    let cliente: Cliente;
    let vehiculo: Vehiculo;
    let reserva: Reserva;

    beforeEach(() => {
        fechaInicio = new Date("2025-09-13");
        fechaFin = new Date("2025-09-20");
        cliente = new Cliente(456, "Cliente", 87654321)
        vehiculo = new Sedan(456)
        reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin);
    });

    it("Debe cobrar tarifa base más cargo por km (sin límite)", () => {
        reserva.setKmRecorridos(200);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 200 * 0.20);
    });

    it("Debe calcular correctamente si no recorrió km", () => {
        reserva.setKmRecorridos(0);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7);
    });
});
