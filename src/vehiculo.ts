import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";

export default abstract class Vehiculo {
    protected nombre: string;
    protected matricula: number;
    protected estado: string;
    protected kilometraje: number;
    protected historialMantenimiento: Mantenimiento[];

    constructor(nombre: string, matricula: number) {
        this.nombre = nombre;
        this.matricula = matricula;
        this.estado = "Disponible";
        this.kilometraje = 0;
        this.historialMantenimiento = [];
    }

    public abstract calcularTarifa(reserva: Reserva): number;

    public getHistorialMantenimiento(): Array<Mantenimiento> {
        return this.historialMantenimiento;
    }
    
    public agregarMantenimiento(mantenimiento: Mantenimiento): void {
        this.historialMantenimiento.push(mantenimiento);
        this.estado = "En mantenimiento"
    }

    public setEstado(estado: string){ //termina mantenimiento o se limpia
        this.estado= estado;
    }

    public getEstado(){
        return this.estado;
    }
    
    public getCostoTotalMantenimientos(): number {
        return this.historialMantenimiento.reduce((total, m) => total + m.getCosto(), 0); // por cada mantenimiento acumulo el costo en total
    }
}
