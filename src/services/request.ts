import { Token } from "../types/Types";

export const auth = async (email: string, password: string): Promise<Token> => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            // Manejar el caso en que la respuesta no sea exitosa (puedes lanzar un error o manejarlo según tu lógica)
            throw new Error(`Error: ${response.statusText}`);
        }

        // Procesar y devolver la respuesta en el formato adecuado
        const data: Token = await response.json();
        return data;
    } catch (error) {
        // Manejar cualquier error durante la solicitud
        console.error('Error during authentication:', error);
        throw error;
    }
};