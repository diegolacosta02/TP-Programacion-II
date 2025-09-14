import Reserva from "./reserva";
import Vehiculo from "./Vehiculo";

export default class Compacto extends Vehiculo{
    protected tarifaBase: number;
    protected cargoAdicional: number;
    protected kmPermitido:number
    
    constructor(){
        super()
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
        this.kmPermitido = 100
    }

    public getTarifaBase():number{
        return this.tarifaBase
    }
    public getCargoAdicional():number{
        return this.cargoAdicional
    }
    public getKmPermitido():number{
        return this.kmPermitido
    }
    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.getTarifaBase() * reserva.getDiasReservados()
        const kmPermitidos = this.getKmPermitido() * reserva.getDiasReservados()
        let extra = 0

        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = (reserva.getKmRecorridos() - kmPermitidos) * this.getCargoAdicional()
        }

        return tarifaBase + extra
    }
}