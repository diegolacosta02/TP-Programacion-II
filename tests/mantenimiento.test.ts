import Mantenimiento from "../src/mantenimiento";

describe("Clase Mantenimiento", () => {

  const fecha = new Date("2025-10-09");
  const costo = 1000;
  const descripcion = "Cambio de ruedas";
  const mantenimiento = new Mantenimiento(fecha, costo, descripcion);

  it("Debe devolver la fecha correcta", () => {
    expect(mantenimiento.getFecha()).toEqual(fecha);
  });

  it("Debe devolver el costo correcto", () => {
    expect(mantenimiento.getCosto()).toBe(1000);
  });

  it("Debe devolver la descripción correcta", () => {
    expect(mantenimiento.getDescripcion()).toBe("Cambio de ruedas");
  });

});