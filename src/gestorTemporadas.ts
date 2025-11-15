import { IGestorTemporadas } from "./IGestorTemporadas";
import Reserva from "./reserva";
/**
 * Implementación del gestor de temporadas.
 * Determina el porcentaje que se aplica a una tarifa según el mes.
 * Invierno (Dic, Ene, Feb): +20%
 * Verano (Jun, Jul, Ago): -10%
 * Resto del año: 0%
 */
export default class GestorTemporadas implements IGestorTemporadas {

    /**
     * Obtiene el porcentaje de ajuste por temporada según la fecha de inicio
     * de la reserva.
     * @param {Reserva} reserva - Reserva de la cual se toma la fecha de inicio.
     * @returns {number} Porcentaje a aplicar a la tarifa base.
     */
    public getPorcentajeTemporada(reserva: Reserva): number {
        const mes = reserva.getFechaInicio().getMonth() + 1;
        if (mes === 12 || mes === 1 || mes === 2) {
            return 20
        } else if (mes >= 6 && mes <= 8) {
            return -10
        }
        return 0
    }
}