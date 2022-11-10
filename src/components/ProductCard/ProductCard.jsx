import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import RequestContext from '../context/RequestContext/RequestContext';
import style from './ProductCard.module.scss';
import { heartClickHandler } from '../../services/functions';

const ProductCard = ({ productData }) => {
    const [request, setRequest] = useContext(RequestContext);

    return (
        <div className={style.CardBlock}>
            {productData.inFavourites == true ? (
                <i
                    onClick={() =>
                        heartClickHandler(productData, request, setRequest)
                    }
                    className={style.Card__Top__Heart}
                    class='fa-solid fa-heart'
                ></i>
            ) : (
                <i
                    className={style.Card__Top__Heart}
                    class='fa-regular fa-heart'
                    onClick={() =>
                        heartClickHandler(productData, request, setRequest)
                    }
                ></i>
            )}

            <NavLink to={`/products/${productData.id}`} className={style.Card}>
                <div className={style.Card__Top}>
                    <img
                        className={style.Card__Top__Img}
                        src={productData.imageURL}
                    ></img>
                </div>
                <div className={style.Card__Text}>
                    <h3>{productData.Brand}</h3>
                    <p>{productData.Name}</p>
                    <p>${productData.Price.toFixed(2)}</p>
                    {productData.Colours && (
                        <p className={style.Card__Text__More}>
                            More colours available{' '}
                        </p>
                    )}
                </div>
            </NavLink>
        </div>
    );
};

export default ProductCard;
