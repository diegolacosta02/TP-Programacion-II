import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import SUV from "../src/suv";
import Reserva from "../src/reserva";

describe("Calculadora de tarifas para SUV", () => {
    let reserva: DeepMockProxy<Reserva>;
    let vehiculo: SUV;

    beforeEach(() => {
        reserva = mockDeep<Reserva>();

        vehiculo = new SUV(789);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-04-01"));
        reserva.getDiasReservados.mockReturnValue(7);
    });

    it("Debe cobrar tarifa base + seguro sin cargo adicional si no pasa los 500 km", () => {
        reserva.getKmRecorridos.mockReturnValue(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7);
    });

    it("Debe cobrar tarifa base + seguro + cargo adicional si pasa los 500 km", () => {
        reserva.getKmRecorridos.mockReturnValue(600);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 + 600 * 0.25);
    });
});

