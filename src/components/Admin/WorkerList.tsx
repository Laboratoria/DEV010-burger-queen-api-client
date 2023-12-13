import { useEffect, useState } from "react";
import { Workers } from "../../types/Types";
import { getWorkers } from "../../services/request";
import Header from "../Header/Header";
import EditButton from "../../assets/editar-button.png";
import DeleteButton from "../../assets/delete-button.png";
import AddWorker from "../../assets/add-worker-button.png";

const WorkerList = () => {
  const token = localStorage.getItem("token");
  const [workers, setWorkers] = useState<Workers[]>([]);

  useEffect(() => {
    // cuando el valor de token cambia, se llama a fetchWorkers
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
                      onClick={() => {
                      }}
                    >
                      <img src={EditButton} alt="Editar trabajador" className="imgButton"/>
                    </button>
                    <button
                      className="worker-delete"
                      onClick={() => {
                      }}
                    >
                      <img src={DeleteButton} alt="Borrar trabajador" className="imgButton" />
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
            className="worker-add"
            onClick={() => {
            }}
          >
            <img src={AddWorker} alt="Agregar trabajador" className="imgButton"/>
            Agregar trabajador
          </button>
        </section>
      </section>
    </section>
  );
};

export default WorkerList;
