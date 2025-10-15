import { EstadoVehiculo } from "./estado-vehiculo";
import GestorTemporadas from "./gestorTemporadas";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";

export default abstract class Vehiculo {
    protected matricula: number;
    protected estado: EstadoVehiculo;
    protected kilometraje: number;
    protected kilometrajeUltMantenimiento : number;
    protected alquieleresDesdeUltMantenimiento : number;
    protected fechaUltMantenimiento : Date;
    protected historialMantenimiento: Mantenimiento[];
    protected gestorTemporadas: GestorTemporadas;

    constructor(matricula: number) {
        this.matricula = matricula;
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.kilometraje = 0;
        this.kilometrajeUltMantenimiento = 0;
        this.alquieleresDesdeUltMantenimiento = 0;
        this.fechaUltMantenimiento = new Date(0);
        this.historialMantenimiento = [];
        this.gestorTemporadas = new GestorTemporadas();
    }

    public abstract calcularTarifa(reserva: Reserva): number;

    public setMantenimiento(m : Mantenimiento) {
        this.historialMantenimiento.push(m);
        this.alquieleresDesdeUltMantenimiento = 0;
    }

    public getHistorialMantenimiento(): Array<Mantenimiento> {
        return this.historialMantenimiento;
    }

    public getCostoTotalMantenimientos(): number {
        return this.historialMantenimiento.reduce((total, m) => total + m.getCosto(), 0);
    }

    public setEstado(estado: EstadoVehiculo){ 
        this.estado= estado;
    }

    public getEstado(){
        return this.estado;
    }

    public getKilometraje() : number {
        return this.kilometraje
    }

    public setKilometraje(km: number){
        this.kilometraje += km;
    }

    public getKilometrajeUltMantenimiento() : number {
        return this.kilometrajeUltMantenimiento
    }

    public setKilometrajeUltMantenimiento(km: number) {
        this.kilometrajeUltMantenimiento = km;
    }

    public setAlquileresDesdeUltMantenimiento(a: number) {
        this.alquieleresDesdeUltMantenimiento += a;
    }

    public getAlquileresDesdeUltMantenimiento() : number {
        return this.alquieleresDesdeUltMantenimiento;
    }

    public setFechaUltMantenimiento(d: Date) {
        this.fechaUltMantenimiento = d;
    }

    public getFechaUltMantenimiento() : Date {
        return this.fechaUltMantenimiento;
    }
}
