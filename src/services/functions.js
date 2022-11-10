import {
    toggleFavourites,
    decrementQuantity,
    removeFromCartFx,
    changeCartQuantity,
} from './products';

export const heartClickHandler = (productData, request, setRequest) => {
    toggleFavourites(productData.id).then(() => setRequest(request + 1));
};

export const addToCart = (productData, amount, request, setRequest) => {
    decrementQuantity(productData.id, amount).then(() =>
        setRequest(request + 1)
    );
};

export const removeFromCart = (productData, request, setRequest) => {
    removeFromCartFx(productData.id, productData.quantityInCart).then(() =>
        setRequest(request + 1)
    );
};

export const changeAmountInCart = (
    productData,
    plusOrMinus,
    request,
    setRequest
) => {
    // if quantity in cart > 1, you can increase or decrease quantity
    if (productData.Quantity > 0) {
        if (productData.quantityInCart > 1) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
            // if quantity in cart = 1, you can only increase
        } else if (
            (productData.quantityInCart =
                1 &&
                plusOrMinus == 1 &&
                productData.quantityInCart <= productData.Quantity)
        ) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
        } else
            throw Error(
                'Quantity cannot be less than 1. If you are trying to remove from cart, press remove instead'
            );
        // if quantity = 0, you can only decrease
    } else if (productData.Quantity == 0) {
        console.log('working');
        if (productData.quantityInCart > 1 && plusOrMinus == -1) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
        }
    } else throw Error('Sold out!');
};
