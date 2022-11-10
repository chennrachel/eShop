import style from './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import HomePage from './containers/HomePage/HomePage';
import ProductPage from './components/ProductPage/ProductPage';
import ProductContext from './components/context/ProductContext/ProductContext';
import CategoryContext from './components/context/CategoryContext/CategoryContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import OtherPage from './containers/OtherPage/OtherPage';
import RequestContext from './components/context/RequestContext/RequestContext';
import CartAndFavsPage from './containers/CartandFavsPage/CartandFavsPage';

function App() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState('all');
    const [request, setRequest] = useState(0);

    return (
        <div className={style.App}>
            <BrowserRouter>
                <ScrollToTop />
                <CategoryContext.Provider value={[category, setCategory]}>
                    <Nav />
                    <div className={style.Anchor} />
                    <ProductContext.Provider value={[product, setProduct]}>
                        <RequestContext.Provider value={[request, setRequest]}>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route
                                    path='/products'
                                    element={
                                        <OtherPage
                                            title='ALL PRODUCTS'
                                            bannerImage='https://www.cesarsway.com/wp-content/uploads/2019/06/AdobeStock_219922748.jpe'
                                        />
                                    }
                                />
                                <Route
                                    path='/products/cats'
                                    element={
                                        <OtherPage
                                            title='CATS'
                                            bannerImage='https://whitehavenvet.com/wp-content/uploads/2021/06/make-your-keep-feel-at-home-banner-1568x653.jpg'
                                        />
                                    }
                                />
                                <Route
                                    path='/products/dogs'
                                    element={
                                        <OtherPage
                                            title='DOGS'
                                            bannerImage='https://images.wagwalkingweb.com/media/care/hero/1589221541.72/cavalier-king-charles-spaniel-dog-names.jpg'
                                        />
                                    }
                                />
                                <Route
                                    path='/products/toys'
                                    element={
                                        <OtherPage
                                            filter='inFavourites'
                                            title='TOYS'
                                            bannerImage='https://images.wagwalkingweb.com/media/care/hero/1589221541.72/cavalier-king-charles-spaniel-dog-names.jpg'
                                        />
                                    }
                                />
                                <Route
                                    path='/cart'
                                    element={
                                        <CartAndFavsPage
                                            filter='inCart'
                                            title='MY CART'
                                            bannerImage='https://wallup.net/wp-content/uploads/2018/10/07/195910-dogs-australian-shepherd-grass-animals.jpg'
                                            description='Select the remove button to remove from cart or select the heart to move to favourites instead'
                                        />
                                    }
                                />
                                <Route
                                    path='/favourites'
                                    element={
                                        <CartAndFavsPage
                                            filter='inFavourites'
                                            title='MY FAVOURITES'
                                            bannerImage='https://wallpaperaccess.com/full/6203807.jpg'
                                            description='Select the heart to remove from favourites'
                                        />
                                    }
                                />
                                <Route
                                    path='/products/:id'
                                    element={<ProductPage />}
                                />
                            </Routes>
                        </RequestContext.Provider>
                    </ProductContext.Provider>
                </CategoryContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
