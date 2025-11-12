import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";
import DriveHub from "../src/driveHub"
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import Mantenimiento from "../src/mantenimiento";
import { EstadoVehiculo } from "../src/estado-vehiculo";
import { IVerificadorVehiculo } from "../src/IVerificadorVehiculo";

describe("Test de clase DriveHub", () => {
    let driveHub: DriveHub;
    let cliente: DeepMockProxy<Cliente>;
    let vehiculo: DeepMockProxy<Vehiculo>;
    let mantenimiento: DeepMockProxy<Mantenimiento>;
    let fechaInicio: Date;
    let fechaFin: Date;
    let verificadorMock: DeepMockProxy<IVerificadorVehiculo>;
    
    beforeEach(() => {
        verificadorMock = mockDeep<IVerificadorVehiculo>();
        driveHub = new DriveHub(verificadorMock);
        cliente = mockDeep<Cliente>();
        vehiculo = mockDeep<Vehiculo>();
        mantenimiento = mockDeep<Mantenimiento>();
        fechaInicio = new Date("2025-09-01");
        fechaFin = new Date("2025-09-05");
    });
    
    it("debería ingresar un vehículo correctamente", () => {
        driveHub.ingresarVehiculo(vehiculo);
        expect(driveHub["vehiculos"]).toContain(vehiculo);
    });

    it("debería ingresar una reserva y agregar el cliente correctamente", () => {
        driveHub["verificadorVehiculos"].puedeReservarse = jest.fn().mockReturnValue(true);
        driveHub.ingresarReserva(cliente, vehiculo, fechaInicio, fechaFin);
        
        expect(driveHub["reservas"].length).toBe(1);
        expect(driveHub["clientes"][0]).toBe(cliente);
        expect(driveHub["clientes"]).toContain(cliente);
  });
  
    it("debería lanzar un error si el vehículo está en mantenimiento", () => {
        vehiculo.setEstado(EstadoVehiculo["EN MANTENIMIENTO"]);
        try {
            driveHub.ingresarReserva(cliente, vehiculo, fechaInicio, fechaFin);
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en mantenimiento.");
        }
    });

    it("debería lanzar un error si el vehículo está reservado", () => {
        vehiculo.setEstado(EstadoVehiculo["EN ALQUILER"]);
        try {
            driveHub.ingresarReserva(cliente, vehiculo, fechaInicio, fechaFin);
        } catch (error: any) {
            expect(error.message).toBe("El vehículo no está disponible. Se encuentra en alquiler.");
        }
    });

    it("debería agregar un mantenimiento al auto correctamente", () => {
        driveHub.ingresarVehiculo(vehiculo);
        driveHub.agregarMantenimientoAVehiculo(vehiculo, mantenimiento)
        expect(vehiculo.setMantenimiento).toHaveBeenCalledWith(mantenimiento);

    });

});