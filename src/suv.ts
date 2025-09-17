import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class SUV extends Vehiculo {
    private static tarifaBase: number = 80;

    constructor(nombre: string, matricula: number) {
        super(nombre, matricula)
    }

    public calcularTarifa(reserva: Reserva): number {
        const tarifa = SUV.tarifaBase * reserva.getDiasReservados();
        const seguro = 15 * reserva.getDiasReservados();
        let adicional = 0;

        if (reserva.getKmRecorridos() > 500) {
            adicional = (reserva.getKmRecorridos() - 500) * 0.25;
        }

        return tarifa + seguro + adicional;
    }
}
