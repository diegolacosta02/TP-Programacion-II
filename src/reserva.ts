import Cliente from "./cliente";
import EnAlquiler from "./enAlquiler";
import Vehiculo from "./vehiculo";
/**
 * Representa una reserva realizada por un cliente para un vehículo.
 * Cada reserva actualiza automáticamente el estado del vehículo a "En Alquiler"
 * y aumenta el contador de alquileres desde el último mantenimiento.
 */
export default class Reserva {
    private cliente: Cliente;
    private fechaInicio: Date;
    private fechaFin: Date;
    private vehiculo: Vehiculo;
    private kmRecorridos: number = 0;

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculo.setEstado(new EnAlquiler());
        this.vehiculo.setAlquileresDesdeUltMantenimiento(1);
    }

    /**
     * Obtiene la cantidad de días reservados.
     * @returns {number} Días de duración de la reserva.
     */    
    public getDiasReservados(): number {
        const msPorDia = 1000 * 60 * 60 * 24;
        return (this.fechaFin.getTime() - this.fechaInicio.getTime()) / msPorDia;
    }

    /**
     * Registra los kilómetros recorridos durante la reserva.
     * También actualiza el kilometraje total del vehículo.
     * @param {number} km - Kilómetros recorridos.
     */    
    public setKmRecorridos(km: number) {
        this.kmRecorridos = km;
        this.vehiculo.setKilometraje(km);
    }

    /**
     * Obtiene Kilómetros recorridos en la reserva
     * @returns {number} los Kilómetros
     */    
    public getKmRecorridos(): number {
        return this.kmRecorridos;
    }

    /**
     * Obtiene el vehiculo de la reserva
     * @returns {Vehiculo} Vehículo reservado.
     */ 
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /**
     * Obtiene el cliente de la reserva
     * @returns {Cliente} Cliente que reservó.
     */     
    public getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Obtiene la fecha de incio de la reserva
     * @returns {Cliente} Fecha que se reservó.
     */     
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Obtiene la fecha del fin de la reserva
     * @returns {Cliente} Fecha que se terminó la reserva.
     */    
    public getFechaFin(): Date {
        return this.fechaFin;
    }
}