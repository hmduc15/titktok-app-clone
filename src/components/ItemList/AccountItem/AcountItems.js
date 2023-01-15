import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import Image from '@/components/Image';
import styles from './AccountItem.module.scss'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function AcoutItem({ data }) {

    return (
        <Link to={`@${data.nickname}`}>
            <div className={cx('User-sug-item')}>
                <span className={cx('avartar-wrapp')}>
                    <Image
                        className={cx('avatar-img')}
                        src={data.avatar}
                    />
                </span>
                <div className={cx('Sug-item-content')}>
                    <h4 className={cx('sug-username')}>
                        {data.full_name}
                    </h4>
                    <p className={cx('sug-nickname')}>
                        {data.nickname}
                    </p>
                </div>
            </div>
        </Link>
    );
}

AcoutItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AcoutItem;