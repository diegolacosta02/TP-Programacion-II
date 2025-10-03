import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo{
    
    protected tarifaBase:number
    protected cargoAdicional: number
    constructor(){
        super()
        this.tarifaBase = 50
        this.cargoAdicional = 0.20
    }
    public getTarifaBase():number{
        return this.tarifaBase
    }
    public getCargoAdicional():number{
        return this.cargoAdicional
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase= this.getTarifaBase() * reserva.getDiasReservados()
        const extra = this.getCargoAdicional() * reserva.getKmRecorridos()         
       
        return tarifaBase+extra
    }
}
