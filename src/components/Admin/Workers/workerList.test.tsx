import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkerList from "./WorkerList";
import { deleteUser, getWorkers } from "../../../services/request";
import { MemoryRouter } from "react-router-dom";
//import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

// jest.mock("../workerAddModal", () => {

// })

// jest.mock("../workerEditModal", () => {

// })

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/request", () => ({
  getWorkers: jest.fn(() =>
    Promise.resolve({
      ok: "ok",
      json: () =>
        Promise.resolve([
          {
            name: "Jose Gonzalez",
            email: "waiter@systers.xyz",
            role: "Mesero",
            id: 2,
          },
        ]),
    })
  ),
  deleteUser: jest.fn(() => Promise.resolve()),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

describe("WorkerList Component", () => {
  beforeAll(() => {
    localStorage.setItem("token", "token");
  });
  it("renders the component and displays product information", async () => {
    render(
      <MemoryRouter>
        <WorkerList />
      </MemoryRouter>
    );

    // Espera a que la solicitud de productos se complete
    await waitFor(() => {
      expect(getWorkers).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      // Asegúrate de que los productos se rendericen correctamente
      expect(screen.getByText("Jose Gonzalez")).toBeInTheDocument();
      expect(screen.getByText("waiter@systers.xyz")).toBeInTheDocument();
      expect(screen.getByText("Mesero")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("displays the edit worker modal when the edit button is clicked", async () => {
    render(
      <MemoryRouter>
        <WorkerList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getWorkers).toHaveBeenCalledTimes(1);
    });

    // Esperar a que el botón esté presente antes de hacer clic
    const editButton = await screen.findByTestId("worker-edit-button");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Editar Usuarios")).toBeInTheDocument();
    });
  });

  it("displays the add worker modal when the add button is clicked", async () => {
    render(
      <MemoryRouter>
        <WorkerList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getWorkers).toHaveBeenCalledTimes(1);
    });

    // Esperar a que el botón esté presente antes de hacer clic
    const addButton = await screen.findByTestId("worker-add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Crear Usuario")).toBeInTheDocument();
    });
  });
  it("deletes the worker when the delete button is clicked", async () => {
    render(
      <MemoryRouter>
        <WorkerList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getWorkers).toHaveBeenCalledTimes(1);
    });

    // Esperar a que el botón de eliminar esté presente antes de hacer clic
    const deleteButton = await screen.findByTestId("worker-delete-button");

    // Envuelve las operaciones que actualizan el estado en act
    act(() => {
      fireEvent.click(deleteButton);
    });

    //     // Esperar un breve momento para dar tiempo a que SweetAlert se muestre
    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     // Esperar a que SweetAlert se muestre
    //     await waitFor(() => {
    //       expect(screen.getByText('Eliminar el producto')).toBeInTheDocument();
    //     });

    //     act(() => {
    //     fireEvent.click(screen.getByText('Sí'));
    // });
    //     // Verificar que el producto se haya eliminado (asegúrate de manejar la asincronía aquí si es necesario)
    //     // Puedes envolver esto en act también si es necesario
    //     await waitFor(() => {
    //       expect(Swal.fire).toHaveBeenCalledWith({ text: 'Producto eliminado exitosamente!', icon: 'success' });
    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalled();
    });
  });
});
