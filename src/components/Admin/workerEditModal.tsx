import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { updateWorker } from "../../services/request";
import Swal from "sweetalert2";
import { Workers } from "../../types/Types";

interface WorkerEditModalProps {
  worker: Workers;
  setWorkers: React.Dispatch<React.SetStateAction<Workers[]>>;
}

const WorkerEditModal = ({ worker, setWorkers }: WorkerEditModalProps) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (worker) {
      setName(worker.name);
      setEmail(worker.email);
      setRole(worker.role);
    }
  }, [worker]);

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

        await updateWorker(dataUser, worker.id).then(() => {
          Swal.fire({
            text: "Usuario editado exitosamente",
            icon: "success",
          });
        });
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la orden", error);
    }
  };

  return (
    <div className="worker-modal-container">
      <Form onSubmit={saveWorkerEdited} className="worker-modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              className="input-modal"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="input-modal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>Puesto</Form.Label>
            <Form.Select
              className="form-select"
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
            Editar usuario
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
};

export default WorkerEditModal;
