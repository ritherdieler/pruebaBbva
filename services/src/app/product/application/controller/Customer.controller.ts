import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetCustomerUseCase } from "../usecase/GetCustomers.usecase.interface";
import { GetCustomersImpl } from "../../domain/usecase/GetCustomers.usecase";
import { FindCustomertByIdUseCase } from "../usecase/FindCustomerById.usecase.interface";
import { FindCustomerByIdImpl } from "../../domain/usecase/FindCustomertById.usecase";
import { UpdateCustomerRequest } from "../../domain/request/UpdateCustomer.request";
import { UpdateCustomerUseCase } from "../usecase/UpdateCustomer.usecase.interface";
import { UpdateCustomerUseCaseImpl } from "../../domain/usecase/UpdateCustomer.usecase";
import { DeleteCustomerUseCase } from "../usecase/DeleteCustomer.usecase.interface";
import { DeleteCustomerUseCaseImpl } from "../../domain/usecase/DeleteCustomer.usecase";
import { SaveCustomerRequest } from "../../domain/request/SaveCustomer.request";
import { SaveCustomerUseCase } from "../usecase/SaveCustomer.usecase.interface";
import { SaveCustomerUseCaseImpl } from "../../domain/usecase/SaveCustomer.usecase";

export async function CustomerController(fastify: FastifyInstance) {

    const getCustomersUseCase: GetCustomerUseCase = GetCustomersImpl()
    const findCustomerByIdUseCase:FindCustomertByIdUseCase = FindCustomerByIdImpl()
    const updateCustomerUseCase:UpdateCustomerUseCase = UpdateCustomerUseCaseImpl()
    const deleteCustomerUseCase:DeleteCustomerUseCase = DeleteCustomerUseCaseImpl()
    const saveCustomerUseCase:SaveCustomerUseCase = SaveCustomerUseCaseImpl()

    fastify.post('/', async (request: FastifyRequest<{
        Body: SaveCustomerRequest
    }>, reply) => {
        try {
            await saveCustomerUseCase.run(request.body)
            reply.status(200).send({ mensaje: 'Cliente guardado con exito'})
        } catch (error) {
            console.log(error)
            reply.code(500).send(error);
        }
    })


    fastify.get("/",
        async (request: FastifyRequest<{}>, reply: FastifyReply) => {
            try {
                const result = await getCustomersUseCase.run()
                reply.status(200).send(result)
            } catch (error) {
                reply.status(500).send(error)
            }
        }
    )

    fastify.get("/:id_client",
        async (request: FastifyRequest<{
            Params: { id_client: number }
        }>, reply: FastifyReply) => {
            try {
                const result = await findCustomerByIdUseCase.run(request.params.id_client)
                reply.status(200).send(result)
            } catch (error) {
                reply.status(500).send(error)
            }
        }
    )

    fastify.put('/:id_client', async (request: FastifyRequest<{
        Params: { id_client: number },
        Body: UpdateCustomerRequest
    }>, reply) => {
        try {
     
            await updateCustomerUseCase.run(request.body, request.params.id_client)
            reply.status(200).send({ mensaje: 'Datos guardados correctamente'})
        } catch (error) {
            console.log(error)
            reply.code(500).send(error);
        }
    })


    fastify.delete('/:id_client', async (request: FastifyRequest<{
        Params: { id_client: number },
    }>, reply) => {
        try {
            await deleteCustomerUseCase.run(request.params.id_client)
            reply.status(200).send({ mensaje: 'Cliente eliminado correctamente'})
        } catch (error) {
            console.log(error)
            reply.code(500).send(error);
        }
    })


}

