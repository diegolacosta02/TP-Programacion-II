import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import { IGestorTemporadas } from "./IGestorTemporadas";
/**
 * Representa un vehículo de tipo Compacto.
 * Extiende la clase Vehiculo e implementa la lógica
 * específica de cálculo de tarifa.
 */
export default class Compacto extends Vehiculo {
    private tarifaBase: number;
    private cargoAdicional: number;
    private kmPermitidos:number;

    constructor(matricula:number, gestor: IGestorTemporadas){
        super(matricula, gestor)
        this.tarifaBase = 30
        this.cargoAdicional = 0.15
        this.kmPermitidos = 100
    }

    /**
     * Calcula la tarifa total de una reserva según:
     * - tarifa base por día
     * - kilómetros permitidos
     * - cargo adicional por exceso de kilometraje
     * - porcentaje de temporada
     *
     * @param {Reserva} reserva - Reserva cuya tarifa debe calcularse.
     * 
     * @returns {number} Tarifa total de la reserva.
     */    
    public calcularTarifa(reserva:Reserva): number {
        const tarifaBase = this.tarifaBase * reserva.getDiasReservados()
        const kmPermitidos = this.kmPermitidos * reserva.getDiasReservados()
        let extra = 0
        if (reserva.getKmRecorridos() > kmPermitidos) {
            extra = reserva.getKmRecorridos()  * this.cargoAdicional;
        }
        const tarifaTemporada = this.gestorTemporadas.getPorcentajeTemporada(reserva) * tarifaBase / 100;

        return tarifaBase + extra + tarifaTemporada
    }
}