import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./schema.js";
import {createConnection} from "mysql2";
import {promisify} from 'util';

const connection = createConnection({
    host: `localhost`,
    user: `root`,
    password: `krish303`,
    database: `QuantumSchema`,
});

connection.connect();


const queryAsync = promisify(connection.query).bind(connection);

async function getUsers() {
    const query = 'SELECT * FROM User';
    return await queryAsync(query);
}

async function getJobPosting() {
    const query = 'SELECT * FROM jobposting';
    return await queryAsync(query);
}

async function getSubOpening() {
    const query = 'SELECT * FROM SubOpening';
    return await queryAsync(query);
}

const resolvers = {
    Query: {
        async users() {
            return await getUsers();
        },
        async user(_, args) {
            const users = await getUsers();
            return users.find((user) => String(user.userId) === args.id);
        },
        async jobpostings() {
            return await getJobPosting();
        },
        async jobposting(_, args) {
            const JobPostings = await getJobPosting();
            return JobPostings.find((JobPosting) => String(JobPosting.jobId) === args.id);
        }
    },
    JobPosting: {
        async subOpening(parent) {
            const SubOpenings = await getSubOpening();
            return SubOpenings.filter((SubOpening) => (SubOpening.jobId) === (parent.jobId));
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const url = await startStandaloneServer(server, {
    listen: {port: 4452},
});

console.log("Server Ready at Port:", 4452);
