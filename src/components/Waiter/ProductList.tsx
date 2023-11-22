import { useEffect, useState } from 'react';
import { Product } from '../../types/Types';
import { getProducts } from '../../services/request';
import './NewOrder.css';
import iconoMenos from '../../assets/icono-menos.png';
import iconoAgregar from '../../assets/icono-mas.png';



const ProductList = ({ onAddProduct, onSubtractProduct}: { onAddProduct: (product: Product) => void, onSubtractProduct: (product: Product, remove?: boolean) => void}) => {

  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem('token');
  const [menuSelection, setMenuSelection] = useState('Breakfast');

  const handleMenuSelection = (menu: string) => {
    setMenuSelection(menu);
  }

   

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
    <section>
      <section className='buttonMenuSection'>
        <button
          className={
            menuSelection === 'Breakfast'
              ? 'menuButton selectedButton'
              : 'menuButton'
          }
          onClick={() => handleMenuSelection('Breakfast')}
        >
          Desayuno
        </button>
        <button className={
          menuSelection === 'Lunch'
            ? 'menuButton selectedButton'
            : 'menuButton'
        } onClick={() => handleMenuSelection('Lunch')}>
          Almuerzo/ cena
        </button>
      </section>
      <section className='foodSection'>
        <section className="cards">
          {products
            .filter((product) =>
              menuSelection === "Breakfast"
                ? product.type === "Breakfast"
                : product.type === "Lunch"
            )
            .map((product: Product) => (
              <section className="product-box" key={product.id}>
                <img
                  className="product-img"
                  src={`${product.image}`}
                />

                <section className="product-text">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">${product.price}</p>
                  <section className='addProductButtons'>
                  <button className='iconsButton' id= 'lessButton'>
                    <img className='icons' src={iconoMenos}  onClick={() => onSubtractProduct(product, true)}/>
                    </button>
                    <p className='cant'>0</p>
                    <button className='iconsButton' id= 'moreButton' onClick={() => onAddProduct(product)} >
                    <img className='icons' src={iconoAgregar} />
                    </button>
                  </section>
                </section>
              </section>
            ))}
        </section>
      </section>
    </section>
  )
}

export default ProductList;