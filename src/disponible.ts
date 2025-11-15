import { EnMantenimiento } from "./enMantenimiento";
import { IEstadoVehiculo } from "./IEstadoVehiculo";
import Vehiculo from "./vehiculo";
/**
 * Representa el estado "Disponible" de un vehículo.
 * El vehículo puede reservarse siempre que cumpla los criterios
 * de mantenimiento: límite de kilómetros, cantidad de alquileres
 * y fecha del último mantenimiento.
 *
 * @implements {IEstadoVehiculo}
 */
export class Disponible implements IEstadoVehiculo {
    private nombre: string;

    constructor() {
        this.nombre = "DISPONIBLE"
    }

    /**
     * Verifica si el vehículo puede ser reservado.
     * Si excede alguno de los límites de mantenimiento,
     * cambia su estado a "En mantenimiento" y lanza un error.
     *
     * @param {Vehiculo} vehiculo - El vehículo sobre el cual se consulta.
     * 
     * @throws {Error} Si el vehículo supera los límites de uso o tiempo desde el último mantenimiento.
     * @returns {boolean} `true` si el vehículo puede ser reservado.
     */    
    public puedeReservarse(vehiculo: Vehiculo): boolean {
        const fechaLimite = new Date(vehiculo.getFechaUltMantenimiento());
        fechaLimite.setMonth(fechaLimite.getMonth() + 12);        
        if (vehiculo.getKilometrajeUltMantenimiento() > 10000 || vehiculo.getAlquileresDesdeUltMantenimiento() >= 5
        || fechaLimite < new Date() ) {
            vehiculo.setEstado(new EnMantenimiento());
            throw new Error("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }        
        return true;
    }
    
    /**
     * Obtiene el nombre del estado actual.
     *
     * @returns {string} El nombre del estado ("DISPONIBLE").
     */    
    getNombre() {
        return this.nombre
    }
}