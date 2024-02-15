export const typeDefs = `#graphql
type User{
    userId: ID!
    email: String
    hashedPassword: String
    fullname: String
    expertise:Expertise!
    familiarity:Familiarity!
    personalInformation:PersonalInformation!
    application:[Application!]
    information:Information!
}

type Expertise{
    userId:ID!
    Javascript: Int
    NodeJs:Int
    AngularJs: Int
    ReactJs: Int
}

type Familiarity{
    userId:ID!
    Javascript: Int
    NodeJs:Int
    AngularJs: Int
    ReactJs: Int
}
type Information{
    userId:ID!
    applicantType: String
    yearsOfExperience: Int
    currentCTC: Int
    expectedCTC: Int
    noticePeriod: Int
    noticePeriodDuration: Int
    noticePeriodEnd: String
    previouslyApplied: Int
    previouslyAppliedRole: String
    referrer: String
    percentage: Int
    yearOfPassing: Int
    collegeName: String
    qualification: String
    stream: String
    city:String
}
type Preferences{
    jobId: ID!
    InstructionalDesigner:Int
    SoftwareEngineer:Int
    QualityEngineer:Int
}
type PersonalInformation{
    userId:ID!
    phoneNumber:String
    portfolioLink:String
    resumeLink:String
}
type TimeSlot{
    idtimeslot:ID!
    openingId:ID!
    slot:String
}
type JobRole{
    idjobRole:ID!
    openingId:ID!
    role:String
    compensation: Int
    description: String
    requirements: String
}
type SubOpening{
    openingId: ID!
    jobId:ID!
    application: [Application!]
    timeslot:[TimeSlot!]
    jobrole:[JobRole!]
}

type JobPosting{
    jobId: ID!
    title:String
    startDate: String
    expirationDate: String
    location: String
    subOpening: [SubOpening!]
    preferences: Preferences!
}

type Application{
    applicationId: ID!
    openingId:ID!
    userId: ID!
    timeSlot: String
    resume: String
}

type Query {
    users: [User]
    user(id: ID!): User
    expertises: [Expertise]
    expertise(id: ID!): Expertise
    familiarities: [Familiarity]
    familiarity(id: ID!): Familiarity
    allInformation: [Information]
    information(id: ID!): Information
    preferences: [Preferences]
    preference(id: ID!): Preferences
    allPersonalInformation: [PersonalInformation]
    personalInformation(id: ID!): PersonalInformation
    timeSlots: [TimeSlot]
    timeSlot(id: ID!): TimeSlot
    jobroles: [JobRole]
    jobrole(id: ID!): JobRole
    subOpenings: [SubOpening]
    subOpening(id: ID!): SubOpening
    jobPostings: [JobPosting]
    jobPosting(id: ID!): JobPosting
    applications: [Application]
    application(id: ID!): Application
}
`;

