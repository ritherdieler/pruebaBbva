import { AppDataSource } from "../../../libs/db/mysql/mysql.adapter";
import { GetCustomerUseCase } from "../../application/usecase/GetCustomers.usecase.interface";
import { Customer } from "../../infraestructure/entity/Customer.entity";

export function GetCustomersImpl(): GetCustomerUseCase {

    const repository =  AppDataSource.getRepository(Customer)

    return {
        run: async () => {
           return await repository.find();
        }
    }
}