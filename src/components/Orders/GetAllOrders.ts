//import { useState } from "react";
import { getOrders } from "../../services/request";
import { Orders } from "../../types/Types";


 //Definimos una función para obtener las órdenes
 const getAllOrders = (token: string | ""): Promise<Orders[]> => {
    return new Promise((resolve, reject) => {
      if (typeof token === 'string') {
        // Llamamos a la función que hace la petición GET de las órdenes
        getOrders(token)
          .then((response) => {
            console.log('Response:', response);
            if (response.ok) {
              return response.json();
            } else {
              reject("Error al obtener las órdenes");
            }
          })
          .then((data) => {
            // Devolvemos las órdenes
            resolve(data);
          })
          .catch((error) => {
            console.error("Ocurrió un error al tratar de obtener las órdenes", error);
            reject("Error al obtener las órdenes");
          });
      } else {
        console.error("No se encontró el token");
        reject("Token no válido");
      }
    });
  };
  export default getAllOrders;