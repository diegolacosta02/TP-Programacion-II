import SUV from "../src/suv";
import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import { mock } from 'jest-mock-extended'

describe("Calculadora de tarifas para SUV", () => {
    let fechaInicio: Date;
    let fechaFin: Date;
    let cliente: Cliente;
    let vehiculo: SUV;
    let reserva: Reserva;

    beforeEach(() => {
        fechaInicio = new Date("2025-09-13");
        fechaFin = new Date("2025-09-20");
        cliente = mock<Cliente>()
        vehiculo = new SUV("Territory", 789)
        reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin);
    });

    it("Debe cobrar tarifa base + seguro sin cargo adicional si no pasa los 500 km", () => {
        reserva.setKmRecorridos(200);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7);
    });

    it("Debe cobrar tarifa base + seguro + cargo adicional si pasa los 500 km", () => {
        reserva.setKmRecorridos(600);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 + (600 - 500) * 0.25);
    });

});
