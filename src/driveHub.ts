import Cliente from "./cliente";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class DriveHub{
    protected vehiculo: Array<Vehiculo>
    protected cliente: Array<Cliente>
    protected reserva: Array<Reserva>

    constructor(){
        this.vehiculo = []
        this.cliente = []
        this.reserva = []
    }
}