import ProductList from '../ProductList/ProductList';
import Carousel from '../../components/CarouselList/CarouselList';
import style from './HomePage.module.scss';
import ThumbnailCategories from '../../components/ThumbnailCategories/ThumbnailCategories';

const HomePage = () => {
    return (
        <>
            <Carousel />
            <div className={style.ThumbnailContainer}>
                <ThumbnailCategories
                    name='cats'
                    img='https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg'
                />
                <ThumbnailCategories
                    name='dogs'
                    img='https://www.abc4.com/wp-content/uploads/sites/4/2022/04/000_best-automatic-dog-ball-launchers-214ac0-1.jpg?strip=1&w=640'
                />
                <ThumbnailCategories
                    name='toys'
                    img='https://www.purina.co.nz/sites/default/files/styles/ttt_image_original/public/2020-12/9%20Creative%20Cat%20and%20Dog%20Enrichment%20Ideas1.jpg?itok=60ewAlrO'
                />
            </div>
            <p className={style.Title}>ALL PRODUCTS</p>
            <ProductList category='' />
        </>
    );
};

export default HomePage;
