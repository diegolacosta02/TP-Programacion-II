import Reserva from "./reserva";

export interface IGestorTemporadas {
    getPorcentajeTemporada(reserva: Reserva): number;
}