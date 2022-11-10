import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryContext from '../context/CategoryContext/CategoryContext';
import style from './ThumbnailCategories.module.scss';

const ThumbnailCategories = ({ name, img }) => {
    const [category, setCategory] = useContext(CategoryContext);
    const categoryHandler = () => {
        setCategory(name);
    };

    return (
        <div className={style.ThumbnailCategories}>
            <NavLink to={`/products/${name}`}>
                <img
                    src={img}
                    className={style.Img}
                    onClick={categoryHandler}
                />
            </NavLink>
            <span className={style.Txt}>Shop {name}</span>
        </div>
    );
};

export default ThumbnailCategories;
