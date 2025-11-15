import Reserva from "./reserva";
/**
 * Interfaz para la estrategia de cálculo de temporadas.
 */
export interface IGestorTemporadas {
    getPorcentajeTemporada(reserva: Reserva): number;
}