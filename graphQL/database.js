import { createConnection } from "mysql2";

export const connection = createConnection({
    host: `localhost`,
    user: `root`,
    password: `Jugal@1234`,
    database: `ZeusSchema`,
});

connection.connect();

