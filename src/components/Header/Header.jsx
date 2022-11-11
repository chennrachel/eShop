import style from './Header.module.scss';

const Heading = ({ title, bannerImage, description }) => {
    return (
        <div className={style.Header}>
            <img
                src={bannerImage}
                className={style.bannerImage}
                alt='cute cat or dog'
            ></img>
            <p className={style.Title}>{title}</p>
            <p className={style.Description}>{description}</p>
        </div>
    );
};

export default Heading;
