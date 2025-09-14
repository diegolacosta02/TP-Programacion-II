import Reserva from "./reserva"
import Vehiculo from "./vehiculo"
export default class Cliente{
    protected dni: number
    protected nombre: string
    protected telefono: string
    protected reservas: Reserva[]

    constructor(){
        this.dni = 0
        this.nombre = ""
        this.telefono = ""
        this.reservas = [];
    }

    public crearReserva(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): Reserva{
        if(vehiculo.getEstado() != "Disponible") {
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