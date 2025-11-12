import { IGestorTemporadas } from "./IGestorTemporadas";
import Reserva from "./reserva";

export default class GestorTemporadas implements IGestorTemporadas {


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