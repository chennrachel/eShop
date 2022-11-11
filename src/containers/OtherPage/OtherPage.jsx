import Header from '../../components/Header/Header';
import ProductList from '../ProductList/ProductList';

const OtherPage = ({ title, bannerImage, category }) => {
    return (
        <div>
            <Header title={title} bannerImage={bannerImage} />
            <ProductList category={category} />
        </div>
    );
};

export default OtherPage;
