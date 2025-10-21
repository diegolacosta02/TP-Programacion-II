import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class Sedan extends Vehiculo {

    private tarifaBase:number
    private cargoAdicional: number

    constructor(matricula:number){
        super(matricula)
        this.tarifaBase = 50
        this.cargoAdicional = 0.20
    }
    public calcularTarifa(reserva: Reserva): number {
        const tarifaBase= this.tarifaBase * reserva.getDiasReservados()
        const extra = this.cargoAdicional * reserva.getKmRecorridos()
        const tarifaTemporada = this.gestorTemporadas.getPorcentajeTemporada(reserva) * tarifaBase / 100;         
       
        return tarifaBase + extra + tarifaTemporada;
    }
}