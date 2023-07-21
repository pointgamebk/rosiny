import { User, Session } from "next-auth";

export type FormState = {
  type: string;
  strain: string;
  image: string;
  notes: string;
};

export interface PressInterface {
  type: string;
  strain: string;
  image: string;
  notes: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  presses: {
    edges: { node: PressInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface PressForm {
  type: string;
  strain: string;
  image: string;
  notes: string;
}
