import Disponible from "../src/disponible";
import Vehiculo from "../src/vehiculo";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

describe("Test de estado Disponible", () => {

    let disponible: Disponible;
    let vehiculo: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        disponible = new Disponible();
        vehiculo = mockDeep<Vehiculo>();
    });

    it("Debe permitir reservarse si cumple con todos los criterios", () => {
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(5000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(2);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2024-12-10"));

        expect(disponible.puedeReservarse(vehiculo)).toBe(true);
    });

    it("Debe lanzar error si supera los kilómetros permitidos", () => {
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(200000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(1);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2024-12-10"));

        try {
            disponible.puedeReservarse(vehiculo)
        } catch (error:any) {
            expect(error.message).toEqual("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("Debe lanzar error si supera la cantidad de alquileres permitidos", () => {
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(3000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(6);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2024-10-10"));

        try {
            disponible.puedeReservarse(vehiculo)
        } catch (error:any) {
            expect(error.message).toEqual("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("Debe lanzar error si pasó más de 1 año desde el último mantenimiento", () => {
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2020-10-10"));
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(2000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(1);

        try {
            disponible.puedeReservarse(vehiculo)
        } catch (error:any) {
            expect(error.message).toEqual("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("getNombre debe devolver 'DISPONIBLE'", () => {
        expect(disponible.getNombre()).toBe("DISPONIBLE");
    });

});