import Login from "./Login";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { auth } from "../../services/request";
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn())
}));
jest.mock("../../services/request", () => ({
  auth: jest.fn(() => Promise.resolve({
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
  it('Should set the error message in spanish when an specific error occurs', () => {
    
  })
});