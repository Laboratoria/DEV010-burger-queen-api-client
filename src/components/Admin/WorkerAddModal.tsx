import { useState, FormEvent } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { createWorker, getWorkers } from "../../services/request";
import Swal from "sweetalert2";
import { Workers } from "../../types/Types";

interface WorkerAddModalProps {
  setWorkers: React.Dispatch<React.SetStateAction<Workers[]>>;
  onHide: () => void;
}

const WorkerAddModal: React.FC<WorkerAddModalProps> = ({ setWorkers, onHide }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const dataUser = {
    password: "123456",
    name: name,
    email: email,
    role: role,
  };

  const saveWorker = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (dataUser.name === "" || dataUser.email === "" || dataUser.role === "") {
        Swal.fire({ text: "Todos los campos son obligatorios", icon: "warning" });
        return;
      }

      await createWorker(dataUser);

      onHide();

      const response = await getWorkers(localStorage.getItem("token") || "");
      const workerData: Workers[] = await response.json();
      setWorkers(workerData);

      Swal.fire({ text: "Usuario creado exitosamente", icon: "success" });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      Swal.fire({ text: "Error al crear el usuario", icon: "error" });
    }
  };

  return (
    <div className="bg-dark text-white">
      <Form onSubmit={saveWorker}>
        <Modal.Header closeButton>
          <Modal.Title>Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>Puesto</Form.Label>
            <Form.Select
              aria-label="Select de tipos"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Tipo </option>
              <option value="chef">Chef</option>
              <option value="administrador">Administrador</option>
              <option value="mesero">Mesero</option>
            </Form.Select>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Crear usuario
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
};

export default WorkerAddModal;