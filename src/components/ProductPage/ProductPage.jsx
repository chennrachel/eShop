import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getNewProductById, getProductById } from '../../services/products';
import RequestContext from '../context/RequestContext/RequestContext';
import style from './ProductsPage.module.scss';
import { addToCart, heartClickHandler } from '../../services/functions';

const ProductPage = () => {
    const { id } = useParams();
    const [request, setRequest] = useContext(RequestContext);
    const [indProduct, setIndProduct] = useState([]);
    const [stockInfo, setStockInfo] = useState([]);
    const [amount, setAmount] = useState(0);
    const [colour, setColour] = useState('');
    const [size, setSize] = useState('');

    // useEffect: update when new request set
    useEffect(() => {
        getProductById(id).then((data) => setIndProduct(data));
    }, [request]);

    // useEffect: update stock info for colour or size change
    useEffect(() => {
        if (colour && size) {
            getNewProductById(id, colour, size).then((data) =>
                setIndProduct(data)
            );
        }
    }, [request, colour, size]);

    // functions: update amount with limitations of (0 - max stock)
    const incrementAmount = () => {
        if (amount < indProduct.Quantity || amount < stockInfo[size])
            setAmount(amount + 1);
        else throw new Error('Out of stock!');
    };
    const decrementAmount = () => {
        if (amount > 0) setAmount(amount - 1);
    };

    // handlers: colour and size drop down
    const colourHandler = (event) => {
        setColour(event.target.value);
    };
    const sizeHandler = (event) => {
        setSize(event.target.value);
    };

    return (
        <>
            <div className={style.Anchor} />
            <div className={style.Container}>
                <img
                    className={style.Img}
                    src={indProduct.imageURL}
                    alt={`${indProduct.Name} Image`}
                />
                <div className={style.Txt}>
                    <div className={style.HeartContainer}>
                        <p>{indProduct.Brand}</p>
                        {indProduct.inFavourites == true ? (
                            <i
                                onClick={() =>
                                    heartClickHandler(
                                        indProduct,
                                        request,
                                        setRequest
                                    )
                                }
                                className={style.Card__Top__Heart}
                                class='fa-solid fa-heart'
                            ></i>
                        ) : (
                            <i
                                className={style.Card__Top__Heart}
                                class='fa-regular fa-heart'
                                onClick={() =>
                                    heartClickHandler(
                                        indProduct,
                                        request,
                                        setRequest
                                    )
                                }
                            ></i>
                        )}
                    </div>
                    <h3>{indProduct.Name}</h3>
                    <p>${indProduct.Price}</p>
                    <p>{indProduct.Description}</p>
                    <div className={style.Options}>
                        {indProduct.Colours && (
                            <div className={style.Options__Colours}>
                                Colour:
                                <select
                                    className={style.Select}
                                    onChange={colourHandler}
                                    defaultValue=''
                                >
                                    <option value='' disabled hidden>
                                        Select Colour
                                    </option>
                                    {indProduct.Colours.split(',').map(
                                        (colour, key) => (
                                            <option key={key}>{colour}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}
                        {indProduct.Sizes && (
                            <div className={style.Options__Size}>
                                Size:
                                <select
                                    className={style.Select}
                                    onChange={sizeHandler}
                                    defaultValue=''
                                >
                                    <option value='' disabled hidden>
                                        Select Size
                                    </option>
                                    {indProduct.Sizes.split(',').map(
                                        (item, key) => (
                                            <option key={key}>{item}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}
                    </div>
                    {indProduct.Quantity ? (
                        <>
                            <div className={style.QuantityBag}>
                                <p>Quantity:</p>
                                <div className={style.Amount}>
                                    <button
                                        className={style.Amount__Btn}
                                        onClick={decrementAmount}
                                    >
                                        -
                                    </button>
                                    <p className={style.Amount__Txt}>
                                        {amount}
                                    </p>
                                    <button
                                        className={style.Amount__Btn}
                                        onClick={incrementAmount}
                                    >
                                        +
                                    </button>
                                </div>
                                {amount > 0 ? (
                                    <button
                                        className={style.AddToCart}
                                        onClick={() =>
                                            addToCart(
                                                indProduct,
                                                amount,
                                                request,
                                                setRequest
                                            )
                                        }
                                    >
                                        Add to cart
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                            <p className={style.StockInfo}>
                                Order quick! We only have {indProduct.Quantity}{' '}
                                of this item left in stock.
                            </p>
                        </>
                    ) : (
                        ''
                    )}
                    {indProduct.Quantity == 0 && (
                        <p className={style.StockInfo}>
                            Sorry, we're out of stock!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductPage;
