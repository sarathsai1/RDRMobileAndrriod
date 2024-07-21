export interface User {
    id: number;
    name: string;
    email: string;
    userProfile: string;
  }
  
  export let userObj: User = {
    id: 0,
    name: '',
    email: '',
    userProfile: '',
  };