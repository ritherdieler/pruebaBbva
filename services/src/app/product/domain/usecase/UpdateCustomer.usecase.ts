import {validate} from "class-validator";
import {AppDataSource} from "../../../libs/db/mysql/mysql.adapter";
import { UpdateCustomerUseCase } from "../../application/usecase/UpdateCustomer.usecase.interface";
import { Customer } from "../../infraestructure/entity/Customer.entity";
import { UpdateCustomerRequest } from "../request/UpdateCustomer.request";

export function UpdateCustomerUseCaseImpl(): UpdateCustomerUseCase {

    const repository = AppDataSource.getRepository(Customer)

    return {
        run: async (request: UpdateCustomerRequest, customerId: number) => {

            const customerResult = await repository.findOneBy({id: customerId})
            if (customerResult == null) throw Error('El cliente no existe')
            customerResult.names = request.names
            customerResult.age = request.age

            const errors = await validate(customerResult)
            if (errors.length > 0) {
                throw Error('Validation error: ' + errors.map(error => Object.values(error.constraints)).flat())
            }

            return await repository.update(customerId, customerResult);
        }
    };

}