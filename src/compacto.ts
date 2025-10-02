import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{
    protected tarifaBase: number;
    protected cargoAdicional: number;
    
    constructor(){
        super()
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = 30 * reserva.getDiasReservados()
        const kmPermitidos = 100 * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * 0.15
        }

        return tarifaBase + extra
    }
}