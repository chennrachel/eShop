import { useState, useEffect } from 'react';
import { getProductsCategoryTrue } from '../../services/products.js';
import { Carousel } from 'react-bootstrap/';
import style from './CarouselList.module.scss';
import { NavLink } from 'react-router-dom';

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
                        alt={`${productData.Name}`}
                        style={{ height: 400, objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>
                            <span className={style.Caption}>
                                {productData.Name}
                            </span>
                        </h3>
                        <NavLink to={`/products/${productData.id}`}>
                            <button>Shop now!</button>
                        </NavLink>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselList;
