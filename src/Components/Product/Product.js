import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../../Components/Loader/Loader';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => {
            if (!singleProduct || !singleProduct.rating) {
              return <p key={singleProduct.id}>Product data is incomplete.</p>;
            }
            return <ProductCard product={singleProduct} key={singleProduct.id} />;
          })}
        </section>
      )}
    </>
  );
}

export default Product;

