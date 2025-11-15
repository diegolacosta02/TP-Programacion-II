import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { IGestorTemporadas } from "./IGestorTemporadas";
/**
 * Representa un vehículo tipo SUV.
 * Incluye cargo fijo de seguro y una cantidad de km permitidos diarios.
 */
export default class SUV extends Vehiculo {

    private tarifaBase: number
    private cargoAdicional: number
    private cargoFijoSeguro: number
    private kmPermitidos:number

    constructor(matricula:number, gestor: IGestorTemporadas){
        super(matricula, gestor)
        this.tarifaBase = 80
        this.cargoFijoSeguro = 15
        this.cargoAdicional = 0.25
        this.kmPermitidos = 500
    }

    /**
     * Calcula la tarifa total de la reserva.
     * Incluye tarifa base, cargo seguro, recargos por km extra y temporada.
     * 
     * @param {Reserva} reserva - Reserva que se va a calcular.
     * @returns {number} Tarifa final.
     */    
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