import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import Compacto from "../src/compacto";
import SUV from "../src/suv";
import Mantenimiento from "../src/mantenimiento";

describe("Test de los métodos de la clase Vehículo", () => {
    let compacto: Compacto;
    let suv: SUV;
    let mantenimiento: DeepMockProxy<Mantenimiento>;

    beforeEach(() => {
        compacto = new Compacto(1234);
        suv = new SUV(5678);
        mantenimiento = mockDeep<Mantenimiento>();
        mantenimiento.getCosto.mockReturnValue(100);
    });

    it("debería agregar un mantenimiento correctamente a Compacto y reiniciar los alquileres a 0", () => {
        compacto.setMantenimiento(mantenimiento);
        expect(compacto.getHistorialMantenimiento()).toContain(mantenimiento);
        expect(compacto.getAlquileresDesdeUltMantenimiento()).toBe(0);
    });

    it("debería calcular el costo total de mantenimientos de SUV correctamente", () => {
        suv.setMantenimiento(mantenimiento);
        suv.setMantenimiento(mantenimiento);
        expect(suv.getCostoTotalMantenimientos()).toBe(200);
    });

    it("debería actualizar el kilometraje correctamente en Compacto", () => {
        compacto.setKilometraje(150);
        expect(compacto.getKilometraje()).toBe(150);
        compacto.setKilometraje(50);
        expect(compacto.getKilometraje()).toBe(200); 
    });

    it("debería actualizar los alquileres desde el último mantenimiento correctamente en SUV", () => {
        suv.setAlquileresDesdeUltMantenimiento(2);
        expect(suv.getAlquileresDesdeUltMantenimiento()).toBe(2);
        suv.setAlquileresDesdeUltMantenimiento(3);
        expect(suv.getAlquileresDesdeUltMantenimiento()).toBe(5);
    });
});

