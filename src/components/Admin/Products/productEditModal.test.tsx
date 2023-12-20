import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductEditModal from './productEditModal';
import { updateProduct } from '../../../services/request';

jest.mock('../../../services/request', () => ({
  updateProduct: jest.fn(() => Promise.resolve()),
}));

describe('ProductEditModal', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 3600,
    image: 'test.jpg',
    type: 'Breakfast',
    dateEntry: '2023-01-01',
    qty: 1,
    pricetotal: 3600,
  };
  const mockProduct2 = {
    id: 1,
    name: 'Test Product',
    price: 0,
    image: '',
    type: 'Breakfast',
    dateEntry: '2023-01-01',
    qty: 1,
    pricetotal: 3600,
  };
  it('should render and submit form', async () => {
    const setProductsMock = jest.fn();
    const onHideMock = jest.fn();

    render(<ProductEditModal product={mockProduct} setProducts={setProductsMock} onHide={onHideMock} />);

    // Modify the form fields
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Modified Product' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '15.99' } });
    fireEvent.change(screen.getByPlaceholderText('Imagen'), { target: { value: 'modified.jpg' } });
    fireEvent.change(screen.getByLabelText('Select de tipos'), { target: { value: 'Lunch' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }));

    // Wait for asynchronous actions to complete
    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith(mockProduct.id, {
        name: 'Modified Product',
        price: 15.99,
        image: 'modified.jpg',
        type: 'Lunch',
      });
      expect(setProductsMock).toHaveBeenCalled();
      expect(onHideMock).toHaveBeenCalled();
      expect(screen.getByText('Producto editado exitosamente')).toBeInTheDocument();
    });
  });

  it('should show warning when submitting with empty fields', async () => {
    const setProductsMock = jest.fn();
    const onHideMock = jest.fn();
    const saveProductEdited = jest.fn()

    render(<ProductEditModal product={mockProduct2} setProducts={setProductsMock} onHide={onHideMock} />);

    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }));

    await waitFor(() => {
      expect(screen.getByText('Todos los campos son obligatorios')).toBeInTheDocument();
    });
    expect(saveProductEdited).not.toHaveBeenCalled();
  });
  

  

});
