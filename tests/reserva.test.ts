import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Compacto from "../src/compacto";
import Sedan from "../src/sedan";
import SUV from "../src/suv";
import { mock } from "jest-mock-extended";

describe("Reserva getters y setters", () => {
  let fechaInicio: Date;
  let fechaFin: Date;
  let cliente: Cliente;
  let vehiculo: Compacto;
  let reserva: Reserva;

  beforeEach(() => {
    fechaInicio = new Date("2025-09-01");
    fechaFin = new Date("2025-09-05");

    cliente = new Cliente(123, "Cliente ", 12345678);
    vehiculo = new Compacto(456);

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

describe("Planteo de costos de reservas", ()=>{
    let fechaInicio: Date;
    let fechaFin: Date;
    let cliente: Cliente;
    let compacto: Compacto;
    let sedan: Sedan;
    let suv: SUV;
    let reserva: Reserva;

    beforeEach(()=>{
      fechaInicio = new Date("2025-10-07");
      fechaFin = new Date("2025-10-14");

      cliente = mock<Cliente>();
      compacto = mock<Compacto>();
      sedan = mock<Sedan>();
      suv = mock<SUV>();
    })

    it("costos de reserva de un compacto por 7 dias", () =>{
      reserva = new Reserva(cliente, compacto, fechaInicio, fechaFin)
      reserva.setKmRecorridos(250)
      //seguir
    })
})