import Login from "./Login";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { auth } from "../../services/request";
import '@testing-library/jest-dom';
import { Token } from "../../types/Types";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn())
}));

jest.mock("../../services/request", () => ({
  auth: jest.fn(():Promise < Token | string >  => Promise.resolve({
    accessToken: " ",
    user: {
      email: 'waiter@systers.xyz',
      role: 'waiter',
      id: 2
    }
  }))
}));
describe('Login component', () => {
  it('should call auth correctly when an user tries to logg in with a correct accessToken', async () => {
    const email = 'waiter@systers.xyz';
    const password = '123456';
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: email } });
    fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: password } });
    fireEvent.click(getByText('Ingresar'));
    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith(email, password);
    });
  });
 

  it('should display error message for incorrect password case', async () => {
    (auth as jest.Mock).mockResolvedValueOnce('Incorrect password')
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: 'incorrectPassword' },
    });
    fireEvent.click(getByText('Ingresar'));
    // Esperar a que se renderice el mensaje de error
    await waitFor(() => {
      expect(getByText('Contraseña incorrecta')).toBeInTheDocument();
    });
  });
  it('should display error message for cannot find user case', async () => {
    (auth as jest.Mock).mockResolvedValueOnce('Cannot find user')
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: 'correctPassword' },
    });
    fireEvent.click(getByText('Ingresar'));
    // Esperar a que se renderice el mensaje de error
    await waitFor(() => {
      expect(getByText('Usuario no encontrado')).toBeInTheDocument();
    });
  });
  it('should display error message for email and password are required case', async () => {
    (auth as jest.Mock).mockResolvedValueOnce('Email and password are required')
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: '' },
    });
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: '' },
    });
    fireEvent.click(getByText('Ingresar'));
    // Esperar a que se renderice el mensaje de error
    await waitFor(() => {
      expect(getByText('Ingrese email y contraseña')).toBeInTheDocument();
    });
  });
  it('should display error message for email format is invalid case', async () => {
    (auth as jest.Mock).mockResolvedValueOnce('Email format is invalid')
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: 'correctPassword' },
    });
    fireEvent.click(getByText('Ingresar'));
    // Esperar a que se renderice el mensaje de error
    await waitFor(() => {
      expect(getByText('Formato de email incorrecto')).toBeInTheDocument();
    });
  });
  it('should display error message for email format is invalid case', async () => {
    (auth as jest.Mock).mockResolvedValueOnce('')
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: 'correctPassword' },
    });
    fireEvent.click(getByText('Ingresar'));
    // Esperar a que se renderice el mensaje de error
    await waitFor(() => {
      expect(getByText('Error durante la autenticación. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    });
  });
});
