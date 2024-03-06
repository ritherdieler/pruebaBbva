import {AppDataSource} from "../../../libs/db/mysql/mysql.adapter";
import { Customer } from "../../infraestructure/entity/Customer.entity";
import { FindCustomertByIdUseCase } from "../../application/usecase/FindCustomerById.usecase.interface";

export function FindCustomerByIdImpl(): FindCustomertByIdUseCase{

const repository = AppDataSource.getRepository(Customer)

    return {
        run: async (id: number) => {
            const result = await repository.findOneBy({id:id})
            return await result
        }
    };

}