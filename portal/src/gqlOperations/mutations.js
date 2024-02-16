import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                userId
            }
        }
    }
`


export const APPLY_FOR_JOB = gql`
    mutation ApplyForJob($input: ApplyForJobInput!) {
        applyForJob(input: $input) {
            openingId
            userId
            timeSlot
            resume
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            email
            hashedPassword
            fullname
            expertise {
                Javascript
                NodeJs
                AngularJs
                ReactJs
            }
            familiarity {
                Javascript
                NodeJs
                AngularJs
                ReactJs
            }
            personalInformation {
                phoneNumber
                portfolioLink
                resumeLink
            }
            information {
                applicantType
                yearsOfExperience
                currentCTC
                expectedCTC
                noticePeriod
                noticePeriodDuration
                noticePeriodEnd
                previouslyApplied
                previouslyAppliedRole
                referrer
                percentage
                yearOfPassing
                collegeName
                qualification
                stream
                city
            }
        }
    }
`