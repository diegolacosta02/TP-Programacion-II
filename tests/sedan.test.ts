import Sedan from "../src/sedan";
import Reserva from "../src/reserva";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { IGestorTemporadas } from "../src/IGestorTemporadas";

describe("Calculadora de tarifas para Sedán", () => {
    let vehiculo: Sedan;
    let reserva: DeepMockProxy<Reserva>;
    let gestor: DeepMockProxy<IGestorTemporadas>;

    beforeEach(() => {
        gestor = mockDeep<IGestorTemporadas>();
        vehiculo = new Sedan(456, gestor);
        reserva = mockDeep<Reserva>();
        reserva.getDiasReservados.mockReturnValue(7);
    });

    it("Debe cobrar tarifa base más cargo por km (sin límite) en temporada media", () => {
        gestor.getPorcentajeTemporada.mockReturnValue(0);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"));
        reserva.getKmRecorridos.mockReturnValue(200);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 200 * 0.2);
    });

    it("Debe calcular correctamente si no recorrió km en temporada media", () => {
        gestor.getPorcentajeTemporada.mockReturnValue(0);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"));
        reserva.getKmRecorridos.mockReturnValue(0);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7);
    });

    it("Debe aplicar un recargo del 20% en temporada alta", () => {
        gestor.getPorcentajeTemporada.mockReturnValue(20);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-01-15"));
        reserva.getKmRecorridos.mockReturnValue(400);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 400 * 0.2 + 50 * 7 * 0.20);
    });

    it("Debe aplicar un descuento del 10% en temporada baja", () => {
        gestor.getPorcentajeTemporada.mockReturnValue(-10);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-07-10"));
        reserva.getKmRecorridos.mockReturnValue(500);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 500 * 0.2 - 50 * 7 * 0.10);
    });

    it("Debe aplicar descuento y cargo por km correctamente en temporada baja", () => {
        gestor.getPorcentajeTemporada.mockReturnValue(-10);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-06-15"));
        reserva.getKmRecorridos.mockReturnValue(900);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 900 * 0.2 - 50 * 7 * 0.10);
    });
});   
