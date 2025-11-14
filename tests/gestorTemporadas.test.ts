import Reserva from "../src/reserva";
import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";
import GestorTemporadas from "../src/gestorTemporadas";

describe("Test de GestorTemporadas", () => {
      let gestor: GestorTemporadas;
      let reserva: DeepMockProxy<Reserva>;
    
    beforeEach(() => {
        gestor = new GestorTemporadas();
        reserva = mockDeep<Reserva>();
    });
    
    it("debería calcular el pocentaje correctamente en temporada alta", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-12-2"));
        expect(gestor.getPorcentajeTemporada(reserva)).toBe(20);
    });

    it("debería calcular el pocentaje correctamente en temporada media", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-04-2"));
        expect(gestor.getPorcentajeTemporada(reserva)).toBe(0);
    });

    it("debería calcular el pocentaje correctamente en temporada baja", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-06-02"));
        expect(gestor.getPorcentajeTemporada(reserva)).toBe(-10);
    });

});