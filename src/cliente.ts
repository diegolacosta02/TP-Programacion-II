import Reserva from "./reserva"
export default class Cliente{
    private dni: number
    private nombre: string
    private telefono: number

    constructor(dni: number, nombre: string, telefono: number){
        this.dni = dni;
        this.nombre = nombre;
        this.telefono = telefono;
    }

}