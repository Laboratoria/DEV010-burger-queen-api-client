import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { fireEvent, render } from '@testing-library/react';
import { auth } from "../../services/request";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock("../../services/request", () => ({
  auth: jest.fn(() => ({
accessToken:" "
  })) 
}))

describe('Login component', () => {
it('should navigate to /waiter/newOrder when a waiter is logged in with a correct accessToken', () => {
  const email = 'waiter@systers.xyz';
  const password = '123456'

  const {getByText} = render(<Login />);
  fireEvent.click(getByText('Ingresar'));
  expect(auth).toHaveBeenCalledWith(email, password);
  expect(useNavigate).toHaveBeenCalledWith("/waiter/newOrder");

}) 

});