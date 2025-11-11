import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import GestorTemporadas from "../src/gestorTemporadas";
import { Temporada } from "../src/temporadas";

describe("Test de clase DriveHub", () => {
      let gestor: GestorTemporadas;
      let reserva: DeepMockProxy<Reserva>;
      let fechaInicio: Date;
      let fechaFin: Date;
    
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


    it("debería devolver temporada alta en diciembre, enero o febrero", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-12-02"));
        expect(gestor.getTemporada(reserva)).toBe(Temporada.ALTA);
    });

    it("debería devolver temporada baja correctamente", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-07-02"));
        expect(gestor.getTemporada(reserva)).toBe(Temporada.BAJA);
    });

    it("debería devolver temporada media correctamente", () => {
        reserva.getFechaInicio.mockReturnValue(new Date("2025-04-02"));
        expect(gestor.getTemporada(reserva)).toBe(Temporada.MEDIA);
    });

});