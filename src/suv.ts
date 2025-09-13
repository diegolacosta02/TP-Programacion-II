import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class SUV extends Vehiculo{
    protected cargoFijoAdicional: number
    constructor(){
        super()
        this.tarifaBase = 80
        this.cargoFijoAdicional = 15
        this.cargoAdicional = 0.25
    }

    public calcularTarifa(reserva:Reserva): number {
        let resultado: number = 0
        
        return resultado
    }
}