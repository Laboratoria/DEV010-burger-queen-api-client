import { useState, FormEvent } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { createProduct, getProducts } from "../../services/request";
import Swal from "sweetalert2";
import { Product } from "../../types/Types";

interface ProductAddModalProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onHide: () => void;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({
  setProducts,
    onHide,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const dataProducts = {
  name: name,
  price: price,
  image: img,
  type: type,
  };

  const saveProducts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        dataProducts.name === "" ||
        dataProducts.price === "" ||
        dataProducts.image === "" ||
        dataProducts.type === ""
      ) {
        Swal.fire({
          text: "Todos los campos son obligatorios",
          icon: "warning",
        });
        return;
      }

      await createProduct(dataProducts);

      onHide();

      const response = await getProducts(localStorage.getItem("token") || "");
      const productData: Product[] = await response.json();
      setProducts(productData);

      Swal.fire({ text: "Producto creado exitosamente", icon: "success" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire({ text: "Error al crear el producto", icon: "error" });
    }
  };

  return (
    <div className="worker-modal-container">
      <Form onSubmit={saveProducts} className="worker-modal-content">
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title className="modal-title">Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group">
            <Form.Control
              className="input-modal"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              className="input-modal"
              type="text"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              className="input-modal"
              type="text"
              placeholder="Imagen"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </Form.Group>
          <FormGroup className="form-group">
            <Form.Select
              className="form-select"
              aria-label="Select de tipos"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Tipo</option>
              <option value="Desayuno">Desayuno</option>
              <option value="Almuerzo">Almuerzo</option>
            </Form.Select>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
};

export default ProductAddModal;
