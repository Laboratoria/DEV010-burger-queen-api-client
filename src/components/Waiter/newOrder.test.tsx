import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewOrder from './NewOrder';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createOrder } from '../../services/request'; 
//import ProductList from './ProductList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../services/request', () => ({
  createOrder: jest.fn(() => Promise.resolve()),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('NewOrder component', () => {
  it('should show Enviar pedido button ', () => {
    render(<NewOrder />);
    expect(screen.getByText('Enviar pedido')).toBeInTheDocument();
  });

  it('handles logged session', () => {
    const removeItemMock = jest.fn();
    window.localStorage.removeItem = removeItemMock;

    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<NewOrder />);

    fireEvent.click(screen.getByTestId('logOut-button'));

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it.only('guarda el pedido cuando se hace clic en el botón Enviar pedido', async () => {
    render(<NewOrder />);

    // Simula las entradas del usuario
    fireEvent.change(screen.getByTestId('table'), { target: { value: 'Mesa 1' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: 'Maria' } });

    
   // fireEvent.click(screen.getByTestId('addProductButton')); // No consigue esto
  
    //expect(screen.getByTestId('products-table')).toBeInTheDocument();


//Como agregamos productos antes de hacer click al boton --------------PREGUNTA

    // Haz clic en el botón Enviar pedido
    fireEvent.click(screen.getByText('Enviar pedido'));

    // Espera a que se guarde el pedido
    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith({
        client: 'Maria',
        table: 'Mesa 1',
        products: expect.any(Array), 
        dateEntry: expect.any(String),
      });
    });

    // Verifica si se muestra el mensaje de éxito
    expect(Swal.fire).toHaveBeenCalledWith({ text: 'Orden creada exitosamente', icon: 'success' });
  });

});