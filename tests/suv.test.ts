import SUV from "../src/suv";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";

describe("Calculadora de tarifas para SUV", () => {
    let fechaInicio: Date;
    let fechaFin: Date;
    let cliente: Cliente;
    let vehiculo: Vehiculo;
    let reserva: Reserva;

    beforeEach(() => {
        fechaInicio = new Date("2025-09-13");
        fechaFin = new Date("2025-09-20");
        cliente = new Cliente(789, "Cliente", 11223344)
        vehiculo = new SUV("Vehículo 1", 789)
        reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin);
    });

    it("Debe cobrar tarifa base + seguro sin cargo adicional si no pasa los 500 km", () => {
        reserva.setKmRecorridos(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(
            80 * 7 + 15 * 7
        );
    });

    it("Debe cobrar tarifa base + seguro + cargo adicional si pasa los 500 km", () => {
        reserva.setKmRecorridos(600);
        expect(vehiculo.calcularTarifa(reserva)).toBe(
            80 * 7 + 15 * 7 + (600 - 500) * 0.25 
        );
    });

});
