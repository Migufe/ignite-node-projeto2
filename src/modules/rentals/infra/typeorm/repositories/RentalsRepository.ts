import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { Repository } from 'typeorm'
import { database } from "@shared/infra/typeorm/helpers/db-connection-helper";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = database.getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: {
                car_id: car_id
            }
        })

        return openByCar!
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: {
                user_id: user_id
            }
        })

        return openByUser!
    }

    async create({
        car_id,
        user_id,
        expected_return_date
        }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date
        })

        await this.repository.save(rental)

        return rental
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: {
                id: id
            }
        })

        return rental!
    }

}

export { RentalsRepository }