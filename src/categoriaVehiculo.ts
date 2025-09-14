import Reserva from "./reserva";
export default abstract class CategoriaVehiculo {
    protected tarifaBase : number;
    constructor(){
        this.tarifaBase = 0;
    }
    abstract calcularTarifa(reserva: Reserva): number;
}