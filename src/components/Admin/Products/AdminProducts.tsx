import { useEffect, useState } from "react";
import { Product } from "../../../types/Types";
import Header from "../../Header/Header";
import EditButton from "../../../assets/editar-button.png";
import DeleteButton from "../../../assets/delete-button.png";
import { deleteProducts, getProducts } from "../../../services/request";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductAddModal from "./productAddModal";
import ProductEditModal from "./productEditModal";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product | null>(
    null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token) {
          const response = await getProducts(token);
          const ProductData: Product[] = await response.json();
          setProducts(ProductData);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, [token]);

  const showAddModals = () => {
    setShowAddModal(true);
  };

  const hideAddModal = () => {
    setShowAddModal(false);
  };

  const showEditModals = (product: Product) => {
    setSelectedProducts(product);
    setShowEditModal(true);
    setSelectedProducts(product);
  };

  const hideEditModal = () => {
    setSelectedProducts(null);
    setShowEditModal(false);
  };

  const deleteProduct = (product: Product) => {
    Swal.fire({
      title: `Eliminar el producto`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        confirmButton: "custom-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducts(product.id).then(() => {
          Swal.fire({
            text: "Producto eliminado exitosamente!",
            icon: "success",
          });
          setProducts((prevProducts) =>
            prevProducts.filter((prevProduct) => prevProduct.id !== product.id)
          );
        });
      }
    });
  };
  return (
    <section className="admin-product-list">
      <Header />
      <nav className="orderSection">
        <Link to={"/admin/workerList"}>
          <button className="allOrdersButton">Trabajadores</button>
        </Link>
      </nav>

      <main className="admin-product-list-container">
        <section className="worker-dashboard">
          <table className="worker-table">
            <caption className="worker-title">Productos</caption>
            <thead>
              <tr>
                <th id="product-th-1" className="order-th">
                  ID
                </th>
                <th id="product-th-2" className="order-th">
                  Producto
                </th>
                <th id="product-th-3" className="order-th">
                  Precio
                </th>
                <th id="product-th-4" className="order-th">
                  Imagen
                </th>
                <th id="product-th-5" className="order-th">
                  Tipo
                </th>
                <th id="product-th-6" className="order-th">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={`tr-${product.id}`}>
                  <td className="tdProducts">{product.id}</td>
                  <td className="tdProducts">{product.name}</td>
                  <td className="tdProducts">{product.price}</td>
                  <td className="tdProducts">
                    <img src={product.image} className="imgButton" />
                  </td>
                  <td className="tdProducts">
                    {product.type === "Lunch" && "Almuerzo"}
                    {product.type === "Breakfast" && "Desayuno"}
                  </td>
                  <td className="tdProducts">
                    <section className="tableButtons">
                      <button
                        className="worker-edit"
                        onClick={() => showEditModals(product)}
                        data-testid="product-edit-button"
                      >
                        {" "}
                        <img
                          src={EditButton}
                          alt="Editar"
                          className="imgButton"
                        />
                      </button>
                      <button
                        className="worker-delete"
                        onClick={() => deleteProduct(product)}
                        data-testid="product-delete-button"
                      >
                        <img
                          src={DeleteButton}
                          alt="Borrar"
                          className="imgButton"
                        />
                      </button>
                    </section>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="add-button-section">
          <button
            className="admin-products-add"
            data-testid="product-add-button"
            onClick={showAddModals}
          >
            Agregar producto
          </button>
        </section>
      </main>
      <Modal
        dialogClassName="custom-modal"
        show={showAddModal}
        onHide={hideAddModal}
        variant="success"
      >
        <ProductAddModal setProducts={setProducts} onHide={hideAddModal} />
      </Modal>
      <Modal
        dialogClassName="custom-modal"
        show={showEditModal}
        onHide={hideEditModal}
        variant="success"
      >
        <ProductEditModal
          product={selectedProducts}
          setProducts={setProducts}
          onHide={hideEditModal}
        />
      </Modal>
    </section>
  );
};

export default AdminProducts;
