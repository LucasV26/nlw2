import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    // Recuperando os dados do ORMconfig
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        // process.env.* -> objeto que guarda as variáveis de ambiente
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test"
                ? "./src/database/database.test.sqlite"
                : defaultOptions.database
        })
    );
};