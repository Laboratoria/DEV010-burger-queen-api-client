import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkerEditModal from './workerEditModal';

describe('WorkerEditModal', () => {
  const workerMock = {
    id: 1,
    name: 'John Doe',
    role: 'Chef',
    email: 'john@example.com',
    password: '123456'
  };

  test('renderiza WorkerEditModal con datos iniciales', () => {
    const { getByText, getByPlaceholderText } = render(
      <WorkerEditModal worker={workerMock} setWorkers={() => {}} onHide={() => {}} />
    );

    expect(getByText('Editar Usuarios')).toBeInTheDocument();
    expect(getByPlaceholderText('Nombre')).toHaveValue('John Doe');
    expect(getByPlaceholderText('Email')).toHaveValue('john@example.com');
    expect(getByText('Tipo')).toBeInTheDocument();
    expect(getByText('Chef')).toBeInTheDocument();
    expect(getByText('Admin')).toBeInTheDocument();
    expect(getByText('Mesero')).toBeInTheDocument();
    expect(getByText('Guardar cambios')).toBeInTheDocument();
  });

  test('actualiza el estado al cambiar la entrada', () => {
    const { getByPlaceholderText } = render(
      <WorkerEditModal worker={null} setWorkers={() => {}} onHide={() => {}} />
    );

    const nameInput = getByPlaceholderText('Nombre');
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'Nuevo Nombre' } });
    fireEvent.change(emailInput, { target: { value: 'nuevo@example.com' } });

    expect(nameInput).toHaveValue('Nuevo Nombre');
    expect(emailInput).toHaveValue('nuevo@example.com');
  });

  test('envía el formulario y actualiza el trabajador', async () => {
    const setWorkersMock = jest.fn();
    const onHideMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <WorkerEditModal worker={workerMock} setWorkers={setWorkersMock} onHide={onHideMock} />
    );

    const nameInput = getByPlaceholderText('Nombre');
    const emailInput = getByPlaceholderText('Email');
    const submitButton = getByText('Guardar cambios');

    fireEvent.change(nameInput, { target: { value: 'Nombre Actualizado' } });
    fireEvent.change(emailInput, { target: { value: 'actualizado@example.com' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setWorkersMock).toHaveBeenCalledWith(expect.any(Function)); // Puedes agregar más aserciones específicas según tu caso de uso
      expect(onHideMock).toHaveBeenCalled();
      expect(getByText('Usuario editado exitosamente')).toBeInTheDocument();
    });
  });
});
