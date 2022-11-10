import { useState, useEffect } from 'react';
import { getProductsCategoryTrue } from '../../services/products.js';
import { Carousel } from 'react-bootstrap/';
import style from './CarouselList.module.scss';

const CarouselList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsCategoryTrue('isFeatured').then((products) =>
            setProducts(products)
        );
    }, []);

    return (
        <Carousel>
            {products.map((productData) => (
                <Carousel.Item key={productData.id}>
                    <img
                        className='d-block w-100'
                        src={productData.bannerImage}
                        alt={`${productData.Name} Image`}
                        style={{ height: 400, objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>
                            <span className={style.Caption}>
                                {productData.Name}
                            </span>
                        </h3>
                        <button>Shop now!</button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselList;
