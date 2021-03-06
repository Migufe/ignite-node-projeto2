import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { DataSource } from 'typeorm'
import { TestsDataSource } from '@shared/infra/typeorm/connections/tests'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

let connection: DataSource

describe('Create Category Controller', () => {

    beforeAll(async () => {
		connection = await TestsDataSource.initialize()
	})

	beforeEach(async () => {
		const id = uuidV4()
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX', 'null')
        `)
	})

	// afterEach(async () => {
    //     await connection.manager.clear(Category)
	// })

	afterAll(async () => {
		await connection.destroy()
	})

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@rentx.com.br",
                password: "admin",
            });
        
        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201);
    });
})