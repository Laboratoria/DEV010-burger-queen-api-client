import { Token } from "../types/Types";



export const auth = async (email: string, password: string): Promise<Token> => {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  const data: Token = await response.json();
  return data;

};

export const getProducts = (token: string) => {
  return fetch('http://localhost:8080/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  })
}

export const createOrder = async (order: object) => {
  console.log({ order })
  const response = await fetch('http://localhost:8080/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (response.status === 201) {
    return await response.json();
  } else {
    throw new Error('No se pudo crear el producto');
  }
};