import DriveHub from "./driveHub";
import { EstadoVehiculo } from "./estado-vehiculo";
import Vehiculo from "./vehiculo";

export default class CalculadoraEstadisticas {
    private sistema: DriveHub;

    constructor(sistema: DriveHub) {
        this.sistema = sistema;
    }

    /**
     * Devuelve el vehículo más y menos alquilado dentro de un rango de fechas determinado.
     * @param {Date} fechaInicio - Fecha de inicio del período a analizar.
     * @param {Date} fechaFin - Fecha de fin del período a analizar.
     * @returns {{ mas: Vehiculo | null, menos: Vehiculo | null }} 
     * Objeto con dos propiedades:
     * `mas`: el vehículo con mayor cantidad de alquileres.
     * `menos`: el vehículo con menor cantidad de alquileres.
     * Si no hay reservas en el rango, ambas propiedades serán nul.
    */
    public getVehiculosMasYMenosAlquilados(fechaInicio: Date, fechaFin: Date): { mas: Vehiculo | null, menos: Vehiculo | null } {
        const reservas = this.sistema.getReservas();
        const vehiculos = this.sistema.getVehiculos();

        const conteo = new Map<number, number>();

        reservas.forEach(reserva => {
            const inicio = reserva.getFechaInicio();
            if (inicio >= fechaInicio && inicio <= fechaFin) {
                const matricula = reserva.getVehiculo().getMatricula();
                conteo.set(matricula, (conteo.get(matricula) || 0) + 1);
            }
        });

        if (conteo.size === 0) {
            return { mas: null, menos: null };
        }

        let max = -Infinity;
        let min = Infinity;
        let vehiculoMas: Vehiculo | null = null;
        let vehiculoMenos: Vehiculo | null = null;

        vehiculos.forEach(v => {
            const cantidad = conteo.get(v.getMatricula()) || 0;
            if (cantidad > max) {
                max = cantidad;
                vehiculoMas = v;
            }
            if (cantidad < min) {
                min = cantidad;
                vehiculoMenos = v;
            }
        });

        return { mas: vehiculoMas, menos: vehiculoMenos };
    }

    /**
     * Calcula el vehículo más rentable y el menos rentable del sistema.
     * La rentabilidad se define como:
     * rentabilidad = ingresos_por_alquileres - costos_de_mantenimiento
     * Donde los ingresos se calculan con el método `calcularTarifa(reserva)` de cada vehículo.
     * @returns {{ masRentable: Vehiculo | null, menosRentable: Vehiculo | null }}
     * Objeto con dos propiedades:
     * `masRentable`: el vehículo con mayor rentabilidad.
     * `menosRentable`: el vehículo con menor rentabilidad.
     * Si no hay vehículos registrados, ambas propiedades serán null.
    */
    public getRentabilidadVehiculos(): { masRentable: Vehiculo | null, menosRentable: Vehiculo | null } {
        const reservas = this.sistema.getReservas();
        const vehiculos = this.sistema.getVehiculos();

        if (vehiculos.length === 0) return { masRentable: null, menosRentable: null };

        let vehiculoMas: Vehiculo | null = null;
        let vehiculoMenos: Vehiculo | null = null;
        let maxRent = -Infinity;
        let minRent = Infinity;

        vehiculos.forEach(v => {
            let ingresos = 0;

            reservas.forEach(r => {
                if (r.getVehiculo() === v) {
                    ingresos += v.calcularTarifa(r);
                }
            });

            const costos = v.getCostoTotalMantenimientos();
            const rentabilidad = ingresos - costos;

            if (rentabilidad > maxRent) {
                maxRent = rentabilidad;
                vehiculoMas = v;
            }
            if (rentabilidad < minRent) {
                minRent = rentabilidad;
                vehiculoMenos = v;
            }
        });

        return { masRentable: vehiculoMas, menosRentable: vehiculoMenos };
    }

    /**
     * Calcula el porcentaje de ocupación actual de la flota.
     * La ocupación se define como el porcentaje de vehículos cuyo estado actual
     * es `EN ALQUILER` sobre el total de vehículos registrados.
     * @returns {number} Porcentaje de ocupación de la flota.
     * Si no hay vehículos registrados, devuelve 0.
    */
    public getOcupacionFlota(): number {
        const vehiculos = this.sistema.getVehiculos();
        if (vehiculos.length === 0) return 0;

        const enAlquiler = vehiculos.filter(v => v.getEstado() === EstadoVehiculo["EN ALQUILER"]).length;
        return (enAlquiler / vehiculos.length) * 100;
    }
}