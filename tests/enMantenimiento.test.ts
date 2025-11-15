import EnMantenimiento from "../src/enMantenimiento";
import Vehiculo from "../src/vehiculo";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

describe("Test de estado EnMantenimietno", () => {

    let enMantenimiento: EnMantenimiento;
    let vehiculo: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        enMantenimiento = new EnMantenimiento();
        vehiculo = mockDeep<Vehiculo>();
    });

    it("Debe lanzar error el método puedeReservarse es invocado", () => {
        try {
            enMantenimiento.puedeReservarse(vehiculo)
        } catch (error:any) {
            expect(error.message).toEqual("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("getNombre debe devolver 'EN MANTENIMIENTO'", () => {
        expect(enMantenimiento.getNombre()).toBe("EN MANTENIMIENTO");
    });

});