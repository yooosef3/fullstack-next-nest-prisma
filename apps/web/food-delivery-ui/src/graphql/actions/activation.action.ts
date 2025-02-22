"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ACTIVATE_USER: DocumentNode = gql`
  mutation ActivateUser($activationToken: String!, $activationCode: String!) {
    activateUser(
      activationInput: {  
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      user {
        name
        email
        phone_number
        createdAt
      }
    }
  }
`;