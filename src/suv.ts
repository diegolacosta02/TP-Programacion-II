import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class SUV extends Vehiculo{
    protected cargoFijoAdicional: number
    protected tarifaBase:number
    protected cargoAdicional:number

    constructor(){
        super()
        this.tarifaBase = 80
        this.cargoFijoAdicional = 15
        this.cargoAdicional = 0.25
    }
public getTarifaBase():number{
    return this.tarifaBase
}

public getCargoFijoAdicional():number{
    return this.cargoFijoAdicional
}

public getCargoAdicional():number{
    return this.cargoAdicional
}

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.getTarifaBase() * reserva.getDiasReservados()
        let kmPermitidos=0;
        if(reserva.getKmRecorridos()>500){
         kmPermitidos=reserva.getKmRecorridos()
        }
        const extra = this.getCargoFijoAdicional()*reserva.getDiasReservados()+ kmPermitidos*this.cargoAdicional()
        return tarifaBase*extra
    }
}