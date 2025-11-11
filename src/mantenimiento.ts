export default class Mantenimiento{
    private fecha: Date
    private costo: number
    private descripcion: string

    constructor(fecha: Date, costo:number, descripcion:string){
        this.fecha = fecha
        this.costo = costo
        this.descripcion = descripcion
    }
    public getFecha():Date{
        return this.fecha
    }
    public getCosto():number{
        return this.costo
    }
    public getDescripcion():string{
        return this.descripcion
    }
}