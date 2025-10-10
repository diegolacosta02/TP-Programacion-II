import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class Sedan extends Vehiculo {

    private tarifaBase:number
    private cargoAdicional: number

    constructor(nombre:string, matricula:number){
        super(nombre, matricula)
        this.tarifaBase = 50
        this.cargoAdicional = 0.20
    }
    public calcularTarifa(reserva: Reserva): number {
        const tarifaBase= this.tarifaBase * reserva.getDiasReservados()
        const extra = this.cargoAdicional * reserva.getKmRecorridos()         
       
        return tarifaBase+extra
    }
}