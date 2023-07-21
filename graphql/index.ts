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
