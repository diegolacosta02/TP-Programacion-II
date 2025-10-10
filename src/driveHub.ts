import Cliente from "./cliente";
import { EstadoVehiculo } from "./estado-vehiculo";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo"

export default class DriveHub{
    protected vehiculo: Array<Vehiculo>
    protected clientes: Array<Cliente>
    protected reservas: Array<Reserva>

    constructor(){
        this.vehiculo = []
        this.clientes = []
        this.reservas = []
    }

    public ingresarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculo.push(vehiculo);
    }

    public ingresarReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void{
        if(vehiculo.getEstado() != EstadoVehiculo.DISPONIBLE) {
            throw new Error("El vehículo no está disponible")
        }
        const reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin)
        this.reservas.push(reserva);
        this.clientes.push(cliente);
    }


}