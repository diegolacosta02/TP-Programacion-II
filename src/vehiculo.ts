import Mantenimiento from "./mantenimiento"
import CategoriaVehiculo from "./categoriaVehiculo"
import Reserva from "./reserva"

export default class Vehiculo{
    protected nombre: string
    protected matricula: number
    protected estado: string;
    protected categoria: CategoriaVehiculo
    protected kilometraje: number
    protected historialMantenimiento: Array <Mantenimiento>
    
    constructor(nombre: string, matricula: number, categoria: CategoriaVehiculo){
        this.nombre = nombre;
        this.matricula = matricula;
        this.estado = "disponible";
        this.kilometraje = 0;
        this.historialMantenimiento = [];
        this.categoria = categoria;
    }
    
    public calcularTarifa(reserva: Reserva): number {
        return this.categoria.calcularTarifa(reserva);
    }

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