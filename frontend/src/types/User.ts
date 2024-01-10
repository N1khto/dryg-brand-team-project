
export interface TokenObtainPair{
  email: string,
  password: string,
  access: string,
  refresh: string,
}

export type User = {
  id: number,
  email: string,
  password: string,
  is_staff: boolean,
  first_name: string,
  last_name: string,
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
  nova_post_department: string | null,
  phone_number: string,
}
