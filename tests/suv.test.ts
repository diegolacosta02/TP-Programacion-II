import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import SUV from "../src/suv";
import Reserva from "../src/reserva";

describe("Calculadora de tarifas para SUV", () => {
    let reserva: DeepMockProxy<Reserva>;
    let vehiculo: SUV;

    beforeEach(() => {
        reserva = mockDeep<Reserva>();

        vehiculo = new SUV(789);
        reserva.getDiasReservados.mockReturnValue(7);
    });

    it("Debe cobrar tarifa base + seguro sin cargo adicional en temporada media", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-03"));
        reserva.getKmRecorridos.mockReturnValue(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7);
    });

    it("Debe cobrar tarifa base + seguro + cargo adicional en temporada media", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"));
        reserva.getKmRecorridos.mockReturnValue(600);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 + 600 * 0.25);
    });

    it("Debe aplicar un recargo del 20% en temporada alta", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-01-15"));
        reserva.getKmRecorridos.mockReturnValue(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 + 80 * 7 * 0.20);
    });

    it("Debe aplicar un descuento del 10% en temporada baja", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-07-10"));
        reserva.getKmRecorridos.mockReturnValue(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 - 80 * 7 * 0.10);
    });

    it("Debe aplicar descuento y cargo adicional en temporada baja", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-06-20"));
        reserva.getKmRecorridos.mockReturnValue(800);
        expect(vehiculo.calcularTarifa(reserva)).toBe(80 * 7 + 15 * 7 + 800 * 0.25 - 80 * 7 * 0.10);
    });    
});

