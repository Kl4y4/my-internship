export type Activity = {
  type: string,
  name: string,
  date: string
}

export type User = {
  email: string,
  activity: Array<Activity>
}

export type Product = {
  id: number,
  productName: string,
  price: number
}

type ApiClient = {
  users: Array<User>,
  currentUser?: User,
  [key : string]: any
}
