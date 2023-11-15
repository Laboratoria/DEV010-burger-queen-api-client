import { Token } from "../types/Types";



export const auth = async (email: string, password: string): Promise<Token> => {
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
    })

    try {
        response;

        /*if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un nuevo error con información específica
            // Mensaje explicito del error
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }*/

        // Procesar y devolver la respuesta en el formato adecuado
        
        const data: Token = await response.json();
        return data;
    } catch (error) {
        const errorText = await response.text(); 
        // Manejar cualquier error durante la solicitud
        console.error('Error during authentication:', errorText);
        throw error;
    }
};