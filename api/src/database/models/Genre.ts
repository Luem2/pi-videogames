import type { BelongsToManyAddAssociationMixin } from 'sequelize'
import type Videogame from './Videogame'

import { Model, DataTypes } from 'sequelize'

import db from '../connection'


class Genre extends Model {
    declare name: string

    addVideogame: BelongsToManyAddAssociationMixin<Videogame, Videogame[]>
    setVideogames: BelongsToManyAddAssociationMixin<Videogame, Videogame[]>
}

Genre.init(
    {
        name: { type: DataTypes.STRING },
    },
    {
        sequelize: db,
        modelName: 'Genre',
        timestamps: false,
    }
)

export default Genre
