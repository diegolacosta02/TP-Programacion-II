import Mantenimiento from "./mantenimiento"
import Reserva from "./reserva"

export default abstract class Vehiculo{
    protected nombre: string
    protected matricula: number
    protected estado: string
    protected tarifaBase: number
    protected cargoAdicional: number
    protected kilometraje: number
    protected historialMantenimiento: Array <Mantenimiento>
    
    constructor(){
        this.nombre = ""
        this.matricula = 0
        this.estado = ""
        this.tarifaBase = 0
        this.cargoAdicional = 0
        this.kilometraje = 0
        this.historialMantenimiento = []
    }
    
    abstract calcularTarifa(reserva: Reserva):number
    
}