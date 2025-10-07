import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{
    protected tarifaBase: number
    protected cargoAdicional: number
    protected cargoFijoSeguro: number
    protected kmPermitidos:number

    constructor(nombre:string, matricula:number){
        super(nombre, matricula)
        this.tarifaBase = 80
        this.cargoFijoSeguro = 15
        this.cargoAdicional = 0.25
        this.kmPermitidos = 500
    }

    public setKmPermitidos(km:number):void{
        this.kmPermitidos = km;
    }
    public setTarifaBase(tarifa:number):void{
        this.tarifaBase = tarifa;
    }
    public setCargoAdicional(cargo:number):void{
        this.cargoAdicional = cargo;
    }
    public setCargoFijoSeguro(cargo:number):void{
        this.cargoFijoSeguro = cargo;
    }

    public getKmPermitidos():number{
        return this.kmPermitidos;
    }
    public getTarifaBase():number{
        return this.tarifaBase
    }
    public getCargoAdicional():number{
        return this.cargoAdicional;
    }
    public getCargoFijoSeguro():number{
        return this.cargoFijoSeguro;
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.getTarifaBase() * reserva.getDiasReservados()
        const kmPermitidos = this.getKmPermitidos()
        const cargoSeguro = this.getCargoFijoSeguro() * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * 0.25
        }

        return tarifaBase + cargoSeguro + extra
    }
}
