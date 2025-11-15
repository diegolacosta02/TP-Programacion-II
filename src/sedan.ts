import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { IGestorTemporadas } from "./IGestorTemporadas";
/**
 * Representa un vehículo tipo Sedan.
 * Extiende el comportamiento de la clase abstracta Vehiculo.
 */
export default class Sedan extends Vehiculo {

    private tarifaBase: number
    private cargoAdicional: number

    constructor(matricula:number, gestor: IGestorTemporadas){
        super(matricula, gestor)
        this.tarifaBase = 50
        this.cargoAdicional = 0.2
    }

    /**
     * Calcula la tarifa de una reserva para un Sedan.
     * @param {Reserva} reserva - Reserva asociada.
     * @returns {number} Tarifa total calculada.
     */    
    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.tarifaBase * reserva.getDiasReservados()
        const extra = reserva.getKmRecorridos() * this.cargoAdicional;
        const tarifaTemporada = this.gestorTemporadas.getPorcentajeTemporada(reserva) * tarifaBase / 100;

        return tarifaBase + extra + tarifaTemporada;
    }
}