import React from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import CustomCarousel from '../../Components/Carousel/CustomCarousel';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Product/Product';


function Land() {
  return (
    <LayOut>
      <CustomCarousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Land;
