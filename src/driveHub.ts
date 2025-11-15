import Cliente from "./cliente";
import { EnMantenimiento } from "./enMantenimiento";
import { IVehiculoFactory } from "./IVehiculoFactory";
import Mantenimiento from "./mantenimiento";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo"
/**
 * Clase principal que gestiona el sistema de alquiler de vehículos.
 * Permite registrar vehículos, clientes, reservas y mantenimientos.
 * Actúa como punto central de coordinación entre las entidades.
 */
export default class DriveHub{
    private vehiculos: Array<Vehiculo>
    private clientes: Array<Cliente>
    private reservas: Array<Reserva>
    private vehiculoFactory: IVehiculoFactory;

    constructor(factory: IVehiculoFactory){
        this.vehiculos = []
        this.clientes = []
        this.reservas = []
        this.vehiculoFactory = factory
        
    }

    /**
     * Registra un nuevo vehículo en el sistema utilizando la fábrica de vehículos.
     * @param {string} tipo - Tipo de vehículo a crear (ej: "compacto", "suv", "sedan").
     * @param {number} matricula - Número identificatorio del vehículo.
     */
    public ingresarVehiculo(tipo: string, matricula: number): void {
        const vehiculo = this.vehiculoFactory.crearVehiculo(tipo, matricula)
        this.vehiculos.push(vehiculo);
    }

    /**
     * Registra una nueva reserva si el vehículo está disponible.
     * Actualiza el contador de alquileres desde el último mantenimiento
     * y registra al cliente si aún no estaba registrado.
     * @param {Cliente} cliente - Cliente que realiza la reserva.
     * @param {Vehiculo} vehiculo - Vehículo a reservar.
     * @param {Date} fechaInicio - Fecha de inicio de la reserva.
     * @param {Date} fechaFin - Fecha de fin de la reserva.
     * @throws {Error} Si el vehículo no puede reservarse según su estado.
     */
    public ingresarReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void{
        vehiculo.getEstado().puedeReservarse(vehiculo);
        const reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin)
        this.reservas.push(reserva);
        vehiculo.setAlquileresDesdeUltMantenimiento(1);
        if (!this.clientes.includes(cliente)) {
            this.clientes.push(cliente);
        }
    }

    /**
     * Registra un mantenimiento en el vehículo, actualizando su estado,
     * fecha y kilometraje correspondientes.
     * @param {Vehiculo} vehiculo - Vehículo a actualizar.
     * @param {Mantenimiento} mantenimiento - Mantenimiento realizado.
     */
    public agregarMantenimientoAVehiculo(vehiculo : Vehiculo, mantenimiento: Mantenimiento): void {
        vehiculo.setMantenimiento(mantenimiento);
        vehiculo.setEstado(new EnMantenimiento())
        vehiculo.setKilometrajeUltMantenimiento(vehiculo.getKilometraje());
        vehiculo.setFechaUltMantenimiento(mantenimiento.getFecha());
    }

    /**
     * Obtiene la lista de reservas registradas.
     * @returns {Reserva[]} Array de reservas.
     */
    public getReservas() : Reserva[] {
        return this.reservas;
    }

    /**
     * Obtiene la lista de vehículos registrados.
     * @returns {Vehiculo[]} Array de vehículos.
     */
    public getVehiculos() : Vehiculo[] {
        return this.vehiculos;
    }
}