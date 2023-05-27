import styles from './Search.Module.scss';

import classNames from 'classnames/bind';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import '~/Grid.scss';
const cx = classNames.bind(styles);

function Search() {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const [songDetail, setSongDetail] = useState(null);

    const cancelToken = useRef(null);

    const debouncedHandleInputChange = useRef(
        debounce(async (keyword) => {
            if (!keyword) {
                setSearchResults([]);
                return;
            }

            try {
                if (cancelToken.current) {
                    cancelToken.current.cancel();
                }
                cancelToken.current = axios.CancelToken.source();
                const response = await axios.get(`https://server-tau-six.vercel.app/api/search?keyword=${keyword}`, {
                    cancelToken: cancelToken.current.token,
                });

                const data = response.data.data.playlists ? response.data.data.songs : [{ title: '' }];
                const filteredResults = data.filter(
                    (item) =>
                        item.title &&
                        typeof item.title === 'string' &&
                        item.title.toLowerCase().includes(keyword.toLowerCase()),
                );

                setSearchResults(filteredResults);
                setShowResults(true);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setError(error.message);
                    setSearchResults([]);
                    setShowResults(false);
                }
            }
        }, 500),
    ).current;

    useEffect(() => {
        debouncedHandleInputChange(keyword);
        return () => {
            if (cancelToken.current) {
                cancelToken.current.cancel();
            }
        };
    }, [keyword, debouncedHandleInputChange]);

    const handleInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault(); // ngăn chặn sự kiện mặc định của form
        setSearchResults([]);
        setShowResults(false);
        setError(null);
        // navigate(config.routes.album);
    };

    const handleMouseLeave = () => {
        setShowResults(false);
    };

    useEffect(() => {
        if (songDetail) {
            navigate(config.routes.player, { state: songDetail });
        }
    }, [songDetail, navigate]);

    const handleClickResult = (item) => {
        if (item) {
            const songDetail = item;
            setSongDetail(songDetail);
            setSearchResults([]);
            localStorage.setItem('songDetail', JSON.stringify(songDetail));
            navigate(config.routes.album, { state: songDetail });
        }
    };

    return (
        <div className={cx('l-10', 'c-8')}>
            <form onSubmit={handleSearch} className={cx('search')}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleInputChange}
                    placeholder="Từ khóa tìm kiếm..."
                    className={cx('search-input', 'l-8')}
                    required
                />
                <button type="submit" className={cx('search-btn', 'l-2')}>
                    <BsSearch />
                </button>

                <ul
                    onMouseLeave={handleMouseLeave}
                    className={cx('search-list', 'l-10', 'c-12', { show: showResults && searchResults?.length > 0 })}
                >
                    {Array.isArray(searchResults) &&
                        searchResults.map((item) => (
                            <Link key={item.encodeId}>
                                <li className="artist-card">
                                    <h2 onClick={() => handleClickResult(item)}>{item.title}</h2>
                                </li>
                            </Link>
                        ))}
                </ul>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}

export default Search;
