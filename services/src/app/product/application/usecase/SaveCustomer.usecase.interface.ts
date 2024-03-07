import { SaveCustomerRequest } from "../../domain/request/SaveCustomer.request";

export interface SaveCustomerUseCase {
    run: (request:SaveCustomerRequest) => Promise<any>
}