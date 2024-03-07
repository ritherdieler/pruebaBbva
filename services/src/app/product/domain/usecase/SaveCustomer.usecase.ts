import { validate } from "class-validator";
import { AppDataSource } from "../../../libs/db/mysql/mysql.adapter";
import { Customer } from "../../infraestructure/entity/Customer.entity";
import { SaveCustomerUseCase } from "../../application/usecase/SaveCustomer.usecase.interface";
import { SaveCustomerRequest } from "../request/SaveCustomer.request";

export function SaveCustomerUseCaseImpl(): SaveCustomerUseCase {

    const repository = AppDataSource.getRepository(Customer)

    return {
        run: async (request: SaveCustomerRequest) => {
            const customer = new Customer(request.names, request.age)
            const errors = await validate(customer)
            if (errors.length > 0) {
                throw Error('Validation error: ' + errors.map(error => Object.values(error.constraints)).flat())
            }

            return await repository.save(customer);
        }
    };

}