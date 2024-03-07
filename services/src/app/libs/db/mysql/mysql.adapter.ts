import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "VFt!03w^P7r9UmIIr9S0TYi5DiW8$bEQ",
    database: "bbva",
    synchronize: true,
    entities: ['src/**/*.entity.ts'],
    insecureAuth: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

