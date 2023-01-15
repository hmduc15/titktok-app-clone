import classNames from 'classnames/bind'

import styles from './ItemSearch.module.scss'
import { SearchIcon } from '../Icon/Icon';

const cx = classNames.bind(styles);
function ItemSearch({ title }) {
    return (
        <div className={cx("search-item")}>
            <div className={cx("search-item_icon")}>
                <SearchIcon />
            </div>
            <div className={cx("search-item_txt")}>{title}</div>
        </div>
    );
}

export default ItemSearch;