import * as pg from 'pg'
import { Sequelize, Op } from 'sequelize'
import fs from 'fs'
import path from 'path'

import {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    PGUSER,
    PGPASSWORD,
    PGHOST,
    PGPORT,
    PGDATABASE,
} from '../config'

const sequelize =
    process.env.NODE_ENV === 'production'
        ? new Sequelize({
              database: PGDATABASE,
              dialectModule: pg,
              dialect: 'postgres',
              host: PGHOST,
              port: +PGPORT,
              username: PGUSER,
              password: PGPASSWORD,
              pool: {
                  max: 3,
                  min: 1,
                  idle: 10000,
              },
              dialectOptions: {
                  ssl: {
                      require: true,
                      // Ref.: https://github.com/brianc/node-postgres/issues/2009
                      rejectUnauthorized: false,
                  },
                  keepAlive: true,
              },
              ssl: true,
          })
        : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
              host: DB_HOST,
              port: +DB_PORT,
              dialect: 'postgres',
              logging: false,
              native: false,
          })

const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)))
    })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
])

sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Videogame.belongsToMany(Genre, {
    through: 'Videogame_Genres',
})

Genre.belongsToMany(Videogame, {
    through: 'Videogame_Genres',
})

export default {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
    Op,
}
