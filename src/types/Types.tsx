export type Token = {
  accessToken: string;
  user: {
    email: string,
    role: string,
    id: number
  }
}

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
  qty: number; // Add this property
  pricetotal: number;
};

export type Orders ={
  client: string;
  table:  string;
  products: 
    {
      id: number;
      name:  string;
      price: number;
      qty: number;
      pricetotal: number;
      image:  string;
      type:  string;
      dateEntry:  string;
    }
  
  dateEntry:  string;
  id: number;
  status:  string;
}