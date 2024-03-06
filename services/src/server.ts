import Fastify, {FastifyServerOptions, FastifyRequest, FastifyReply} from 'fastify';
import { CustomerController } from './app/product/application/controller/Customer.controller';


export const buildServer = (options: FastifyServerOptions) => {
    const fastify = Fastify(options)
        // .register(cors, {
        //   origin: [
        //     "http://localhost:4200",
        //     "http://localhost:3001"
        //   ],
        //   methods: '*',
        //   preflightContinue: false
        // })
        .register(CustomerController, {prefix: "/reto/services/clients"})
        .setErrorHandler(async (error: Error, req: FastifyRequest, reply: FastifyReply) => {
            if (reply.statusCode === 200) {
                reply.status(409)
                reply.send({
                    code: 409,
                    message: `${error.name} - ${error.message}`
                });
            } else {
                reply.send({
                    code: reply.statusCode,
                    message: `${error.name} - ${error.message}`
                });
            }
        })

        .get("/", async (req: FastifyRequest, reply: FastifyReply) => {
            reply.code(200).send({message: "API BBVA"})
        });
    return fastify

}