import ChefOrders from "./ChefOrders";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { updateOrder } from "../../services/request";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../services/request", () => ({
  getOrders: jest.fn(() =>
    Promise.resolve({
      ok: "ok",
      json: () =>
        Promise.resolve([
          {
            client: "Camila",
            table: "Mesa 4",
            products: [
              {
                id: 2,
                name: "Café con Leche",
                price: 3200,
                qty: 1,
                pricetotal: 3200,
                image:
                  "https://raw.githubusercontent.com/ginapedraza/burger-queen-api-mock/main/resources/images/producto-cafe-con-leche.png",
                type: "Breakfast",
                dateEntry: "2022-03-05 15:14:10",
              },
            ],
            dateEntry: "1:37 PM",
            id: 29,
            status: "Pendiente",
          },
        ]),
    })
  ),
  updateOrder: jest.fn(() => Promise.resolve()),
}));
describe("ChefOrders component", () => {
  beforeAll(() => {
    localStorage.setItem("token", "token");
  });
  it("should show Finalizar Button", async () => {
    render(<ChefOrders />);
    await waitFor(() => {
      expect(screen.getByText("Finalizar")).toBeInTheDocument();
    });
  });
  it("should change the status to Por entregar and disables the button", async () => {
    render(<ChefOrders />);
    await waitFor(() => {
      expect(screen.getByText("Finalizar")).toBeInTheDocument();
    });
    const button = screen.getByRole("button", { name: "Finalizar" });
    screen.debug(button);
    fireEvent.click(button);
    await waitFor(() => expect(updateOrder).toHaveBeenCalledTimes(1));
  });
});
