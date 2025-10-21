import Reserva from "./reserva";
import { Temporada } from "./temporadas";

export default class GestorTemporadas {


    public getPorcentajeTemporada(reserva: Reserva): number {
        const mes = reserva.getFechaInicio().getMonth() + 1;
        if (mes === 12 || mes === 1 || mes === 2) {
            return 20
        } else if (mes >= 6 && mes <= 8) {
            return -10
        }
        return 0
    }

    public getTemporada(reserva: Reserva) : Temporada {
        const mes = reserva.getFechaInicio().getMonth() + 1;
        if (mes === 12 || mes === 1 || mes === 2) {
            return Temporada.ALTA
        } else if (mes >= 6 && mes <= 8) {
            return Temporada.BAJA
        }
        return Temporada.MEDIA
    }
    

}