import Cliente from "./cliente";
import { EstadoVehiculo } from "./estado-vehiculo";
import { IVerificadorVehiculo } from "./IVerificadorVehiculo";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo"
import VerificadorVehiculo from "./verificadorVehiculo";

export default class DriveHub{
    private vehiculos: Array<Vehiculo>
    private clientes: Array<Cliente>
    private reservas: Array<Reserva>
    private verificadorVehiculos : IVerificadorVehiculo;

    constructor(verificadorVehiculos: IVerificadorVehiculo){
        this.vehiculos = []
        this.clientes = []
        this.reservas = []
        this.verificadorVehiculos = verificadorVehiculos
    }

    public ingresarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.push(vehiculo);
    }

    public ingresarReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void{
        this.verificadorVehiculos.puedeReservarse(vehiculo);
        const reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin)
        this.reservas.push(reserva);
        if (!this.clientes.includes(cliente)) {
            this.clientes.push(cliente);
        }
    }

    public agregarMantenimientoAVehiculo(vehiculo : Vehiculo, mantenimiento: Mantenimiento): void {
        vehiculo.setMantenimiento(mantenimiento);
        vehiculo.setEstado(EstadoVehiculo["EN MANTENIMIENTO"])
        vehiculo.setKilometrajeUltMantenimiento(vehiculo.getKilometraje());
        vehiculo.setFechaUltMantenimiento(mantenimiento.getFecha());
    }

    public getReservas() : Reserva[] {
        return this.reservas;
    }

}