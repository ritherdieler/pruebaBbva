import { AppDataSource } from "../../../libs/db/mysql/mysql.adapter";
import { DeleteCustomerUseCase } from "../../application/usecase/DeleteCustomer.usecase.interface";
import { Customer } from "../../infraestructure/entity/Customer.entity";

export function DeleteCustomerUseCaseImpl(): DeleteCustomerUseCase {
    const repository = AppDataSource.getRepository(Customer)
    return {
        run: async (id: number) => {
            const customer = await repository.delete(id);
        },
    }
}