import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import {createConnection} from "mysql2";
import {typeDefs} from "./schema.js";


const SECRET = 'my-secret-key';

const connection = createConnection({
    host: `localhost`,
    user: `root`,
    password: `krish303`,
    database: `QuantumSchema`,
});

connection.connect();


const queryAsync = promisify(connection.query).bind(connection);

const verifyToken = (token) => {
    try {
        if (!token) {
            return null;
        }
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};

const authenticateUser = async (email, password) => {
    try {
        const queryparams = [email];
        const query = "SELECT * FROM user WHERE email = ?";
        const result = await queryAsync(query, queryparams);
        if (result[0] != null && result[0].hashedPassword === password) {
            return {
                userId: result[0].userId,
                email
            };
        }

        return null;
    } catch (error) {
        console.error("Unexpected error:", error);
        throw new Error('Internal Server Error');
    }
};

const generateToken = (user) => {
    const {email, userId} = user;
    const token = jwt.sign({email, userId}, SECRET, {expiresIn: '1h'});
    return token;
};


async function getUsers() {
    const query = 'SELECT * FROM User';
    return await queryAsync(query);
}

async function getJobPosting() {
    const query = 'SELECT * FROM jobposting';
    return await queryAsync(query);
}

async function getTimeSlot() {
    const query = 'SELECT * FROM timeslot';
    return await queryAsync(query);
}

async function getJobRoles() {
    const query = 'SELECT * FROM jobrole';
    return await queryAsync(query);
}

async function getSubOpening() {
    const query = 'SELECT * FROM subopening';
    return await queryAsync(query);
}

async function getExpertise() {
    const query = 'SELECT * FROM expertise';
    return await queryAsync(query);
}

async function getFamiliarity() {
    const query = 'SELECT * FROM familiarity';
    return await queryAsync(query);
}

async function getPersonalInformation() {
    const query = 'SELECT * FROM personalInformation';
    return await queryAsync(query);
}

async function getApplication() {
    const query = 'SELECT * FROM Application';
    return await queryAsync(query);
}

async function getInformation() {
    const query = 'SELECT * FROM Information';
    return await queryAsync(query);
}

async function getPreference() {
    const query = 'SELECT * FROM Preferences';
    return await queryAsync(query);
}

const resolvers = {
    Query: {
        async users(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getUsers();
        },
        async user(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const users = await getUsers();
            return users.find((user) => String(user.userId) === args.id);
        },
        async jobPostings(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getJobPosting();
        },
        async jobPosting(_, args) {
            const JobPostings = await getJobPosting();
            return JobPostings.find((JobPosting) => String(JobPosting.jobId) === args.id);
        },
        async expertises(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getExpertise();
        },
        async expertise(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const expertise = await getExpertise();
            return expertise.find((user) => String(user.userId) === args.id);
        },
        async familiarities(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getFamiliarity();
        },
        async familiarity(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const familiarities = await getFamiliarity();
            return familiarities.find((familiarity) => String(familiarity.userId) === args.id);
        },
        async allInformation(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getInformation();
        },
        async information(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const allInformation = await getInformation();
            return allInformation.find((information) => String(information.userId) === args.id);
        },
        async preferences(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getPreference();
        },
        async preference(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const preferences = await getPreference();
            return preferences.find((preference) => String(preference.jobId) === args.id);
        },
        async allPersonalInformation(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getPersonalInformation();
        },
        async personalInformation(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const allPersonalInformation = await getPersonalInformation();
            return allPersonalInformation.find((personalInformation) => String(personalInformation.userId) === args.id);
        },
        async timeSlots(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getTimeSlot();
        },
        async timeSlot(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const timeSlots = await getTimeSlot();
            return timeSlots.find((TimeSlot) => String(TimeSlot.idtimeslot) === args.id);
        },
        async jobroles(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getJobRoles();
        },
        async jobrole(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const jobroles = await getJobRoles();
            return jobroles.find((jobrole) => String(jobrole.idjobRole) === args.id);
        },
        async subOpenings(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getSubOpening();
        },
        async subOpening(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const subOpenings = await getSubOpening();
            return subOpenings.find((subOpening) => String(subOpening.openingId) === args.id);
        },
        async applications(_, __, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            return await getApplication();
        },
        async application(_, args, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const applications = await getApplication();
            return applications.find((application) => String(application.applicationId) === args.id);
        },
    },
    User: {
        async expertise(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const expertises = await getExpertise();
            return expertises.find((expertise) => String(expertise.userId) === String(parent.userId));
        },
        async familiarity(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const familiarities = await getFamiliarity();
            return familiarities.find((familiarity) => String(familiarity.userId) === String(parent.userId));
        },
        async personalInformation(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const allPersonalInformation = await getPersonalInformation();
            return allPersonalInformation.find((personalInformation) => String(personalInformation.userId) === String(parent.userId));
        },
        async application(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const allApplication = await getApplication();
            return allApplication.filter((application) => String(application.userId) === String(parent.userId));
        },
        async information(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const allInformation = await getInformation();
            return allInformation.find((information) => String(information.userId) === String(parent.userId));
        },
    },
    JobPosting: {
        async subOpening(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const SubOpenings = await getSubOpening();
            return SubOpenings.filter((SubOpening) => String(SubOpening.jobId) === String(parent.jobId));
        },
        async preferences(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const preferences = await getPreference();
            return preferences.find((preference) => String(preference.jobId) === String(parent.jobId));
        },
    },
    SubOpening: {
        async application(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const applications = await getApplication();
            return applications.filter((application) => String(application.openingId) === String(parent.openingId));
        },
        async timeslot(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const timeslots = await getTimeSlot();
            return timeslots.filter((timeslot) => String(timeslot.openingId) === String(parent.openingId));
        },
        async jobrole(parent, _, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const jobroles = await getJobRoles();
            return jobroles.filter((jobrole) => String(jobrole.openingId) === String(parent.openingId));
        },
    },
    Mutation: {
        async createUser(_, {input}) {
            const {email, hashedPassword, fullname, expertise, familiarity, personalInformation, information} = input;

            const userInsert = await queryAsync(`
        INSERT INTO user (email, hashedPassword, fullname)
        VALUES (?, ?, ?)
      `, [email, hashedPassword, fullname]);

            const userId = userInsert.insertId;

            await queryAsync(`
        INSERT INTO expertise (userId, Javascript, NodeJs, AngularJs, ReactJs)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, expertise.Javascript, expertise.NodeJs, expertise.AngularJs, expertise.ReactJs]);

            await queryAsync(`
        INSERT INTO familiarity (userId, Javascript, NodeJs, AngularJs, ReactJs)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, familiarity.Javascript, familiarity.NodeJs, familiarity.AngularJs, familiarity.ReactJs]);

            await queryAsync(`
        INSERT INTO personalinformation (userId, phoneNumber, portfolioLink, resumeLink)
        VALUES (?, ?, ?, ?)
      `, [userId, personalInformation.phoneNumber, personalInformation.portfolioLink, personalInformation.resumeLink]);

            await queryAsync(`
        INSERT INTO information (userId, applicantType, yearsOfExperience, currentCTC, expectedCTC, noticePeriod, noticePeriodDuration, noticePeriodEnd, previouslyApplied, previouslyAppliedRole, referrer, percentage, yearOfPassing, collegeName, qualification, stream, city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [userId, information.applicantType, information.yearsOfExperience, information.currentCTC, information.expectedCTC, information.noticePeriod, information.noticePeriodDuration, information.noticePeriodEnd, information.previouslyApplied, information.previouslyAppliedRole, information.referrer, information.percentage, information.yearOfPassing, information.collegeName, information.qualification, information.stream, information.city]);

            return {userId, email, hashedPassword, fullname, expertise, familiarity, personalInformation, information};
        },

        async applyForJob(_, {input}, {user}) {
            if (!user) {
                throw new AuthenticationError('User not authenticated');
            }
            const {openingId, userId, timeSlot, resume} = input;

            const applicationInsert = await queryAsync(`
        INSERT INTO application (openingId, userId, timeSlot, resume)
        VALUES (?, ?, ?, ?)
      `, [openingId, userId, timeSlot, resume]);

            const applicationId = applicationInsert.insertId;

            return {applicationId, openingId, userId, timeSlot, resume};
        },
        login: async (_, {input}) => {
            const {email, password} = input;
            const user = await authenticateUser(email, password);
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const token = generateToken(user);
            return {token, user};
        },
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.headers.authorization || '';
        try {
            const user = verifyToken(token);
            return {user};
        } catch (error) {
            console.error('Token verification failed:', error);
            return {};
        }
    },
});
await server.start();
const app = express();
app.use(cors());
app.use(express.json());

server.applyMiddleware({app});

const port = 4452;

app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
