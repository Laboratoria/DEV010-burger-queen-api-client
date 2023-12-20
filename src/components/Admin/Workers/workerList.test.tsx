import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkerList from "./WorkerList";
import { deleteUser, getWorkers } from "../../../services/request";
import { MemoryRouter } from "react-router-dom";

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

// Mock para WorkerAddModal.tsx
jest.mock("./WorkerAddModal", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="worker-add-modal">
      {/* Contenido del modal */}
    </div>
  )),
}));

// Mock para WorkerEditModal.tsx
jest.mock("./WorkerEditModal", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="worker-edit-modal">
      {/* Contenido del modal */}
    </div>
  )),
}));

describe("WorkerList Component", () => {
  beforeAll(() => {
    localStorage.setItem("token", "token");
  });

  it("renders the component and displays worker information", async () => {
    render(
      <MemoryRouter>
        <WorkerList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getWorkers).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
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

    const editButton = await screen.findByTestId("worker-edit-button");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByTestId("worker-edit-modal")).toBeInTheDocument();
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

    const addButton = await screen.findByTestId("worker-add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId("worker-add-modal")).toBeInTheDocument();
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

    const deleteButton = await screen.findByTestId("worker-delete-button");

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalled();
    });
  });
});
