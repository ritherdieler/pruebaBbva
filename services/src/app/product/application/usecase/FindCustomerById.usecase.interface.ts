import { Customer } from "../../infraestructure/entity/Customer.entity";

export interface FindCustomertByIdUseCase {
    run: (id: number) => Promise<Customer| null>
}