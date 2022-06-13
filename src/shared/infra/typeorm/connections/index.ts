import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { DataSource } from 'typeorm'

export const PostgresDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'ignite',
	database: 'rentx',
	entities: [User, Car, CarImage, Category, Specification, Rental],
	migrations: [
		'./src/shared/infra/typeorm/migrations/*.ts'
	],
	synchronize: true,
    logging: true
})