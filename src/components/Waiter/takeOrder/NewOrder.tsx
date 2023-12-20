import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import { useState } from "react";
import { createOrder } from "../../../services/request";
import { Product } from "../../../types/Types";
import Swal from "sweetalert2";
import Header from "../../Header/Header";

const NewOrder = () => {
  //Estado de los productos seleccionados
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  //Estado del input del nombre del cliente
  const [clientName, setClientName] = useState("");
  //Estado del select de mesa
  const [table, setTable] = useState("");

  const handleSubtractProduct = (product: Product, remove?: boolean) => {
    //Actualiza el estado de selectedProducts y como argumento establece el estado anterior
    setSelectedProducts((prevSelectedProducts) => {
      //Usamoa el método findIndex para encontrar el índice del primer elemento cuyo id sea igual al del producto
      const existingProductIndex = prevSelectedProducts.findIndex(
        (p) => p.id === product.id
      );
      //Si encuentra el producto, se hace una copia del array prevSelectedProducts para no alterar el estado anterior
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevSelectedProducts];
        //Se obtiene una referencia al producto existente en el array updatedProducts utilizando el índice obtenido anteriormente.
        const existingProduct = updatedProducts[existingProductIndex];
        if (remove) {
          if (existingProduct.qty <= 1) {
            updatedProducts.splice(existingProductIndex, 1);
          } else {
            //Si no, se actualiza el producto con la cantidad y el precio total
            updatedProducts[existingProductIndex] = {
              ...existingProduct,
              qty: existingProduct.qty - 1,
              pricetotal: (existingProduct.qty - 1) * existingProduct.price,
            };
          }
        }
        // Devuelve el nuevo array actualizado
        return updatedProducts;
      }
      // Devuelve el estado actual sin cambios
      return prevSelectedProducts;
    });
  };

  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProductIndex = prevSelectedProducts.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevSelectedProducts];
        //Obtenemos una referencia del producto con su índice en la nueva copia
        const existingProduct = updatedProducts[existingProductIndex];
        // Aumentar la cantidad
        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
          pricetotal: (existingProduct.qty + 1) * existingProduct.price,
        };
        return updatedProducts;
      } else {
        return [
          ...prevSelectedProducts,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            pricetotal: product.price,
            image: product.image,
            type: product.type,
            dateEntry: product.dateEntry,
          },
        ];
      }
    });
  };

  const date = new Date();
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const dataOrder = {
    client: clientName,
    table: table,
    products: selectedProducts,
    dateEntry: formattedTime,
  };

  const saveOrder = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (dataOrder.client == "") {
      Swal.fire({ text: "Ingrese nombre de cliente", icon: "warning" });
      return;
    }
    if (dataOrder.table == "") {
      Swal.fire({ text: "Seleccione una mesa", icon: "warning" });
      return;
    }
    if (dataOrder.products.length == 0) {
      Swal.fire({ text: "Pedido vacío", icon: "warning" });
      return;
    }
    //Acá llamamos a la función que hace la petición tipo Post a la API para crear la orden
    createOrder(dataOrder).then(() => {
      Swal.fire({ text: "Orden creada exitosamente", icon: "success" });
    });
    //Limpiamos los campos
    setSelectedProducts([]);
    setClientName("");
    setTable("");
  };
  return (
    <section className="newOrder-Section">
      <Header />
      <nav className="orderSection">
        <Link to={"/waiter/OrderList"}>
          <button className="allOrdersButton"> Ver todos los pedidos </button>
        </Link>
      </nav>
      <main className="dashboardSection">
        <section className="menuSection">
          <article className="selectSection">
            <select
              data-testid="table"
              className="tableSelect"
              value={table}
              onChange={(e) => setTable(e.target.value)}
            >
              <option value="">Mesa</option>
              <option value="Mesa 1">Mesa 1</option>
              <option value="Mesa 2">Mesa 2</option>
              <option value="Mesa 3">Mesa 3</option>
              <option value="Mesa 4">Mesa 4</option>
              <option value="Mesa 5">Mesa 5</option>
              <option value="Mesa 6">Mesa 6</option>
              <option value="Mesa 7">Mesa 7</option>
              <option value="Mesa 8">Mesa 8</option>
              <option value="Mesa 9">Mesa 9</option>
              <option value="Mesa 10">Mesa 10</option>
            </select>
            <input
              type="text"
              className="name"
              placeholder="Nombre del cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </article>
          <ProductList
            onAddProduct={handleAddProduct}
            onSubtractProduct={handleSubtractProduct}
          />
        </section>
        <section className="orderInfoSection">
          <article className="orderInfo-section">
            <h3> Pedido </h3>
            <table className="table-order-waiter">
              <thead>
                <tr>
                  <th> Producto </th>
                  <th> Cant </th>
                  <th> Valor </th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id} data-testid="products-table">
                    <td data-testid="product-name" className="table-td">{product.name}</td>
                    <td data-testid="product-qty" className="table-td">{product.qty}</td>
                    <td data-testid="product-price" className="table-td">$ {product.pricetotal}</td>
                  </tr>
                ))}
                {dataOrder.products.length > 0 && (
                  <tr id="total">
                    <td className="table-td">Total</td>
                    <td className="table-td">
                      {" "}
                      {selectedProducts.length === 0
                        ? "0"
                        : selectedProducts.reduce(
                            (prev, next) => prev + next.qty,
                            0
                          )}{" "}
                    </td>
                    <td className="table-td">
                      ${" "}
                      {selectedProducts.length === 0
                        ? "0"
                        : selectedProducts.reduce(
                            (prev, next) => prev + next.pricetotal,
                            0
                          )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>
          <section className="orderButton-section">
            <button className="sendOrderButton" onClick={saveOrder}>
              Enviar pedido
            </button>
          </section>
        </section>
      </main>
    </section>
  );
};

export default NewOrder;
