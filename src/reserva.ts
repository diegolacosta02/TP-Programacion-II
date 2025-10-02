import Cliente from "./cliente"
import Vehiculo from "./vehiculo"

export default class Reserva{
    protected idReserva: number
    protected cliente: Cliente
    protected fechaInicio: Date
    protected fechaFin: Date
    protected vehiculo: Vehiculo
    protected kmRecorridos: number
    protected diasReservados: number

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio:Date, fechaFin: Date){
        this.idReserva = 0
        this.cliente = cliente
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
        this.vehiculo = vehiculo
        this.kmRecorridos = 0
        this.diasReservados = 0
    }

    public getFechaInicio():Date{
        return this.fechaInicio
    }
    public getFechaFin():Date{
        return this.fechaFin
    }
    public getCliente(): Cliente {
        return this.cliente
    }
    public getVehiculo(): Vehiculo {
        return this.vehiculo
    }
    public getKmRecorridos():number{
        return this.kmRecorridos
    }
    public getDiasReservados():number{
        const msPorDia = 1000 * 60 * 60 * 24
        const dias = (this.getFechaFin().getTime() - this.getFechaInicio().getTime())/msPorDia 
        return dias
    }

    public setKmRecorridos(kmRecorridos:number){
        this.kmRecorridos = kmRecorridos
    }
}