import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { updateWorker } from "../../services/request";
import Swal from "sweetalert2";
import { Workers } from "../../types/Types";

interface WorkerEditModalProps {
  worker: Workers | null;
  setWorkers: React.Dispatch<React.SetStateAction<Workers[]>>;
  onHide: () => void;

}

const WorkerEditModal = ({ worker, setWorkers, onHide }: WorkerEditModalProps) => {
  const [name, setName] = useState(worker ? worker.name : "");
  const [role, setRole] = useState(worker ? worker.role : "");
  const [email, setEmail] = useState(worker ? worker.email : "");

  const dataUser = {
    password: "123456", // Asegúrate de manejar esto de manera segura
    name: name,
    email: email,
    role: role,
  };

  const saveWorkerEdited = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (worker) {
        await updateWorker(dataUser, worker.id);
        setWorkers((prevWorkers) =>
          prevWorkers.map((prevWorker) =>
            prevWorker.id === worker.id
              ? {
                  ...prevWorker,
                  name: name,
                  email: email,
                  role: role,
                }
              : prevWorker
          )
        );
     
    
        if (
          dataUser.name === "" ||
          dataUser.email === "" ||
          dataUser.role === ""
        ) {
          Swal.fire({
            text: "Todos los campos son obligatorios",
            icon: "warning",
          });
          return;
        }
        Swal.fire({
          text: "Usuario editado exitosamente",
          icon: "success",
        });
        onHide();

      }
     
    } catch (error) {
      console.error("Error al actualizar el estado del trabajador", error);
    }
  };


  return (
    <div className="worker-modal-container">
      <Form onSubmit={saveWorkerEdited} className="worker-modal-content">
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
            placeholder="Email"
              className="input-modal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label></Form.Label>
            <Form.Select
              className="form-select"
              aria-label="Select de tipos"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Tipo </option>
              <option value="Chef">Chef</option>
              <option value="Admin">Admin</option>
              <option value="Mesero">Mesero</option>
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

export default WorkerEditModal;
