import { Token } from "../types/Types";

const url_ = "https://bq-api-mock-e6uc.onrender.com";

export const auth = async (email: string, password: string): Promise<Token> => {
  const response = await fetch(`${url_}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data: Token = await response.json();
  return data;
};

export const getProducts = (token: string) => {
  return fetch(`${url_}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrder = async (order: object) => {
  console.log({ order });
  const orderWithStatus = { ...order, status: "Pendiente" };
  const response = await fetch(`${url_}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderWithStatus),
  });
  if (response.status === 201) {
    return await response.json();
  } else {
    throw new Error("No se pudo crear el producto");
  }
};

export const getOrders = (token: string) => {
  return fetch(`${url_}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrder = async (
  orderId: number,
  newStatus: string,
  dateFinal: string
) => {
  try {
    const response = await fetch(`${url_}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
        dateFinal: dateFinal,
      }),
    });

    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Token inválido, inicie sesión nuevamente");
    } else if (response.status === 404) {
      throw new Error("Orden no encontrada");
    } else {
      throw new Error("Error al actualizar la orden");
    }
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    throw error;
  }
};

export const updateFinalizedOrder = async (
  orderId: number,
  newStatus: string
) => {
  try {
    const response = await fetch(`${url_}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 401) {
      throw new Error("Token inválido, inicie sesión nuevamente");
    } else if (response.status === 404) {
      throw new Error("Orden no encontrada");
    } else {
      throw new Error("Error al actualizar la orden");
    }
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    throw error;
  }
};

export const getWorkers = (token: string) => {
  return fetch(`${url_}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Authorization: `Bearer ${token}`,
    },
  });
};
