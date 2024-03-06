export interface DeleteCustomerUseCase{
    run:(id:number) => Promise<any>
}