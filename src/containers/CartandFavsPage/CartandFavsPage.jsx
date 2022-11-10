import { useContext, useEffect } from 'react';
import { getProductsCategoryTrue } from '../../services/products';
import style from './CartandFavsPage.module.scss';
import RequestContext from '../../components/context/RequestContext/RequestContext';
import ProductContext from '../../components/context/ProductContext/ProductContext';
import Header from '../../components/Header/Header';
import ProductRow from '../../components/ProductRow/ProductRow';
import ProductCard from '../../components/ProductCard/ProductCard';

const CartandFavsPage = ({ filter, title, bannerImage, description }) => {
    const [products, setProducts] = useContext(ProductContext);
    const [request, setRequest] = useContext(RequestContext);

    useEffect(() => {
        getProductsCategoryTrue(filter).then((products) =>
            setProducts(products)
        );
    }, [filter, request]);

    return (
        <>
            <Header
                title={title}
                bannerImage={bannerImage}
                description={description}
            />
            <section className={style.List}>
                {products.map((productData) =>
                    filter === 'inCart' ? (
                        <ProductRow
                            key={productData.id}
                            productData={productData}
                        />
                    ) : (
                        <ProductCard
                            key={productData.id}
                            productData={productData}
                        />
                    )
                )}
            </section>
        </>
    );
};

export default CartandFavsPage;
