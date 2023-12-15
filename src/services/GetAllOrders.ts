import { getOrders } from "./request";
import { Orders } from "../types/Types";

const getAllOrders = (token: string | ""): Promise<Orders[]> => {
  return new Promise((resolve, reject) => {
    if (typeof token === "string") {
      getOrders(token)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          reject("Error al obtener las órdenes");
        });
    }
  });
};

export default getAllOrders;
