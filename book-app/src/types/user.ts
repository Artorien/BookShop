export interface UserInterface {
  user: {
    dateOfCreation: string;
    email: string;
    id: string;
    purchases: [];
    purchasesLocalMemory: string[];
    token: string;
    jwtToken: string;
    wishlist: string[];
  };
}

export interface User {
  dateOfCreation: string;
  email: string;
  id: string;
  purchases: [];
  purchasesLocalMemory: string[];
  token: string;
  jwtToken: string;
  wishlist: string[];
}

export interface RootInterface {
  user: UserInterface;
}
