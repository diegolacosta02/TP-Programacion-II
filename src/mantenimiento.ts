export default class Mantenimiento{
    protected fecha: Date
    protected costo: number
    protected descripcion: string

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