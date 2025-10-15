import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class SUV extends Vehiculo {

    private tarifaBase: number
    private cargoAdicional: number
    private cargoFijoSeguro: number
    private kmPermitidos:number

    constructor(matricula:number){
        super(matricula)
        this.tarifaBase = 80
        this.cargoFijoSeguro = 15
        this.cargoAdicional = 0.25
        this.kmPermitidos = 500
    }

    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.tarifaBase * reserva.getDiasReservados()
        const cargoSeguro = this.cargoFijoSeguro * reserva.getDiasReservados()
        let extra = 0
        if (reserva.getKmRecorridos() > this.kmPermitidos) {
            extra = reserva.getKmRecorridos() * this.cargoAdicional;
        }
        const tarifaTemporada = this.gestorTemporadas.getPorcentajeTemporada(reserva) * tarifaBase / 100;

        return tarifaBase + cargoSeguro + extra + tarifaTemporada;
    }
}