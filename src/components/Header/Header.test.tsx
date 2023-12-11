import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from './Header';

// Crear un objeto simulado para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Configurar el mock de localStorage antes de las pruebas
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

// Restaurar el mock de localStorage después de cada prueba
afterEach(() => {
  jest.clearAllMocks();
});

// Mockear useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header component', () => {
  it('should handleLoggedSession correctly', async () => {
    // Configurar el retorno de useNavigate
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Esperar hasta que se haya renderizado el componente
    await waitFor(() => {});

    // Hacer clic en el botón de cerrar sesión
    fireEvent.click(screen.getByTestId('logOut-button'));

    // Verificar que localStorage.removeItem haya sido llamado al menos una vez
    expect(localStorageMock.removeItem).toHaveBeenCalled();

    // Verificar que useNavigate haya sido llamado con '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // await waitFor(() => {
    //     expect(screen.getByTestId('profile-button')).toHaveTextContent('');
    //   });
  });

  it('should verify role', async () => {
    localStorageMock.getItem.mockReturnValue('Chef');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Esperar hasta que se haya renderizado el componente
    await waitFor(() => {});
    // Verificar que setUserRole haya sido llamado con el valor del localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith('userRole');
    expect(localStorageMock.setItem).not.toHaveBeenCalled(); // Asegurarse de que no se haya llamado setItem en este caso
  })
});
