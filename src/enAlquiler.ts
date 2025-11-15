/**
 * Representa el estado "En alquiler" de un vehículo dentro del sistema.
 * Un vehículo en este estado no puede ser reservado.
 * 
 * @implements {IEstadoVehiculo}
*/
import { IEstadoVehiculo } from "./IEstadoVehiculo";

export class EnAlquiler implements IEstadoVehiculo {
    private nombre: string;

    constructor() {
        this.nombre = "EN ALQUILER"
    }

    /**
     * Indica que el vehículo no puede ser reservado porque se encuentra en alquiler.
     * 
     * @throws {Error} Siempre, indicando que el vehículo está en alquiler.
     * @returns {boolean} Nunca retorna; siempre lanza error.
     */    
    public puedeReservarse(): boolean {
        throw new Error("El vehículo no está disponible. Se encuentra en alquiler.")
    }  
    
    /**
     * Obtiene el nombre del estado actual.
     * 
     * @returns {string} El nombre del estado ("EN ALQUILER").
     */    
    public getNombre() : string{
        return this.nombre;
    }
}