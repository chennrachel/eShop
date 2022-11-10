import {
    toggleFavourites,
    decrementQuantity,
    removeFromCartFx,
    changeCartQuantity,
} from './products';

// handler: calls toggle favourites when you select the heart icon and sets new request
export const heartClickHandler = (productData, request, setRequest) => {
    toggleFavourites(productData.id).then(() => setRequest(request + 1));
};

// handler: calls addToCart and sets new request
export const addToCart = (productData, amount, request, setRequest) => {
    decrementQuantity(productData.id, amount).then(() =>
        setRequest(request + 1)
    );
};

// handler: calls removeFromCart and sets new request
export const removeFromCart = (productData, request, setRequest) => {
    removeFromCartFx(productData.id, productData.quantityInCart).then(() =>
        setRequest(request + 1)
    );
};

// handler: logic around whether changeCartQuantity is called
export const changeAmountInCart = (
    productData,
    plusOrMinus,
    request,
    setRequest
) => {
    // Quantity > 0 (stock is available)
    if (productData.Quantity > 0) {
        // if quantity in cart > 1, you can increase or decrease quantity
        if (productData.quantityInCart > 1) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
            // if quantity in cart = 1, you can only increase
        } else if (
            productData.quantityInCart === 1 &&
            plusOrMinus === 1 &&
            productData.quantityInCart <= productData.Quantity
        ) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
        } else
            throw Error(
                'Quantity cannot be less than 1. If you are trying to remove from cart, press remove instead'
            );
        // if quantity = 0, you can only decrease
    } else if (productData.Quantity === 0) {
        console.log('working');
        if (productData.quantityInCart > 1 && plusOrMinus === -1) {
            changeCartQuantity(productData.id, plusOrMinus).then(() =>
                setRequest(request + 1)
            );
        }
    } else throw Error('Sold out!');
};
