export const typeDefs = `#graphql
    type User{
        userId: ID!
        email: String
        fullname: String
        hashedPassword: String
        
    }
    type Information{
        percentage: Int
        yearOfPassing: Int
        collegeName: String
        qualification: String
        stream: String
        location: String
        yearOfExperience: Int
        currentCTC: Int
        expectedCTC: Int
        phoneNumber: String
        applicantType: String
        noticePeriod: Int
        noticePeriodDuration: Int
        noticePeriodEnd: String
        previouslyApplied: Int
        previouslyAppliedRole: String
        referrer: String
    }
    type Preferences{
        jobId: JobPosting
        instructionalDesigner:Int
        softwareEngineer:Int
        qualityEngineer:Int
    }
    type SubOpening{
        openingId: ID!
        jobId:ID!
        jobRole: String
        compensation: Int
        description: String
        requirements: String
    }
    type JobPosting{
        jobId: ID!
        startDate: String
        expirationDate: String
        location: String  
        subOpening: [SubOpening]
    }
    type Application{
        applicationId: String
        opening: SubOpening
        user: User
        timeSlot: String
        resume: String
    }
    type Query{
        users: [User]
        user(id:ID!): User
        jobpostings: [JobPosting]
        jobposting(id:ID!): JobPosting
    }
    
`;

