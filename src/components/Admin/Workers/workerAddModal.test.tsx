import { render, fireEvent, screen } from "@testing-library/react";
import WorkerAddModal from "./WorkerAddModal";
import "@testing-library/jest-dom";

jest.mock("../../../services/request", () => ({
    createWorker: jest.fn(),
    getWorkers: jest.fn(),
  }));

describe("WorkerAddModal", () => {
  it("renders without crashing", () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    render(
      <WorkerAddModal setWorkers={setWorkersMock} onHide={onHideMock} />
    );

    // Add your assertions here
    expect(screen.getByText("Crear Usuario")).toBeInTheDocument();
  });

  

  it("displays a warning for empty fields", async () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    render(
      <WorkerAddModal setWorkers={setWorkersMock} onHide={onHideMock} />
    );

    // Submit the form without filling in any fields
    fireEvent.click(screen.getByText("Guardar cambios"));

    // Add your assertions here
    expect(onHideMock).not.toHaveBeenCalled();
    expect(setWorkersMock).not.toHaveBeenCalled();
    expect(
      screen.getByText("Todos los campos son obligatorios")
    ).toBeInTheDocument();
  });
  it("renders without crashing", () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    render(<WorkerAddModal setWorkers={setWorkersMock} onHide={onHideMock} />);

    // Add your assertions here
    expect(screen.getByText("Crear Usuario")).toBeInTheDocument();
  });

  it("displays a warning for empty fields", async () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    render(<WorkerAddModal setWorkers={setWorkersMock} onHide={onHideMock} />);

    // Submit the form without filling in any fields
    fireEvent.click(screen.getByText("Guardar cambios"));

    // Add your assertions here
    expect(onHideMock).not.toHaveBeenCalled();
    expect(setWorkersMock).not.toHaveBeenCalled();
    expect(
      screen.getByText("Todos los campos son obligatorios")
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    render(<WorkerAddModal setWorkers={setWorkersMock} onHide={onHideMock} />);

    // Fill in the form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByText("Rol"), {
      target: { value: "Chef" },
    });

    // Submit the form
    fireEvent.submit(screen.getByText("Guardar cambios"));

    
  });

});
