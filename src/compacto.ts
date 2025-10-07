import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{
    protected tarifaBase: number;
    protected cargoAdicional: number;
    protected kmPermitidos:number
    
    constructor(nombre:string, matricula:number){
        super(nombre, matricula)
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
        this.kmPermitidos = 100
    }
    
    public setTarifaBase(tarifa:number):void{
        this.tarifaBase = tarifa;
    }
    public setCargoAdicional(cargo:number):void{
        this.cargoAdicional = cargo;
    }
    public setKmPermitidos(km:number):void{
        this.kmPermitidos = km;
    }

    public getTarifaBase():number{
        return this.tarifaBase
    }
    public getCargoAdicional():number{
        return this.cargoAdicional
    }
    public getKmPermitidos():number{
        return this.kmPermitidos
    }
    
    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.getTarifaBase() * reserva.getDiasReservados()
        const kmPermitidos = this.getKmPermitidos() * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * this.getCargoAdicional()
        }

        return tarifaBase + extra
    }
}
