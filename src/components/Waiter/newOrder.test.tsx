import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewOrder from './NewOrder';
import { useNavigate } from 'react-router-dom';

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

});