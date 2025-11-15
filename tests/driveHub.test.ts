import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";
import DriveHub from "../src/driveHub"
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import Mantenimiento from "../src/mantenimiento";
import { IVehiculoFactory } from "../src/IVehiculoFactory";
import Disponible from "../src/disponible";

describe("Test de clase DriveHub", () => {
    let driveHub: DriveHub;
    let cliente: DeepMockProxy<Cliente>;
    let vehiculo: DeepMockProxy<Vehiculo>;
    let mantenimiento: DeepMockProxy<Mantenimiento>;
    let fechaInicio: Date;
    let fechaFin: Date;
    let factoryMock: DeepMockProxy<IVehiculoFactory>;
    
    beforeEach(() => {
        factoryMock = mockDeep<IVehiculoFactory>();
        vehiculo = mockDeep<Vehiculo>();
        driveHub = new DriveHub(factoryMock);
        cliente = mockDeep<Cliente>();
        mantenimiento = mockDeep<Mantenimiento>();
        fechaInicio = new Date("2025-09-01");
        fechaFin = new Date("2025-09-05");
        factoryMock.crearVehiculo.mockReturnValue(vehiculo);
        driveHub.ingresarVehiculo("compacto", 123);
        vehiculo.getEstado.mockReturnValue(new Disponible());
    });
    
    it("debería ingresar un vehículo correctamente", () => {
        expect(driveHub["vehiculos"]).toContain(vehiculo);
        expect(factoryMock.crearVehiculo).toHaveBeenCalledWith("compacto", 123);
    });

    it("debería ingresar una reserva y agregar el cliente correctamente", () => {
        driveHub.ingresarReserva(cliente, vehiculo, fechaInicio, fechaFin);
        
        expect(driveHub["reservas"].length).toBe(1);
        expect(driveHub["clientes"][0]).toBe(cliente);
        expect(driveHub["clientes"]).toContain(cliente);
  });

    it("debería agregar un mantenimiento al auto correctamente", () => {
        driveHub.agregarMantenimientoAVehiculo(vehiculo, mantenimiento);
        expect(vehiculo.setMantenimiento).toHaveBeenCalledWith(mantenimiento);

    });

});