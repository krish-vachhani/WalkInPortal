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
        async users() {
            return await getUsers();
        },
        async user(_, args) {
            const users = await getUsers();
            return users.find((user) => String(user.userId) === args.id);
        },
        async jobPostings() {
            return await getJobPosting();
        },
        async jobPosting(_, args) {
            const JobPostings = await getJobPosting();
            return JobPostings.find((JobPosting) => String(JobPosting.jobId) === args.id);
        },
        async expertises() {
            return await getExpertise();
        },
        async expertise(_, args) {
            const expertise = await getExpertise();
            return expertise.find((user) => String(user.userId) === args.id);
        },
        async familiarities() {
            return await getFamiliarity();
        },
        async familiarity(_, args) {
            const familiarities = await getFamiliarity();
            return familiarities.find((familiarity) => String(familiarity.userId) === args.id);
        },
        async allInformation() {
            return await getInformation();
        },
        async information(_, args) {
            const allInformation = await getInformation();
            return allInformation.find((information) => String(information.userId) === args.id);
        },
        async preferences() {
            return await getPreference();
        },
        async preference(_, args) {
            const preferences = await getPreference();
            return preferences.find((preference) => String(preference.jobId) === args.id);
        },
        async allPersonalInformation() {
            return await getPersonalInformation();
        },
        async personalInformation(_, args) {
            const allPersonalInformation = await getPersonalInformation();
            return allPersonalInformation.find((personalInformation) => String(personalInformation.userId) === args.id);
        },
        async timeSlots() {
            return await getTimeSlot();
        },
        async timeSlot(_, args) {
            const timeSlots = await getTimeSlot();
            return timeSlots.find((TimeSlot) => String(TimeSlot.idtimeslot) === args.id);
        },
        async jobroles() {
            return await getJobRoles();
        },
        async jobrole(_, args) {
            const jobroles = await getJobRoles();
            return jobroles.find((jobrole) => String(jobrole.idjobRole) === args.id);
        },
        async subOpenings() {
            return await getSubOpening();
        },
        async subOpening(_, args) {
            const subOpenings = await getSubOpening();
            return subOpenings.find((subOpening) => String(subOpening.openingId) === args.id);
        },
        async applications() {
            return await getApplication();
        },
        async application(_, args) {
            const applications = await getApplication();
            return applications.find((application) => String(application.applicationId) === args.id);
        }
    },
    User: {
        async expertise(parent) {
            const expertises = await getExpertise();
            return expertises.find((expertise) => String(expertise.userId) === String(parent.userId));
        },
        async familiarity(parent) {
            const familiarities = await getFamiliarity();
            return familiarities.find((familiarity) => String(familiarity.userId) === String(parent.userId));
        },
        async personalInformation(parent) {
            const allPersonalInformation = await getPersonalInformation();
            return allPersonalInformation.find((personalInformation) => String(personalInformation.userId) === String(parent.userId));
        },
        async application(parent) {
            const allApplication = await getApplication();
            return allApplication.filter((application) => String(application.userId) === String(parent.userId));
        },
        async information(parent) {
            const allInformation = await getInformation();
            return allInformation.find((information) => String(information.userId) === String(parent.userId));
        }
    },
    JobPosting: {
        async subOpening(parent) {
            const SubOpenings = await getSubOpening();
            return SubOpenings.filter((SubOpening) => String(SubOpening.jobId) === String(parent.jobId));
        },
        async preferences(parent) {
            const preferences = await getPreference();
            return preferences.find((preference) => String(preference.jobId) === String(parent.jobId));
        }
    },
    SubOpening: {
        async application(parent) {
            const applications = await getApplication();
            return applications.filter((application) => String(application.openingId) === String(parent.openingId));
        },
        async timeslot(parent) {
            const timeslots = await getTimeSlot();
            return timeslots.filter((timeslot) => String(timeslot.openingId) === String(parent.openingId));
        },
        async jobrole(parent) {
            const jobroles = await getJobRoles();
            return jobroles.filter((jobrole) => String(jobrole.openingId) === String(parent.openingId));
        }
    },
    Mutation: {
        async createUser(_, {input}) {
            const {email, hashedPassword, fullname, expertise, familiarity, personalInformation, information} = input;

            const userInsert = await queryAsync(`
        INSERT INTO user (email, hashedPassword, fullname)
        VALUES (?, ?, ?)
      `, [email, hashedPassword, fullname]);

            const userId = userInsert.insertId;
            // console.log(userId)

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

        //   async createJobPosting(_, {input}) {
        //       const {title, startDate, expirationDate, location, preferences, subOpening} = input;
        //
        //
        //       const jobPostingInsert = await queryAsync(`
        //   INSERT INTO jobposting (title, startDate, expirationDate, location)
        //   VALUES (?, ?, ?, ?)
        // `, [title, startDate, expirationDate, location]);
        //
        //       const jobId = jobPostingInsert.insertId;
        //
        //
        //       await queryAsync(`
        //   INSERT INTO preferences (jobId, InstructionalDesigner, SoftwareEngineer, QualityEngineer)
        //   VALUES (?, ?, ?, ?)
        // `, [jobId, preferences.InstructionalDesigner, preferences.SoftwareEngineer, preferences.QualityEngineer]);
        //
        //
        //       for (const subOpeningInput of subOpening) {
        //           const {application, timeslot, jobrole} = subOpeningInput;
        //
        //           const subOpeningInsert = await queryAsync(`
        //     INSERT INTO subopening (jobId)
        //     VALUES (?)
        //   `, [jobId]);
        //
        //           const openingId = subOpeningInsert.insertId;
        //
        //
        //           for (const applicationInput of application) {
        //               await queryAsync(`
        //       INSERT INTO application (openingId, userId, timeSlot, resume)
        //       VALUES (?, ?, ?, ?)
        //     `, [openingId, applicationInput.userId, applicationInput.timeSlot, applicationInput.resume]);
        //           }
        //
        //
        //           for (const timeslotInput of timeslot) {
        //               await queryAsync(`
        //       INSERT INTO timeslot (openingId, slot)
        //       VALUES (?, ?)
        //     `, [openingId, timeslotInput.slot]);
        //           }
        //
        //
        //           for (const jobroleInput of jobrole) {
        //               await queryAsync(`
        //       INSERT INTO jobrole (openingId, role, compensation, description, requirements)
        //       VALUES (?, ?, ?, ?, ?)
        //     `, [openingId, jobroleInput.role, jobroleInput.compensation, jobroleInput.description, jobroleInput.requirements]);
        //           }
        //       }
        //
        //       return {jobId, title, startDate, expirationDate, location, preferences, subOpening};
        //   },

        async applyForJob(_, {input}) {
            const {openingId, userId, timeSlot, resume} = input;

            const applicationInsert = await queryAsync(`
        INSERT INTO application (openingId, userId, timeSlot, resume)
        VALUES (?, ?, ?, ?)
      `, [openingId, userId, timeSlot, resume]);

            const applicationId = applicationInsert.insertId;

            return {applicationId, openingId, userId, timeSlot, resume};
        },
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const url = await startStandaloneServer(server, {
    listen: {port: 4452},
});

console.log("Server Ready at Port:", 4452);
