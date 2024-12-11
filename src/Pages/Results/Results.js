import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    // Fetching the data from the API
    setLoading(true);
    setError(null); // Reset error on new fetch
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch products. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryName]); // This ensures the effect runs when categoryName changes

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category: {categoryName}</p>
        <hr />
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p>No products found in this category.</p>
        )}
        <div className={classes.products_container}>
          {!loading &&
            !error &&
            results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;


