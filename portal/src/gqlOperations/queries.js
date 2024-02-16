import { gql } from '@apollo/client';

export const GET_ALL_LISTINGS = gql`
    query JobPostings {
        jobPostings {
            expirationDate
            jobId
            title
            subOpening {
                jobId
                jobrole {
                    idjobRole
                    openingId
                    role
                    compensation
                    description
                    requirements
                }
                openingId
                timeslot {
                    idtimeslot
                    openingId
                    slot
                }
            }
            startDate
            location
        }
    }
`

export const GET_SINGLE_LISTING = gql`
    query JobPosting($jobPostingId: ID!) {
        jobPosting(id: $jobPostingId) {
            jobId
            title
            startDate
            expirationDate
            location
            subOpening {
                openingId
                jobId
                application {
                    applicationId
                    openingId
                    userId
                    timeSlot
                    resume
                }
                timeslot {
                    idtimeslot
                    openingId
                    slot
                }
                jobrole {
                    idjobRole
                    openingId
                    role
                    compensation
                    description
                    requirements
                }
            }
            preferences {
                jobId
                InstructionalDesigner
                SoftwareEngineer
                QualityEngineer
            }
        }
    }

`