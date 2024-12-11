import React, { useEffect, useState } from 'react'; 
import Layout from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('Product ID:', productId);

    useEffect(() => {
        if (!productId) {
            setError('Invalid product ID.');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        console.log("Fetching product details for ID:", productId);

        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                console.log("API Response:", res.data);
                setProduct(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err.response?.data || err.message);
                setError('Failed to load product details.');
                setIsLoading(false);
            });
    }, [productId]);

    if (isLoading) {
        return (
            <Layout>
                <Loader />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p>Error: {error}</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <ProductCard 
                product={product} 
                flex={true} 
                renderDesc={true} 
            />
        </Layout>
    );
}

export default ProductDetail;
