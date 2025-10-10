import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class Compacto extends Vehiculo {
    private tarifaBase: number;
    private cargoAdicional: number;
    private kmPermitidos:number;
    
    constructor(nombre:string, matricula:number){
        super(nombre, matricula)
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
        this.kmPermitidos = 100
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.tarifaBase * reserva.getDiasReservados()
        const kmPermitidos = this.kmPermitidos * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * this.cargoAdicional
        }

        return tarifaBase + extra
    }
}