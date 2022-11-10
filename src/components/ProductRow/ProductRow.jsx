import { useContext, useEffect } from 'react';
import RequestContext from '../context/RequestContext/RequestContext';
import style from './ProductRow.module.scss';
import { removeFromCart, changeAmountInCart } from '../../services/functions';

const ProductRow = ({ productData }) => {
    const [request, setRequest] = useContext(RequestContext);
    useEffect(() => {}, [request]);

    return (
        <div className={style.Row}>
            <img
                className={style.Img}
                src={productData.imageURL}
                alt={productData.Name}
            ></img>
            <div className={style.Txt}>
                <h3>{productData.Name}</h3>
                <p>{productData.Brand}</p>
                <p>${productData.Price}</p>
                {productData.inCart && productData.quantityInCart ? (
                    <>
                        <div className={style.QuantityBag}>
                            <p>Quantity: </p>
                            <div className={style.Amount}>
                                <button
                                    className={style.Amount__Btn}
                                    onClick={() =>
                                        changeAmountInCart(
                                            productData,
                                            -1,
                                            request,
                                            setRequest
                                        )
                                    }
                                >
                                    -
                                </button>
                                <p className={style.Amount__Txt}>
                                    {productData.quantityInCart}{' '}
                                </p>
                                <button
                                    className={style.Amount__Btn}
                                    onClick={() =>
                                        changeAmountInCart(
                                            productData,
                                            1,
                                            request,
                                            setRequest
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <p className={style.StockInfo}>
                            Order quick! We only have {productData.Quantity} of
                            this item left in stock.
                        </p>
                        <button
                            onClick={() =>
                                removeFromCart(productData, request, setRequest)
                            }
                        >
                            Remove
                        </button>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ProductRow;
