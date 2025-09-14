import CategoriaVehiculo from "./categoriaVehiculo";
import Reserva from "./reserva";

export default class Compacto extends CategoriaVehiculo {
    constructor(){
        super()
        this.tarifaBase = 30;
    }
    calcularTarifa (reserva: Reserva): number {
        const tarifa= this.tarifaBase * reserva.getDiasReservados();
        let adicional= 0;
        if ( reserva.getKmRecorridos()> 100){
            adicional = reserva.getKmRecorridos() * 0.15;
            return tarifa + adicional;
        }
        return tarifa + adicional;
    }
}