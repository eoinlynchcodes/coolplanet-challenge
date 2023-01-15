export interface User {
    avatar?: string;
    company: {
      name: string;
      department: string;
    };
    dob: string;
    email: string;
    emailVerified: boolean;
    first_name: string;
    id: number;
    last_name: string;
    skills?: [string];
  }

 export type UserList = Array<User> | null;