import { useEffect, useState } from "react";
import { Workers } from "../../types/Types";
import Header from "../Header/Header";
import EditButton from "../../assets/editar-button.png";
import DeleteButton from "../../assets/delete-button.png";
import AddWorker from "../../assets/add-worker-button.png";
import { deleteUser, getWorkers } from "../../services/request";
import { Modal } from "react-bootstrap";
import WorkerAddModal from "./WorkerAddModal";
import Swal from "sweetalert2";
import WorkerEditModal from "./workerEditModal";

const WorkerList = () => {
  const token = localStorage.getItem("token");
  const [workers, setWorkers] = useState<Workers[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Workers | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        if (token) {
          const response = await getWorkers(token);
          const workerData: Workers[] = await response.json();
          setWorkers(workerData);
        }
      } catch (error) {
        console.error("Error al obtener la lista de trabajadores:", error);
      }
    };
    fetchWorkers();
  }, [token]);

  const showAddModals = () => {
    setShowAddModal(true);
  };

  const hideAddModal = () => {
    setShowAddModal(false);
  };

  const showEditModals = (worker: Workers) => {
    setSelectedWorker(worker);
    setShowEditModal(true);
  };

  const hideEditModal = () => {
    setSelectedWorker(null);
    setShowEditModal(false);
  };

  const deleteWorker = (worker: Workers) => {
    Swal.fire({
      title: `Eliminar al usuario`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        confirmButton: "custom-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(worker.id).then(() => {
          Swal.fire({
            text: "Usuario eliminado exitosamente!",
            icon: "success",
          });
          setWorkers((prevWorkers) =>
            prevWorkers.filter((prevWorker) => prevWorker.id !== worker.id)
          );
        });
      }
    });
  };

  return (
    <section className="worker-list">
      <Header />
      <section className="worker-list-container">
        <section className="worker-dashboard">
          <table className="worker-table">
            <caption className="worker-title">Pedidos</caption>
            <thead>
              <tr>
                <th id="worker-th-1" className="order-th">
                  ID
                </th>
                <th id="worker-th-2" className="order-th">
                  Nombre
                </th>
                <th id="worker-th-3" className="order-th">
                  Email
                </th>
                <th id="worker-th-4" className="order-th">
                  Rol
                </th>
                <th id="worker-th-5" className="order-th">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker: Workers) => (
                <tr key={`tr-${worker.id}`}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.email}</td>
                  <td>{worker.role}</td>
                  <td>
                    <section className="tableButtons">
                    <button
          className="worker-edit"
          onClick={() => showEditModals(worker)}
        >                        <img
                          src={EditButton}
                          alt="Editar trabajador"
                          className="imgButton"
                        />
                      </button>
                      <button
                        className="worker-delete"
                        onClick={() => deleteWorker(worker)}
                      >
                        <img
                          src={DeleteButton}
                          alt="Borrar trabajador"
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
          <button className="worker-add" onClick={showAddModals}>
            <img
              src={AddWorker}
              alt="Agregar trabajador"
              className="imgButton"
            />
            Agregar trabajador
          </button>
        </section>
      </section>
      <Modal
        dialogClassName="custom-modal"
        show={showAddModal}
        onHide={hideAddModal}
        variant="success"
      >
        <WorkerAddModal setWorkers={setWorkers} onHide={hideAddModal} />
      </Modal>
      <Modal
        dialogClassName="custom-modal"
        show={showEditModal}
        onHide={hideEditModal}
        variant="success"
      >
        <WorkerEditModal worker={selectedWorker} setWorkers={setWorkers} />
      </Modal>
    </section>
  );
};

export default WorkerList;
