import { IEstadoVehiculo } from "./IEstadoVehiculo";
import Vehiculo from "./vehiculo";
/**
 * Representa el estado "En mantenimiento" de un vehículo.
 * Un vehículo en este estado no puede ser reservado.
 * 
 * @implements {IEstadoVehiculo}
 */
export default class EnMantenimiento implements IEstadoVehiculo {
    private nombre: string;

    constructor() {
        this.nombre = "EN MANTENIMIENTO"
    }

    /**
     * Impide reservar el vehículo mientras se encuentra en mantenimiento.
     * @throws {Error} Siempre, indicando que el vehículo está en mantenimiento.
     * @returns {boolean} Nunca retorna; siempre lanza error.
     */    
    public puedeReservarse(vehiculo: Vehiculo): boolean {
        throw new Error("El vehículo no está disponible. Se encuentra en mantenimiento.")
    } 
    
    /**
     * Obtiene el nombre del estado actual.
     * @returns {string} El nombre del estado ("EN MANTENIMIENTO").
     */
    public getNombre() :string {
        return this.nombre
    }
}