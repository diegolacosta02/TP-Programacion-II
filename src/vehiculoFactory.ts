import Compacto from "./compacto";
import { IGestorTemporadas } from "./IGestorTemporadas";
import { IVehiculoFactory } from "./IVehiculoFactory";
import Sedan from "./sedan";
import SUV from "./suv";
import Vehiculo from "./vehiculo";
/**
 * Factory Method para la creación de vehículos.
 * Permite instanciar vehículos sin acoplar la lógica al resto del sistema.
 */
export default class VehiculoFactory implements IVehiculoFactory {

    private gestor: IGestorTemporadas;

    constructor(gestor: IGestorTemporadas) {
        this.gestor = gestor;
    }
  
    /**
     * Crea un vehículo según su tipo.
     * @param {string} tipo - Tipo de vehículo ("compacto", "sedan", "suv").
     * @param {number} matricula - Matrícula del vehículo.
     * @returns {Vehiculo} Instancia del tipo solicitado.
     * @throws {Error} Si el tipo de vehículo no existe.
     */    
    crearVehiculo(tipo: string, matricula: number): Vehiculo {

        const tipoVehiculo = tipo.toLowerCase();

        if (tipoVehiculo === "compacto") {
            return new Compacto(matricula, this.gestor);
        }

        if (tipoVehiculo === "sedan") {
            return new Sedan(matricula, this.gestor);
        }

        if (tipoVehiculo === "suv") {
            return new SUV(matricula, this.gestor);
        }

        throw new Error(`Tipo de vehículo desconocido: ${tipo}`);
    }
}