import CategoriaVehiculo from "./categoriaVehiculo";
import Reserva from "./reserva";

export default class Sedan extends CategoriaVehiculo {
    constructor() {
        super();
        this.tarifaBase = 50;
    }

    calcularTarifa(reserva: Reserva): number {
        const tarifa = this.tarifaBase * reserva.getDiasReservados();
        const adicional = reserva.getKmRecorridos() * 0.20;

        return tarifa + adicional;
    }
}
