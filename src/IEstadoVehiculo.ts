import Vehiculo from "./vehiculo";
/**
 * Interfaz para los estados del vehículo bajo el patrón State.
 */
export interface IEstadoVehiculo {
    puedeReservarse(vehiculo: Vehiculo): boolean;
    getNombre(): string;
}