import Sedan from "../src/sedan";
import Reserva from "../src/reserva";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

describe("Calculadora de tarifas para Sedán", () => {
    let vehiculo: Sedan;
    let reserva: DeepMockProxy<Reserva>;

    beforeEach(() => {
        vehiculo = new Sedan(456)
        reserva = mockDeep<Reserva>();
        reserva.getDiasReservados.mockReturnValue(7);
        reserva.getFechaInicio.mockReturnValue(new Date("2025-09-13"))
    });

    it("Debe cobrar tarifa base más cargo por km (sin límite) en temporada media", () => {
        reserva.getKmRecorridos.mockReturnValue(200);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7 + 200 * 0.2);
    });

    it("Debe calcular correctamente si no recorrió km en temporada media", () => {
        reserva.getKmRecorridos.mockReturnValue(0);
        expect(vehiculo.calcularTarifa(reserva)).toBe(50 * 7);
    });
});
