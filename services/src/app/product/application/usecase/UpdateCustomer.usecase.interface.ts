import { UpdateCustomerRequest } from "../../domain/request/UpdateCustomer.request";

export interface UpdateCustomerUseCase {
    run: (request:UpdateCustomerRequest, customerId:number) => Promise<any>
}