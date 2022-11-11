import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
    query,
    where,
} from 'firebase/firestore';
import db from '../config/firebase';

//  function: get products list filtered by category
export const getProducts = async (category) => {
    const collectionRef = query(
        collection(db, 'products'),
        where('Category', 'array-contains', `${category}`)
    );
    const querySnapshot = await getDocs(collectionRef);
    const cleanedData = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const restOfData = doc.data();
        return { id, ...restOfData };
    });
    return cleanedData;
};

//  function: get products list where a filter returns true EG. for featured list, cart and favourites
export const getProductsCategoryTrue = async (filter) => {
    const collectionRef = query(
        collection(db, 'products'),
        where(`${filter}`, '==', true)
    );
    const querySnapshot = await getDocs(collectionRef);
    const cleanedData = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const restOfData = doc.data();
        return { id, ...restOfData };
    });
    return cleanedData;
};

// function: get individual product
export const getProductById = async (id) => {
    const docRef = doc(db, 'products', id);
    const querySnapshot = await getDoc(docRef);
    if (!querySnapshot.exists()) {
        throw new Error(`We couldn't find any results`);
    }
    const returnData = { id: querySnapshot.id, ...querySnapshot.data() };
    return returnData;
};

// function: add or remove from favourites
export const toggleFavourites = async (id) => {
    const docRef = doc(db, 'products', id);
    const querySnapshot = await getDoc(docRef);
    const returnData = {
        id: querySnapshot.id,
        ...querySnapshot.data(),
    };
    if (returnData.inFavourites === true) {
        await updateDoc(docRef, { inFavourites: false });
    } else {
        await updateDoc(docRef, { inFavourites: true });
        await updateDoc(docRef, { inCart: false });
    }
    return true;
};

// function: decrement stock after add to cart
export const decrementQuantity = async (id, amount) => {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, { Quantity: increment(-amount) });
    await updateDoc(docRef, { quantityInCart: increment(amount) });
    await updateDoc(docRef, { inCart: true });
    await updateDoc(docRef, { inFavourites: false });
    return true;
};

// function: alter amount in stock and in cart from cart
export const changeCartQuantity = async (id, plusOrMinus) => {
    // take in the id
    // find a specific document
    const docRef = doc(db, 'products', id);
    // use updateDoc
    // call the increment built in function
    await updateDoc(docRef, { quantityInCart: increment(plusOrMinus) });
    await updateDoc(docRef, { Quantity: increment(-plusOrMinus) });
    return true;
};

// function: remove from cart
export const removeFromCartFx = async (id, amount) => {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, { inCart: false });
    await updateDoc(docRef, { quantityInCart: 0 });
    await updateDoc(docRef, { Quantity: increment(amount) });
    return true;
};

// function: search for new product id for colour + size variant
export const getNewProductById = async (id, colour, size) => {
    const docRefBase = doc(db, 'products', id);
    await updateDoc(docRefBase, { inFavourites: false });
    const querySnapshotBase = await getDoc(docRefBase);
    const cleanedData = {
        ...querySnapshotBase.data(),
    };
    const collectionRef = query(
        collection(db, 'products'),
        where('Colour', '==', colour),
        where('Size', '==', size),
        where('Name', '==', `${cleanedData.Name} (${colour}, Size ${size})`)
    );
    const querySnapshot = await getDocs(collectionRef);
    const newId = querySnapshot.docs[0].id;
    const docRefSpecific = doc(db, 'products', newId);
    const querySnapshot1 = await getDoc(docRefSpecific);
    if (!querySnapshot1.exists()) {
        throw new Error(`Issue retrieving stock`);
    }
    const returnData = { id: querySnapshot1.id, ...querySnapshot1.data() };
    return returnData;
};
