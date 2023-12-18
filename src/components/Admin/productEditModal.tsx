import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { updateProduct } from "../../services/request";
import Swal from "sweetalert2";
import { Product } from "../../types/Types";

interface ProductEditModalProps {
  product: Product | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onHide: () => void;
}

const ProductEditModal = ({
  product,
  setProducts,
  onHide,
}: ProductEditModalProps) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [img, setImg] = useState(product ? product.image : "");
  const [type, setType] = useState(product ? product.type : "");

  const dataProducts = {
    name: name,
    price: price,
    image: img,
    type: type,
  };

  const saveProductEdited = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, dataProducts);
        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) =>
            prevProduct.id === product.id
              ? {
                  ...prevProduct,
                  name: name,
                  price: price,
                  image: img,
                  type: type,
                }
              : prevProduct
          )
        );

        if (
            dataProducts.name === "" ||
            dataProducts.price === 0 ||
            dataProducts.image === "" ||
            dataProducts.type === ""
        ) {
          Swal.fire({
            text: "Todos los campos son obligatorios",
            icon: "warning",
          });
          return;
        }
        Swal.fire({
          text: "Producto editado exitosamente",
          icon: "success",
        });
        onHide();
      }
    } catch (error) {
      console.error("Error al actualizar el estado del producto", error);
    }
  };

  return (
    <div className="worker-modal-container">
      <Form onSubmit={saveProductEdited} className="worker-modal-content">
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Editar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              placeholder="Nombre"
              className="input-modal"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
            className="input-modal"
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
           className="input-modal"
           type="text"
           placeholder="Imagen"
           value={img}
           onChange={(e) => setImg(e.target.value)}
            />
          </Form.Group>
          
          <FormGroup>
            <Form.Label></Form.Label>
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

export default ProductEditModal;
