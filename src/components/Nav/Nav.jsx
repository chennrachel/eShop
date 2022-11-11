import style from './Nav.module.scss';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryContext from '../context/CategoryContext/CategoryContext';

const Nav = () => {
    const [category, setCategory] = useContext(CategoryContext);
    const categoryHandler = (event) => {
        if (
            event.target.textContent === 'ROYAL PETS' ||
            event.target.textContent === 'ALL'
        )
            setCategory('all');
        else setCategory(event.target.textContent.toLowerCase());
    };
    return (
        <>
            <div className={style.Sale}>- FREE DELIVERY AUSTRALIA-WIDE -</div>
            <div className={style.Header}>
                <ul className={style.Nav}>
                    <div className={style.MenuHome}>
                        <NavLink to='/' className={style.Link}>
                            <li
                                className={style.MenuHome__li}
                                onClick={categoryHandler}
                            >
                                ROYAL PETS
                            </li>
                        </NavLink>
                    </div>
                    <div className={style.MenuOther}>
                        <NavLink to='/products' className={style.Link}>
                            <li
                                className={style.MenuOther__li}
                                onClick={categoryHandler}
                            >
                                ALL
                            </li>
                        </NavLink>
                        <NavLink to='/products/cats' className={style.Link}>
                            <li
                                className={style.MenuOther__li}
                                onClick={categoryHandler}
                            >
                                CATS
                            </li>
                        </NavLink>
                        <NavLink to='/products/dogs' className={style.Link}>
                            <li
                                className={style.MenuOther__li}
                                onClick={categoryHandler}
                            >
                                DOGS
                            </li>
                        </NavLink>
                        <NavLink to='/favourites' className={style.Link}>
                            <li className={style.MenuOther__li}>
                                <i className='fa-regular fa-heart'></i>
                            </li>
                        </NavLink>
                        <NavLink to='/cart' className={style.Link}>
                            <li className={style.MenuOther__li}>
                                <i className='fa-solid fa-cart-shopping'></i>
                            </li>
                        </NavLink>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default Nav;
