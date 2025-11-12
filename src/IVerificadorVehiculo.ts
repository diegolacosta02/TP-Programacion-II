import Vehiculo from "./vehiculo";

export interface IVerificadorVehiculo {
    puedeReservarse(vehiculo: Vehiculo): void;
}