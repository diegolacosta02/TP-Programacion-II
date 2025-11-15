import EnAlquiler from "../src/enAlquiler";
import Vehiculo from "../src/vehiculo";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

describe("Test de estado EnAlquiler", () => {

    let enAlquiler: EnAlquiler;
    let vehiculo: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        enAlquiler = new EnAlquiler();
        vehiculo = mockDeep<Vehiculo>();
    });

    it("Debe lanzar error el método puedeReservarse es invocado", () => {
        try {
            enAlquiler.puedeReservarse(vehiculo)
        } catch (error:any) {
            expect(error.message).toEqual("El vehículo no está disponible. Se encuentra en alquiler.")
        }
    });

    it("getNombre debe devolver 'EN ALQUILER'", () => {
        expect(enAlquiler.getNombre()).toBe("EN ALQUILER");
    });

});