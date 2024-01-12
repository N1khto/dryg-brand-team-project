
export interface Login {
  email: string,
  password: string,
}

export interface TokenObtainPair {
  access: string,
  refresh: string,
}

export interface RefreshToken {
  refresh: string,
}


export type User = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  region: string,
  city: string,
  nova_post_department: number,
  phone_number: string,
}

export interface UserRegister {
  first_name: string,
  last_name: string,
  email : string,
  password: string,
}

export type Address = {
  region: string,
  city: string,
  nova_post_department: number,
  phone_number: string,
}
