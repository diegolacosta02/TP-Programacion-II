import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { IGestorTemporadas } from "./IGestorTemporadas";

export default class Compacto extends Vehiculo {
    private tarifaBase: number;
    private cargoAdicional: number;
    private kmPermitidos:number;

    constructor(matricula:number, gestor: IGestorTemporadas){
        super(matricula, gestor)
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
        this.kmPermitidos = 100
    }
public getCargoAdicional ():number{
    return this.cargoAdicional

}
    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.tarifaBase * reserva.getDiasReservados()
        const kmPermitidos = this.kmPermitidos * reserva.getDiasReservados()
        let extra = 0
        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = reserva.getKmRecorridos()  * this.getCargoAdicional();
        }
        const tarifaTemporada = this.gestorTemporadas.getPorcentajeTemporada(reserva) * tarifaBase / 100;

        return tarifaBase + extra + tarifaTemporada
    }
}