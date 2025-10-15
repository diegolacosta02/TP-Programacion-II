import { EstadoVehiculo } from "./estado-vehiculo";
import Vehiculo from "./vehiculo";

export default class VerificadorVehiculo {

    public puedeReservarse(vehiculo: Vehiculo): boolean {
        if (vehiculo.getEstado() !== EstadoVehiculo.DISPONIBLE) {
            return false;
        }
        if (vehiculo.getKilometrajeUltMantenimiento() > 10000 || vehiculo.getAlquileresDesdeUltMantenimiento() >= 5) {
            vehiculo.setEstado(EstadoVehiculo["EN MANTENIMIENTO"]);
            return false;
        }
        return true;
    }
}