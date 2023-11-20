export type Token = {
  accessToken: string;
  user: {
    email: string,
    role: string,
    id: number
  }

}

export type Product = {
  id: number,
  name: string,
  price: number,
  image: string,
  type: string,
  dateEntry: string
}