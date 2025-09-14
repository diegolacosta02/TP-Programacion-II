import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class Sedan extends Vehiculo{
    
    private tarifaBase:number
    private cargoAdicional: number
    constructor(){
        super()
        this.tarifaBase = 50
        this.cargoAdicional = 0.20
    }
    public getTarifaBase():number{
        return this.tarifaBase
    }
    public getcargoAdicional():number{
        return this.cargoAdicional
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase= this.getTarifaBase() * reserva.getDiasReservados()
        const extra = this.cargoAdicional() * reserva.getKmRecorridos()         
       
        return tarifaBase+extra
    }
}