import { useEffect, useContext } from 'react';
import style from './ProductList.module.scss';
import { getProducts } from '../../services/products.js';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductContext from '../../components/context/ProductContext/ProductContext';
import CategoryContext from '../../components/context/CategoryContext/CategoryContext';
import RequestContext from '../../components/context/RequestContext/RequestContext';

const ProductList = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [category, setCategory] = useContext(CategoryContext);
    const [request, setRequest] = useContext(RequestContext);

    useEffect(() => {
        getProducts(category).then((products) => setProducts(products));
    }, [category, request]);

    return (
        <>
            <section className={style.List}>
                {products.map((productData) => (
                    <ProductCard
                        key={productData.id}
                        productData={productData}
                    />
                ))}
            </section>
        </>
    );
};

export default ProductList;
