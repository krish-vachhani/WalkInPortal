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