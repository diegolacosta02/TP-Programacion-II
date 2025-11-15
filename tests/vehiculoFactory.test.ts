import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import VehiculoFactory from "../src/vehiculoFactory";
import { IGestorTemporadas } from "../src/IGestorTemporadas";
import Compacto from "../src/compacto";
import Sedan from "../src/sedan";
import SUV from "../src/suv";

describe("Test de clase VehiculoFactory", () => {
    let factory: VehiculoFactory;
    let gestorMock: DeepMockProxy<IGestorTemporadas>;

    beforeEach(() => {
        gestorMock = mockDeep<IGestorTemporadas>();
        factory = new VehiculoFactory(gestorMock);
    });

    it("debería crear un vehículo tipo Compacto", () => {
        const vehiculo = factory.crearVehiculo("compacto", 123);
        expect(vehiculo).toBeInstanceOf(Compacto);
        expect(vehiculo.getMatricula()).toBe(123);
    });

    it("debería crear un vehículo tipo Sedan", () => {
        const vehiculo = factory.crearVehiculo("sedan", 456);
        expect(vehiculo).toBeInstanceOf(Sedan);
        expect(vehiculo.getMatricula()).toBe(456);
    });

    it("debería crear un vehículo tipo SUV", () => {
        const vehiculo = factory.crearVehiculo("suv", 789);
        expect(vehiculo).toBeInstanceOf(SUV);
        expect(vehiculo.getMatricula()).toBe(789);
    });

    it("debería lanzar un error si el tipo de vehículo es desconocido", () => {
        try {
            const vehiculo = factory.crearVehiculo("auto", 789);
        } catch (error: any) {
            expect(error.message).toEqual("Tipo de vehículo desconocido: auto")
        }
    });
})