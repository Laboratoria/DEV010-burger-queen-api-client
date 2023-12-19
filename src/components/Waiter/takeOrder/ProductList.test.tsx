import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";

jest.mock("../../services/request", () => ({
  getProducts: jest.fn(),
}));

describe("ProductList component", () => {
  it("renders product list", async () => {
    const mockOnAddProduct = jest.fn();
    const mockOnSubtractProduct = jest.fn();
    render(
      <ProductList
        onAddProduct={mockOnAddProduct}
        onSubtractProduct={mockOnSubtractProduct}
      />
    );
    expect(
      screen.getByRole("button", { name: "Desayuno" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Almuerzo/ cena" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Almuerzo/ cena" }));
    fireEvent.click(screen.getByRole("button", { name: "Desayuno" }));
  });
});
