import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import VerificadorVehiculo from "../src/verificadorVehiculo";
import Vehiculo from "../src/vehiculo";
import { EstadoVehiculo } from "../src/estado-vehiculo";

describe("VerificadorVehiculo", () => {
    let verificador: VerificadorVehiculo;
    let vehiculo: DeepMockProxy<Vehiculo>;

    beforeEach(() => {
        verificador = new VerificadorVehiculo();
        vehiculo = mockDeep<Vehiculo>();
    });

    it("Debe lanzar error si el vehículo está en alquiler", () => {
        vehiculo.getEstado.mockReturnValue(EstadoVehiculo["EN ALQUILER"]);
        try {
            verificador.puedeReservarse(vehiculo)
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en alquiler.")
        }
    });

    it("Debe lanzar error si el vehículo supera los 10000 km desde el último mantenimiento", () => {
        vehiculo.getEstado.mockReturnValue(EstadoVehiculo["DISPONIBLE"]);
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(15000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(2);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2024-06-01"));

        try {
            verificador.puedeReservarse(vehiculo)
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("Debe lanzar error si el vehículo supera el número máximo de alquileres (5)", () => {
        vehiculo.getEstado.mockReturnValue(EstadoVehiculo["DISPONIBLE"]);
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(8000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(6);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2024-06-01"));

        try {
            verificador.puedeReservarse(vehiculo)
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("Debe lanzar error si pasó más de 1 año desde el último mantenimiento", () => {
        vehiculo.getEstado.mockReturnValue(EstadoVehiculo["DISPONIBLE"]);
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(5000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(2);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2023-01-10"));

        try {
            verificador.puedeReservarse(vehiculo)
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
    });

    it("Debe devolver true si el vehículo cumple todas las condiciones", () => {
        vehiculo.getEstado.mockReturnValue(EstadoVehiculo["DISPONIBLE"]);
        vehiculo.getKilometrajeUltMantenimiento.mockReturnValue(8000);
        vehiculo.getAlquileresDesdeUltMantenimiento.mockReturnValue(2);
        vehiculo.getFechaUltMantenimiento.mockReturnValue(new Date("2025-06-01"));

        expect(verificador.puedeReservarse(vehiculo)).toBe(true);
    });
});
