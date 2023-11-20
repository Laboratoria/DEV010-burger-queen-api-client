import { useEffect, useState } from 'react';
import { Product } from '../../types/Types';
import { getProducts } from '../../services/request';


const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token !== null) {
                    console.log(token);
                    const response = await getProducts(token);
                    
                    if (response.ok) {
                        const data: Product[] = await response.json();
                        setProducts(data);
                    } else {
                        console.error(`Error: ${response.status} - ${response.statusText}`);
                    }
                }
            } catch (error) {
                console.error('Error during API request:', error);
            }
        };

        fetchData();
    }, [token]);

return (
    <section className="cards">
{products.map((product: Product) => (
            <section className="product-box" key={product.id}>
                  <img
                  className="product-img"
                  src={`https://image.tmdb.org/t/p/w154/${product.image}`}
                />
             
              <section className="product-text">
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </section>
            </section>
          ))}
    </section>
)
}


export default ProductList;