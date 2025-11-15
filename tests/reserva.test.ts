import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Compacto from "../src/compacto";
import { DeepMockProxy, mock, mockDeep } from "jest-mock-extended";

describe("Reserva getters y setters", () => {
  let fechaInicio: Date;
  let fechaFin: Date;
  let cliente: DeepMockProxy<Cliente>;
  let vehiculo: DeepMockProxy<Compacto>;
  let reserva: Reserva;

  beforeEach(() => {
    
    fechaInicio = new Date("2025-09-01");
    fechaFin = new Date("2025-09-05");

    cliente = mockDeep<Cliente>();
    vehiculo = mockDeep<Compacto>();

    reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin);
  });

  it("debería devolver la fecha de inicio correctamente", () => {
    expect(reserva.getFechaInicio()).toBe(fechaInicio);
  });

  it("debería devolver la fecha de fin correctamente", () => {
    expect(reserva.getFechaFin()).toBe(fechaFin);
  });

  it("debería calcular correctamente los días reservados", () => {
    expect(reserva.getDiasReservados()).toBe(4);
  });

  it("debería guardar y devolver correctamente los km recorridos", () => {
    reserva.setKmRecorridos(250);
    expect(reserva.getKmRecorridos()).toBe(250);
  });

  it("debería devolver el vehículo asignado", () => {
    expect(reserva.getVehiculo()).toBe(vehiculo);
  });

  it("debería devolver el cliente asignado", () => {
    expect(reserva.getCliente()).toBe(cliente);
  });
});
