# 🚗 Drive Hub - Sistema de Gestión de Alquiler de Autos

Drive Hub es una plataforma de gestión de alquiler de vehículos diseñada para administrar una flota de autos y las reservas realizadas por los clientes.  
El sistema permite manejar diferentes tipos de vehículos (Compacto, Sedán y SUV), aplicar tarifas según el tipo y la temporada, registrar mantenimientos y controlar las reglas de negocio que aseguran la correcta creación de reservas.  
El proyecto es un trabajo práctico grupal de la materia con una implementación práctica de un sistema orientado a objetos.  

---

### 🎯 Objetivo
Desarrollar el sistema de alquiler de autos para gestionar vehículos, reservas, clientes y mantenimientos, aplicando los principios de la programación orientada a objetos aprendidos en clase.

---

### 🧩 Arquitectura
El proyecto está desarrollado en *TypeScript* y se estructura mediante las siguientes clases:

- **Vehículo.** Clase base que define las propiedades y comportamientos comunes de los vehículos. Incluye manejo de estado, kilometraje y mantenimiento.
- **Compacto, Sedán, SUV.** Clases que heredan de Vehículo y definen la lógica de tarifas y cargos adicionales según su tipo.
- **Cliente.** Representa a un cliente de la plataforma. Contiene su información personal y sus reservas.
- **Reserva.** Contiene los datos de una reserva y calcula sus días.
- **Mantenimiento.** Registra la fecha, costo y descripción de un mantenimiento realizado a un vehículo.
- **GestorTemporadas.** Determina la temporada según la fecha de inicio de la reserva y aplica el porcentaje correspondiente sobre la tarifa base.
- **VehiculoFactory.** Implementación del Factory Method que crea instancias de Compacto, Sedan y SUV.
- **Disponible, EnAlquiler, EnMantenimiento.** Implementaciones del patrón State que gobiernan el comportamiento de reserva según el estado actual del vehículo.
- **CalculadoraEstadisticas.** Genera estadísticas del sistema, como el vehículo más y menos alquilado, la rentabilidad por vehículo y el porcentaje de ocupación de la flota.
- **DriveHub.** Clase principal que coordina la gestión general del sistema: clientes, vehículos, reservas y mantenimientos.

---

### 🧱 Patrones de Diseño Implementados

- **STATE :**
Modela el comportamiento del vehículo según su estado actual (Disponible, EnAlquiler, EnMantenimiento) mediante la interfaz IEstadoVehiculo.
Los objetos Vehiculo delegan en el Estado la verificación de si pueden reservarse, evitando condicionales en Vehiculo o DriveHub. Cada clase de estado encapsula sus propias reglas (por ejemplo, Disponible valida km/tiempo/alquileres).
Esto facilita agregar nuevos estados sin modificar la lógica existente.

- **FACTORY METHOD :**
Centraliza la creación de objetos Vehiculo (Compacto, Sedan, SUV) en una fábrica (VehiculoFactory) que implementa la interfaz IVehiculoFactory. DriveHub no conoce las clases concretas de vehículos. Permite agregar nuevos tipos de vehículos sin modificar el código de DriveHub.

- **STRATEGY :**
Encapsula la lógica para calcular el porcentaje de ajuste por temporada en una estrategia externa (IGestorTemporadas / GestorTemporadas). Cambiar la política de temporadas no requiere tocar vehículos.

- **FACADE :**
DriveHub funciona como punto de acceso único al sistema, ofreciendo una interfaz simplificada para operaciones complejas:ingresarVehiculo(), ingresarReserva(), agregarMantenimientoAVehiculo().
Oculta la complejidad interna y coordina múltiples clases. Si bien no implementa el patrón Facade en su versión más formal, sí cumple la función de actuar como una puerta de entrada coherente hacia un conjunto de componentes más detallados.

---

### 📖 Documentación
El proyecto cuenta con documentación generada con JSDoc, que describe detalladamente las clases, métodos y atributos del sistema. Esta documentación facilita la comprensión de la estructura del código y cómo interactúan los distintos componentes. Permite entender los métodos, su funcionalidad, sus parámetros  y retornos.

---

### 🧪 Pruebas unitarias
El proyecto cuenta con las pruebas unitarias que validan la funcionalidad del sistema. De tal manera, se facilita la detección temprana de errores y se asegura la correcta funcionalidad de:
- Creación de vehículos y clientes.
- Lógica de cálculo de tarifas.
- Gestión de reservas y mantenimientos.
- Reglas de negocio para disponibilidad de vehículos.

---

### ⚙️ Instrucciones de compilación y funcionamiento
1. Se deben instalar las dependencias *(npm install)*.
2. Compilar el proyecto *(npm run build).*
3. Ejecutar las pruebas unitarias *(npm run test).*