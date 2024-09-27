
## Descripción

Aplicación en Nest con manejo de usuarios, autenticación y transacciones.

## Explicación del proyecto

La aplicación utiliza una base de datos MySQL.

Para una mejor experiencia, decidí crear un docker-compose con la aplicación y la base de datos.


En la primera tarea opcional, decidí usar un **Subscriber** de TypeORM para poder verificar la cantidad de transacciones del usuario y hacer un **bulk update**. La razón por la cual decidí usar **Subscriber** es porque la tarea fue muy específica con la cantidad de transacciones. Otra buena solución podría haber sido usar un **CRON** (https://docs.nestjs.com/techniques/task-scheduling) que corra un par de veces al día, cuando la aplicación no esté con mucha carga, y actualizar por **lotes**. Sin embargo, de esa manera se perdería el control de las cantidades y no sería exactamente 50.000.

De todas formas, la actualización se hace en lotes de 1000, agrupando las respuestas en un array de promesas y ejecutando las consultas en paralelo. Una estrategia más óptima podría haber sido usar un sistema de colas como RabbitMQ o BullMQ (https://docs.nestjs.com/techniques/queues), con más tiempo lo habría implementado.

Para el borrado de registros, opté por un borrado lógico, para no perder las referencias de los datos.

Apliqué también autenticación y autorización por **roles** para proteger algunas consultas.

Agregué también documentación con **Swagger**, que se puede acceder en la ruta http://localhost:3000/api-docs.

## Instalación (entorno local)

```bash
$ npm install
```

## Instalación (Docker)

```bash
$ docker-compose up --build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

