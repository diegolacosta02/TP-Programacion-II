import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class Compacto extends Vehiculo {
    private static tarifaBase: number = 30;

    constructor(nombre: string, matricula: number) {
        super(nombre, matricula)
    }

    public calcularTarifa(reserva: Reserva): number {
        const tarifa = Compacto.tarifaBase * reserva.getDiasReservados();
        let adicional = 0;

        if (reserva.getKmRecorridos() > 100) {
            adicional = (reserva.getKmRecorridos() - 100) * 0.15;
        }

        return tarifa + adicional;
    }
}
