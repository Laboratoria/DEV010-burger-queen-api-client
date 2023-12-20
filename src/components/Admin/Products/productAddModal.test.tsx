import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductAddModal from './productAddModal'
import { createProduct, getProducts } from '../../../services/request';

jest.mock('../../../services/request', () => ({
  createProduct: jest.fn(() => Promise.resolve()),
  getProducts: jest.fn(() => Promise.resolve({ json: jest.fn(() => []) })),
}));

describe('ProductAddModal', () => {
  it('should render and submit form', async () => {
    const setProductsMock = jest.fn();
    const onHideMock = jest.fn();

    render(<ProductAddModal setProducts={setProductsMock} onHide={onHideMock} />);

    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '10.99' } });
    fireEvent.change(screen.getByPlaceholderText('Imagen'), { target: { value: 'test.jpg' } });
    fireEvent.change(screen.getByLabelText('Select de tipos'), { target: { value: 'Breakfast' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }));

    await waitFor(() => {
      expect(onHideMock).toHaveBeenCalledTimes(1);
      expect(setProductsMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Producto creado exitosamente')).toBeInTheDocument();
    });
  });
  it('should show warning when submitting with empty fields', async () => {
    const setProductsMock = jest.fn();
    const onHideMock = jest.fn();

    render(<ProductAddModal setProducts={setProductsMock} onHide={onHideMock} />);

    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }));

    await waitFor(() => {
      expect(screen.getByText('Todos los campos son obligatorios')).toBeInTheDocument();
    });
    expect(createProduct).not.toHaveBeenCalled();
    expect(getProducts).not.toHaveBeenCalled();
  });
});