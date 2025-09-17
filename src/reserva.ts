import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class Reserva {
    protected cliente: Cliente;
    protected fechaInicio: Date;
    protected fechaFin: Date;
    protected vehiculo: Vehiculo;
    protected kmRecorridos: number = 0;

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculo.setEstado("En Alquiler");
    }

    public getDiasReservados(): number {
        const msPorDia = 1000 * 60 * 60 * 24;
        return (this.fechaFin.getTime() - this.fechaInicio.getTime()) / msPorDia;
    }

    public setKmRecorridos(km: number) {
        this.kmRecorridos = km;
    }

    public getKmRecorridos(): number {
        return this.kmRecorridos;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }
}
