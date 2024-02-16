import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            token
        }
    }
`