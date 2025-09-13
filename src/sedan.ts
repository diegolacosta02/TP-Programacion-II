import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class Sedan extends Vehiculo{
    
    constructor(){
        super()
        this.tarifaBase = 50
        this.cargoAdicional = 0.20
    }

    public calcularTarifa(reserva:Reserva): number {
        let resultado: number = 0
            
        return resultado
    }
}