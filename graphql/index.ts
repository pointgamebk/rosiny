export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                id
            }
        }
    }
`;

export const createPressMutation = `
	mutation CreatePress($input: PressCreateInput!) {
		pressCreate(input: $input) {
			press {
				id
				type
				strain
        notes
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updatePressMutation = `
	mutation UpdatePress($id: ID!, $input: PressUpdateInput!) {
		pressUpdate(by: { id: $id }, input: $input) {
			press {
				id
				type
        strain
				notes
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deletePressMutation = `
  mutation DeletePress($id: ID!) {
    pressDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const pressesQuery = `
  query GetPresses {
    pressCollection(first: 10) {
      edges {
        node {
          id
          type
          strain
          notes
          image
          createdBy {
            id
            name
            avatarUrl
            email
          }
        }
      }
    }
  }
`;

export const pressesByType = `
  query GetPressesByType($type: String) {
    pressSearch(first: 10, filter: {type: {eq: $type}}) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      node {
        type
        strain
        image
        notes
        id
      }
    }
  }
  }
`;

// export const pressesQuery = `
//   query getPresses($type: String, $endcursor: String) {
//     pressSearch(first: 8, after: $endcursor, filter: {type: {eq: $type}}) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       edges {
//         node {
//           id
//           type
//           strain
//           notes
//           image
//           createdBy {
//             id
//             email
//             name
//             avatarUrl
//           }
//         }
//       }
//     }
//   }
// `;

export const getPressByIdQuery = `
  query GetPressById($id: ID!) {
    press(by: { id: $id }) {
      id
      type
      strain
      notes
      image
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getPressesOfUserQuery = `
  query getUserPresses($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      avatarUrl
      presses(last: $last) {
        edges {
          node {
            id
            type
            strain
            image
          }
        }
      }
    }
  }
`;
