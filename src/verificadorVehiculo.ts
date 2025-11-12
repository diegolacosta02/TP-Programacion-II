import { EstadoVehiculo } from "./estado-vehiculo";
import { IVerificadorVehiculo } from "./IVerificadorVehiculo";
import Vehiculo from "./vehiculo";

export default class VerificadorVehiculo implements IVerificadorVehiculo {

    public puedeReservarse(vehiculo: Vehiculo): boolean {
        const fechaLimite = new Date(vehiculo.getFechaUltMantenimiento());
        fechaLimite.setMonth(fechaLimite.getMonth() + 12);
        if (vehiculo.getEstado() === EstadoVehiculo["EN ALQUILER"]) {
            throw new Error("El vehículo no está disponible. Se encuentra en alquiler.")
        }
        if (vehiculo.getKilometrajeUltMantenimiento() > 10000 || vehiculo.getAlquileresDesdeUltMantenimiento() >= 5
        || fechaLimite < new Date() ) {
            vehiculo.setEstado(EstadoVehiculo["EN MANTENIMIENTO"]);
            throw new Error("El vehículo no está disponible. Se encuentra en mantenimiento.")
        }
        return true;
    }
}