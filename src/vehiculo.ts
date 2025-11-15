import Disponible from "./disponible";
import { IEstadoVehiculo } from "./IEstadoVehiculo";
import { IGestorTemporadas } from "./IGestorTemporadas";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";

/**
* Clase base abstracta que representa un vehículo dentro del sistema de alquiler.
*/
export default abstract class Vehiculo {
    protected matricula: number;
    protected estado: IEstadoVehiculo;
    protected kilometraje: number;
    protected kilometrajeUltMantenimiento : number;
    protected alquieleresDesdeUltMantenimiento : number;
    protected fechaUltMantenimiento : Date;
    protected historialMantenimiento: Mantenimiento[];
    protected gestorTemporadas: IGestorTemporadas;

    constructor(matricula: number, gestor: IGestorTemporadas) {
        this.matricula = matricula;
        this.estado = new Disponible();
        this.kilometraje = 0;
        this.kilometrajeUltMantenimiento = 0;
        this.alquieleresDesdeUltMantenimiento = 0;
        this.fechaUltMantenimiento = new Date(0);
        this.historialMantenimiento = [];
        this.gestorTemporadas = gestor;
    }

    /**
     * Calcula la tarifa de una reserva según el tipo de vehículo.
     * @param reserva La reserva que se va a cobrar.
     * @returns El valor total de la tarifa incluyendo cargos extra y temporada.
    */
    public abstract calcularTarifa(reserva: Reserva): number;

    /**
     * Registra un mantenimiento realizado sobre el vehículo.
     * Lo agrega al historial.
     * Reinicia la cuenta de alquileres desde el último mantenimiento.
     * @param {Mantenimiento} m El mantenimiento realizado.
    */    
    public setMantenimiento(m : Mantenimiento) {
        this.historialMantenimiento.push(m);
        this.alquieleresDesdeUltMantenimiento = 0;
    }

    /**
     * Retorna el historial completo de mantenimientos del vehículo.
     * 
     * @returns Lista de mantenimientos.
     */    
    public getHistorialMantenimiento(): Array<Mantenimiento> {
        return this.historialMantenimiento;
    }

    /**
     * Calcula el costo total acumulado de todos los mantenimientos realizados.
     * @returns El costo total de todos los mantenimientos del vehículo.
    */    
    public getCostoTotalMantenimientos(): number {
        return this.historialMantenimiento.reduce((total, m) => total + m.getCosto(), 0);
    }

    /**
     * Cambia el estado actual del vehículo.
     * @param estado Nuevo estado del vehículo.
     */
    public setEstado(estado: IEstadoVehiculo){ 
        this.estado= estado;
    }

    /**
     * Obtiene el estado actual del vehículo.
     * @returns Instancia del estado actual.
     */
    public getEstado(){
        return this.estado;
    }

    /**
     * Obtiene el kilometraje total recorrido.
     */
    public getKilometraje() : number {
        return this.kilometraje
    }

    /**
     * Incrementa el kilometraje total recorrido por el vehículo.
     * Este método se usa desde la clase Reserva, cuando se registra
     * cuántos kilómetros recorrió el vehículo durante un alquiler.
     * @param km Cantidad de kilómetros a agregar al kilometraje total.
     */    
    public setKilometraje(km: number){
        this.kilometraje += km;
    }

    /**
     * Obtiene el kilometraje registrado al momento del último mantenimiento.
     */
    public getKilometrajeUltMantenimiento() : number {
        return this.kilometrajeUltMantenimiento
    }

    /**
     * Registra el kilometraje correspondiente al último mantenimiento realizado.
     * @param km Valor de kilometraje al momento del mantenimiento.
     */
    public setKilometrajeUltMantenimiento(km: number) {
        this.kilometrajeUltMantenimiento = km;
    }

    /**
     * Incrementa la cantidad de alquileres desde el último mantenimiento.
     * Se invoca automáticamente al registrar una nueva reserva en el sistema.
     * Es clave para determinar si el vehículo supera el límite permitido.
     * @param a Cantidad de alquileres a sumar.
     */    
    public setAlquileresDesdeUltMantenimiento(a: number) {
        this.alquieleresDesdeUltMantenimiento += a;
    }

    /**
     * Retorna la cantidad de alquileres desde el último mantenimiento.
     */
    public getAlquileresDesdeUltMantenimiento() : number {
        return this.alquieleresDesdeUltMantenimiento;
    }

    /**
     * Registra la fecha en la que se realizó el último mantenimiento.
     * 
     * @param d Fecha del mantenimiento.
     */
    public setFechaUltMantenimiento(d: Date) {
        this.fechaUltMantenimiento = d;
    }

    /**
     * Obtiene la fecha del último mantenimiento.
     * @returns Fecha registrada.
     */
    public getFechaUltMantenimiento() : Date {
        return this.fechaUltMantenimiento;
    }

    /**
     * Obtiene la matrícula única del vehículo.
     */
    public getMatricula(): number {
        return this.matricula;
    }
}