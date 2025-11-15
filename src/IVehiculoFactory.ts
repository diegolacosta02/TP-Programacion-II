import Vehiculo from "./vehiculo";
/**
 * Interfaz para implementar el Factory Method de creación de vehículos.
 */
export interface IVehiculoFactory {
    crearVehiculo(tipo: string, matricula: number): Vehiculo;
}