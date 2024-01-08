export type Login = {
  email : string,
  password: string,
}

export type AccountDetails = {
  id: number,
  email: string,
  is_staff: boolean,
  first_name: string,
  last_name: string,
}

export type Address = {
  region: string,
  city: string,
  nova_post_department: string | null,
  phone_number: string,
}
