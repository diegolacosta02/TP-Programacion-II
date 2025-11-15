/**
 * Representa un mantenimiento realizado a un vehículo.
 * Registra fecha, costo y descripción del trabajo realizado.
 */
export default class Mantenimiento{
    private fecha: Date
    private costo: number
    private descripcion: string

    constructor(fecha: Date, costo:number, descripcion:string){
        this.fecha = fecha
        this.costo = costo
        this.descripcion = descripcion
    }

    /**
     * Obtiene la fecha del mantenimiento.
     *
     * @returns {Date} La fecha en que se realizó el mantenimiento.
     */
    public getFecha():Date{
        return this.fecha
    }

    /**
     * Obtiene el costo del mantenimiento.
     *
     * @returns {number} El costo del servicio.
     */
    public getCosto():number{
        return this.costo
    }

    /**
     * Obtiene la descripción del mantenimiento.
     *
     * @returns {string} Detalles del trabajo realizado.
     */
    public getDescripcion():string{
        return this.descripcion
    }
}