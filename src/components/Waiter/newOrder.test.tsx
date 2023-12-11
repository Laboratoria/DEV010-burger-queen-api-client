import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewOrder from './NewOrder';
//import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createOrder } from '../../services/request';
import { MemoryRouter, useNavigate } from 'react-router-dom';
//import ProductList from './ProductList';

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


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../services/request', () => ({
  getProducts: jest.fn(() => Promise.resolve(
    {
      ok: 'ok',
      json: () => Promise.resolve(
        [{
          "id": 11,
          "name": "Hamburguesa Doble",
          "price": 12000,
          "image": "https://raw.githubusercontent.com/ginapedraza/burger-queen-api-mock/main/resources/images/producto-burger-doble.png",
          "type": "Breakfast",
          "dateEntry": "2022-03-05 15:14:10"
        }]
      )
    }

  )),
  createOrder: jest.fn(() => Promise.resolve()),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// window.localStorage = {
//   ...localStorage,
//   getItem: () => {
//     console.log('Aca esta')
//     return 'token'
// }
// }

describe('NewOrder component', () => {

  beforeAll(() => {
    localStorage.setItem('token', 'token')
  })
  it('should show Enviar pedido button ', () => {
    render(<MemoryRouter><NewOrder /></MemoryRouter>);
    expect(screen.getByText('Enviar pedido')).toBeInTheDocument();
  });

  /*it('handles logged session', () => {
    const removeItemMock = jest.fn();
    window.localStorage.removeItem = removeItemMock;

    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<NewOrder />);

    fireEvent.click(screen.getByTestId('logOut-button'));

    expect(navigateMock).toHaveBeenCalledWith('/');
  });*/

  it('guarda el pedido cuando se hace clic en el botón Enviar pedido', async () => {
    /*console.log(window.localStorage.getItem)
    const spy = jest.spyOn(window.localStorage, 'getItem')
    spyOn(localStorage, 'getItem').andCallFake (() => {
      //'token'
      console.log('no importa')
      return 'token'
    })*/
    //key in localStorage ? localStorage[key] : null

    render(<MemoryRouter><NewOrder /></MemoryRouter>);



    // Simula las entradas del usuario
    fireEvent.change(screen.getByTestId('table'), { target: { value: 'Mesa 1' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: 'Maria' } });

    await waitFor(() => {

      fireEvent.click(screen.getByTestId('addProductButton')); // No consigue esto
    });
    //expect(screen.getByTestId('products-table')).toBeInTheDocument();


    //Como agregamos productos antes de hacer click al boton --------------PREGUNTA


    fireEvent.click(screen.getByText('Enviar pedido'));


    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledTimes(1)
      // client: 'Maria',
      // table: 'Mesa 1',
      // products: expect.any(Array),
      // dateEntry: 


    });

    // Verifica si se muestra el mensaje de éxito
    expect(Swal.fire).toHaveBeenCalledWith({ text: 'Orden creada exitosamente', icon: 'success' });

  });

  it('should not call createOrder when items are subtracted from the list of products', async () => {
    render(<MemoryRouter><NewOrder /></MemoryRouter>);
    // Simula las entradas del usuario
    fireEvent.change(screen.getByTestId('table'), { target: { value: 'Mesa 1' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: 'Maria' } });

    await waitFor(() => {

      fireEvent.click(screen.getByTestId('lessProductButton')); // No consigue esto


    });
    fireEvent.click(screen.getByText('Enviar pedido'));


    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledTimes(0)


    });

    expect(Swal.fire).toHaveBeenCalledWith({ text: 'Pedido vacío', icon: 'warning' });
  })

  it('should show a message that the table input is empty', async () => {
    render(<MemoryRouter><NewOrder /></MemoryRouter>);
    // Simula las entradas del usuario
    fireEvent.change(screen.getByTestId('table'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: 'Maria' } });

    fireEvent.click(screen.getByText('Enviar pedido'));


    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledTimes(0);
      expect(Swal.fire).toHaveBeenCalledWith({ text: 'Seleccione una mesa', icon: 'warning' });


    });


  });


  it('should show a message that the name input is empty', async () => {
    render(<MemoryRouter><NewOrder /></MemoryRouter>);
    // Simula las entradas del usuario
    fireEvent.change(screen.getByTestId('table'), { target: { value: 'Mesa 1' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Enviar pedido'));


    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledTimes(0);
      expect(Swal.fire).toHaveBeenCalledWith({ text: 'Ingrese nombre de cliente', icon: 'warning' });


    });

  });

  it('should substract an item when clicking the subtract bottom', async () => {
    render(<MemoryRouter><NewOrder /></MemoryRouter>);

    fireEvent.change(screen.getByTestId('table'), { target: { value: 'Mesa 1' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre del cliente'), { target: { value: 'Maria' } });

    await waitFor(() => {

      fireEvent.click(screen.getByTestId('addProductButton')); // No consigue esto
    });
    const qty= screen.getByTestId('product-qty')
    expect(qty).toHaveTextContent('1');

    await waitFor(() => {

      fireEvent.click(screen.getByTestId('lessProductButton')); // No consigue esto
    });
    
    expect(qty).not.toBeInTheDocument();
  });

  it('should handleLoggedSession correctly', async () => {
    // Configurar el retorno de useNavigate
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <NewOrder />
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
    localStorageMock.getItem.mockReturnValue('Mesero');
    render(
      <MemoryRouter>
        <NewOrder />
      </MemoryRouter>
    );
    // Esperar hasta que se haya renderizado el componente
    await waitFor(() => {});
    // Verificar que setUserRole haya sido llamado con el valor del localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith('userRole');
    expect(localStorageMock.setItem).not.toHaveBeenCalled(); // Asegurarse de que no se haya llamado setItem en este caso
  })

});