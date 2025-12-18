import { gql } from 'apollo-angular';

export const user = gql`
  query user {
    user {
      id
      fullName
      type
      idac
      email
      createdAt
      mandatoryChangePassword
      identityIdList
      documentType
    }
  }
`;

export const userFullName = gql`
  query user {
    user {
      fullName
    }
  }
`;

export const identityIdList = gql`
  query user {
    user {
      identityIdList
      documentType
    }
  }
`;