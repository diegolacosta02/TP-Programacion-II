import { EstadoVehiculo } from "./estado-vehiculo"
import Reserva from "./reserva"
import Vehiculo from "./vehiculo"
export default class Cliente{
    protected dni: number
    protected nombre: string
    protected telefono: number
    protected reservas: Reserva[]

    constructor(dni: number, nombre: string, telefono: number){
        this.dni = dni;
        this.nombre = nombre;
        this.telefono = telefono;
        this.reservas = [];
    }

    public crearReserva(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): Reserva{
        if(vehiculo.getEstado() != EstadoVehiculo.DISPONIBLE) {
            throw new Error("El vehículo no está disponible")
        }
        const reserva= new Reserva(this, vehiculo, fechaInicio, fechaFin)
        this.reservas.push(reserva)
        return reserva;

    }

    public getReserva(): Reserva[] {
        return this.reservas
    }
}