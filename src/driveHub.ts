import Cliente from "./cliente";
import { EstadoVehiculo } from "./estado-vehiculo";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo"
import VerificadorVehiculo from "./verificadorVehiculo";

export default class DriveHub{
    private vehiculos: Array<Vehiculo>
    private clientes: Array<Cliente>
    private reservas: Array<Reserva>
    private verificadorVehiculos : VerificadorVehiculo;

    constructor(){
        this.vehiculos = []
        this.clientes = []
        this.reservas = []
        this.verificadorVehiculos = new VerificadorVehiculo()
    }

    public ingresarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.push(vehiculo);
    }

    public ingresarReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void{
        if(!this.verificadorVehiculos.puedeReservarse(vehiculo)) {
            throw new Error("El vehículo no está disponible")
        }
        const reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin)
        this.reservas.push(reserva);
        this.clientes.push(cliente);
    }

    public agregarMantenimientoAVehiculo(vehiculo : Vehiculo, mantenimiento: Mantenimiento): void {
        vehiculo.setMantenimiento(mantenimiento);
        vehiculo.setEstado(EstadoVehiculo["EN MANTENIMIENTO"])
        vehiculo.setKilometrajeUltMantenimiento(vehiculo.getKilometraje());
        vehiculo.setFechaUltMantenimiento(mantenimiento.getFecha());
    }


}