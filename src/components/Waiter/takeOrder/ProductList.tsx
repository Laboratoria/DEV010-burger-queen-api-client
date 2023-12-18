import { useEffect, useState } from "react";
import { Product } from "../../../types/Types";
import { getProducts } from "../../../services/request";
import iconoMenos from "../../../assets/icono-menos.png";
import iconoAgregar from "../../../assets/icono-mas.png";

//El componente ProductList recibe las props que manejan la adición y sustracción de los productos
const ProductList = ({
  onAddProduct,
  onSubtractProduct,
}: {
  onAddProduct: (product: Product) => void;
  onSubtractProduct: (product: Product, remove?: boolean) => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [menuSelection, setMenuSelection] = useState("Breakfast");
  const token = localStorage.getItem("token");

  //Función para manejar la selección del menú, actualiza el estado.
  const handleMenuSelection = (menu: string) => {
    setMenuSelection(menu);
  };

  useEffect(() => {
    //Definimos la función para obtener los productos de la API
    const fetchData = async () => {
      if (token !== null) {
        const response = await getProducts(token);
        if (response.ok) {
          //Recibimos la data de tipo Product y la convertimos en formato json
          const data: Product[] = await response.json();
          //Actualiza el estado de los productos
          setProducts(data);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      }
    };
    //Llamamos a la función
    fetchData();
    //El useEffect recibe 2 parámetros, ejecuta la función cada vez que cambia el token
  }, [token]);

  return (
    <main>
      <section className="buttonMenuSection">
        <button
          className={
            menuSelection === "Breakfast"
              ? "menuButton selectedButton"
              : "menuButton"
          }
          onClick={() => handleMenuSelection("Breakfast")}
        >
          Desayuno
        </button>
        <button
          className={
            menuSelection === "Lunch"
              ? "menuButton selectedButton"
              : "menuButton"
          }
          onClick={() => handleMenuSelection("Lunch")}
        >
          Almuerzo/ cena
        </button>
      </section>
      <section className="foodSection">
        <article className="cards">
          {products
            .filter((product) =>
              menuSelection === "Breakfast"
                ? product.type === "Breakfast"
                : product.type === "Lunch"
            )
            //Iteramos el arreglo con el método map para que nos traiga las propiedades que nos interesan de cada producto
            .map((product: Product) => (
              //Cada producto va a tener su contenedor con su key única que será el id del producto, para identificar cada elemento de la lista
              <section className="product-box" key={product.id}>
                <img className="product-img" src={`${product.image}`} />
                <article className="product-text">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">${product.price}</p>
                  {/*Acá agregamos los botones para añadir o sustraer cada producto */}
                  <section className="addProductButtons">
                    <button
                      className="iconsButton"
                      id="lessButton"
                      data-testid="lessProductButton"
                      onClick={() => onSubtractProduct(product, true)}
                    >
                      <img className="icons" src={iconoMenos} />
                    </button>
                    <button
                      className="iconsButton"
                      id="moreButton"
                      data-testid="addProductButton"
                      onClick={() => onAddProduct(product)}
                    >
                      <img className="icons" src={iconoAgregar} />
                    </button>
                  </section>
                </article>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
};

export default ProductList;
