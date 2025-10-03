import Cliente from "./cliente";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class DriveHub{
    protected vehiculo: Array<Vehiculo>
    protected cliente: Array<Cliente>
    protected reservas: Array<Reserva>

    constructor(){
        this.vehiculo = []
        this.cliente = []
        this.reservas = []
    }

    public ingresarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculo.push(vehiculo);
    }

    public ingresarCliente(cliente: Cliente): void {
        this.cliente.push(cliente);
    }

    public ingresarReserva(cliente: Cliente){
        for (const reserva of cliente.getReserva()) {
            this.reservas.push(reserva);
        }
    }


}