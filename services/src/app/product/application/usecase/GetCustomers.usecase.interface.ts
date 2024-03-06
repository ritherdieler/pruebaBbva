import { Customer } from "../../infraestructure/entity/Customer.entity";

export interface GetCustomerUseCase{

run:()=>Promise<Customer[]>

}