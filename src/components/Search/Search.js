import React from 'react'
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getUserService } from '@/utils/request';

import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as WrapperPopper } from '@/components/Popper/Poper';
import styles from './SearchInput.module.scss';
import ItemSearch from '../ItemList/ItemList';
import AcoutItem from '../ItemList/AccountItem';
import useDebounce from '../../Hooks/useDebounce';

const cx = classNames.bind(styles);

function SearchWrap() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        if (e.target.value.length > 0) {
            setShow(true);
        }
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    }

    const handleFocus = () => {
        setShow(true);
    }

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setShow(false);

    }

    const handleHideResults = () => {
        setShow(false);
    }
    const debounce = useDebounce(searchValue, 700);
    useEffect(() => {
        if (!debounce.trim()) {
            setResults([])
            return;
        }
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await getUserService.get('users/search', {
                    params: {
                        q: searchValue,
                        type: 'less'
                    }
                })
                setResults(res.data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        }
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce])



    return (
        <HeadlessTippy
            visible={show && results.length > 0}
            interactive
            render={attrs => (
                <div className={cx("sug-container")}>
                    <WrapperPopper>
                        {results.map((result) => (
                            <ItemSearch key={result.id} title={result.nickname} />
                        ))}
                        <div className={cx("sug-txt")}>Accounts</div>
                        {results.map((result) => (
                            <AcoutItem key={result.id} data={result} />
                        ))}
                    </WrapperPopper>
                </div>
            )}
            onClickOutside={handleHideResults}
        >
            <form className={cx("input-field")}>
                <input onFocus={handleFocus} ref={inputRef} value={searchValue} onChange={(e) => handleInput(e)} placeholder="Search accounts and videos" />
                <button type="button" className={cx("btn")} onClick={handleClear} >
                    {!!searchValue &&
                        <>
                            {!loading && <FontAwesomeIcon className={cx("reset")} icon={faXmarkCircle} />}
                            {loading && <FontAwesomeIcon className={cx("load")} icon={faSpinner} />}
                        </>
                    }
                </button>
                <span className={cx("SpanSpliter")}></span>
                <button className={cx("btn-search")}>
                    <svg width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="rgba(255, 255, 255, .34)" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path></svg>
                </button>
            </form>
        </HeadlessTippy>

    );
}

export default SearchWrap;