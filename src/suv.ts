import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class SUV extends Vehiculo{
    protected tarifaBase: number
    protected cargoAdicional: number
    protected cargoFijoAdicional: number
    
    constructor(){
        super()
        this.tarifaBase = 80
        this.cargoFijoAdicional = 15
        this.cargoAdicional = 0.25
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = 80 * reserva.getDiasReservados()
        const kmPermitidos = 100 * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * 0.15
        }

        return tarifaBase + extra
    }
}