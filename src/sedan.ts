import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class Sedan extends Vehiculo {
    private static tarifaBase: number = 50;

    constructor(nombre: string, matricula: number) {
        super(nombre, matricula)
    }

    public calcularTarifa(reserva: Reserva): number {
        const tarifa = Sedan.tarifaBase * reserva.getDiasReservados();
        const adicional = reserva.getKmRecorridos() * 0.20;
        return tarifa + adicional;
    }
}
