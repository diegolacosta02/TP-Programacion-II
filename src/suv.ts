import CategoriaVehiculo from "./categoriaVehiculo";
import Reserva from "./reserva";

export default class SUV extends CategoriaVehiculo {
    constructor() {
        super();
        this.tarifaBase = 80;
    }

    calcularTarifa(reserva: Reserva): number {
        const tarifa = this.tarifaBase * reserva.getDiasReservados();
        const seguro = 15 * reserva.getDiasReservados();
        let adicional = 0;

        if (reserva.getKmRecorridos() > 500) {
            adicional = (reserva.getKmRecorridos() - 500) * 0.25;
        }

        return tarifa + seguro + adicional;
    }
}
