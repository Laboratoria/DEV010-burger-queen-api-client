import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminProducts from './AdminProducts';
import { deleteProducts, getProducts } from '../../../services/request';
import { MemoryRouter } from 'react-router-dom';
//import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

jest.mock("./productAddModal", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="product-add-modal" />),
}));

jest.mock("./productEditModal", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="product-edit-modal" />),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));
  
  jest.mock("../../../services/request", () => ({
    getProducts: jest.fn(() =>
      Promise.resolve({
        ok: "ok",
        json: () =>
          Promise.resolve([
            {
              id: 2,
              name: 'Café con Leche',
              price: 3200,
              image: "https://raw.githubusercontent.com/ginapedraza/burger-queen-api-mock/main/resources/images/producto-cafe-con-leche.png",
              type: 'Breakfast',
            },
          ]),
      })
    ),
    deleteProducts: jest.fn(() => Promise.resolve()),
  }));
  
  jest.mock("sweetalert2", () => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
  }));


describe('AdminProducts Component', () => {
    beforeAll(() => {
        localStorage.setItem("token", "token");
      });
  it('renders the component and displays product information', async () => {
    render(<MemoryRouter><AdminProducts /></MemoryRouter>);

    // Espera a que la solicitud de productos se complete
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
    // Asegúrate de que los productos se rendericen correctamente
    expect(screen.getByText('Café con Leche')).toBeInTheDocument();
    expect(screen.getByText('3200')).toBeInTheDocument();
   
});
  });

  it('displays the add product modal when the add button is clicked', async () => {
    render(<MemoryRouter><AdminProducts /></MemoryRouter>);
  
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  
    // Esperar a que el botón esté presente antes de hacer clic
    const addButton = await screen.findByTestId('product-add-button');
    fireEvent.click(addButton);
  
    await waitFor(() => {
      expect(screen.getByTestId('product-add-modal')).toBeInTheDocument();
    });
  });
  
  it('displays the edit product modal when the edit button is clicked', async () => {
    render(<MemoryRouter><AdminProducts /></MemoryRouter>);
  
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  
    // Esperar a que el botón esté presente antes de hacer clic
    const editButton = await screen.findByTestId('product-edit-button');
    fireEvent.click(editButton);
  
    await waitFor(() => {
      expect(screen.getByTestId('product-edit-modal')).toBeInTheDocument();
    });
  });
  it('deletes the product when the delete button is clicked', async () => {
    render(<MemoryRouter><AdminProducts /></MemoryRouter>);
  
    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  
    // Esperar a que el botón de eliminar esté presente antes de hacer clic
    const deleteButton = await screen.findByTestId('product-delete-button');
    
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
    expect(deleteProducts).toHaveBeenCalled();
});
});


});