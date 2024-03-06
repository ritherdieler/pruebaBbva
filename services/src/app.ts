import { buildServer } from './server'

const start = async () => {
  const fastifyServer  = buildServer(
    { logger:true }
  );
    const port_server: number = 8083
    
    try {
        await fastifyServer.listen({ port: port_server, host: '127.0.0.1' })
    } catch (error) {
        fastifyServer.log.error(error);
        process.exit(1);
    }
}

start();