import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import CalculadoraEstadisticas from "../src/calculadoraEstadisticas";
import DriveHub from "../src/driveHub";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";
import Disponible from "../src/disponible";
import EnAlquiler from "../src/enAlquiler";

describe("Test de CalculadoraEstadisticas", () => {

    let sistema: DeepMockProxy<DriveHub>;
    let calculadora: CalculadoraEstadisticas;

    let vehiculo1: DeepMockProxy<Vehiculo>;
    let vehiculo2: DeepMockProxy<Vehiculo>;
    let vehiculo3: DeepMockProxy<Vehiculo>;

    let reserva1: DeepMockProxy<Reserva>;
    let reserva2: DeepMockProxy<Reserva>;

    beforeEach(() => {
        sistema = mockDeep<DriveHub>();
        calculadora = new CalculadoraEstadisticas(sistema);
        vehiculo1 = mockDeep<Vehiculo>();
        vehiculo2 = mockDeep<Vehiculo>();
        vehiculo3 = mockDeep<Vehiculo>();
        vehiculo1.getMatricula.mockReturnValue(1);
        vehiculo2.getMatricula.mockReturnValue(2);
        vehiculo3.getMatricula.mockReturnValue(3);
        reserva1 = mockDeep<Reserva>();
        reserva2 = mockDeep<Reserva>();
        reserva1.getVehiculo.mockReturnValue(vehiculo1);
        reserva2.getVehiculo.mockReturnValue(vehiculo1); 
    });

    it("Debe devolver null en mas y menos si no hay reservas en el rango", () => {
        sistema.getReservas.mockReturnValue([]);
        sistema.getVehiculos.mockReturnValue([vehiculo1, vehiculo2]);

        const { mas, menos } = calculadora.getVehiculosMasYMenosAlquilados(
            new Date("2025-01-01"),
            new Date("2025-12-31")
        );

        expect({ mas, menos }.mas).toBeNull();
        expect({ mas, menos }.menos).toBeNull();
    });

    it("Debe calcular correctamente el más y menos alquilado", () => {
        reserva1.getFechaInicio.mockReturnValue(new Date("2025-05-02"));
        reserva2.getFechaInicio.mockReturnValue(new Date("2025-05-05"));

        sistema.getReservas.mockReturnValue([reserva1, reserva2]);
        sistema.getVehiculos.mockReturnValue([vehiculo1, vehiculo2, vehiculo3]);

        const { mas, menos } = calculadora.getVehiculosMasYMenosAlquilados(
            new Date("2025-01-01"),
            new Date("2025-12-31")
        );

        expect(mas).toBe(vehiculo1);   
        expect(menos).toBe(vehiculo2);
    });

    it("Debe calcular la rentabilidad y devolver el más y menos rentable", () => {
        sistema.getVehiculos.mockReturnValue([vehiculo1, vehiculo2]);
        sistema.getReservas.mockReturnValue([reserva1, reserva2]);
        reserva1.getVehiculo.mockReturnValue(vehiculo1);
        reserva2.getVehiculo.mockReturnValue(vehiculo2);
        vehiculo1.calcularTarifa.mockReturnValue(500);
        vehiculo2.calcularTarifa.mockReturnValue(100);
        vehiculo1.getCostoTotalMantenimientos.mockReturnValue(50);
        vehiculo2.getCostoTotalMantenimientos.mockReturnValue(30);
        const { masRentable, menosRentable } = calculadora.getRentabilidadVehiculos();
        
        expect(masRentable).toBe(vehiculo1);
        expect(menosRentable).toBe(vehiculo2);

    });
    
    it("Debe devolver 0% de ocupación si no hay vehículos", () => {
        sistema.getVehiculos.mockReturnValue([]);
        const porcentajeOcupacion = calculadora.getOcupacionFlota();

        expect(porcentajeOcupacion).toBe(0);
    });
    
    it("Debe calcular correctamente el porcentaje de ocupación", () => {
        vehiculo1.getEstado.mockReturnValue(new EnAlquiler());
        vehiculo2.getEstado.mockReturnValue(new Disponible());
        vehiculo3.getEstado.mockReturnValue(new EnAlquiler());
        sistema.getVehiculos.mockReturnValue([vehiculo1, vehiculo2, vehiculo3]);
        const porcentajeOcupacion = calculadora.getOcupacionFlota();

        expect(porcentajeOcupacion).toBeCloseTo((2 / 3) * 100);
    });
});