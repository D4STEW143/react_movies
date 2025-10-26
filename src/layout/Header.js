import React from 'react';
import './Header.css';
import Search from './components/Search'

class Header extends React.Component {

    render() {
        return (
            <div className='header'>
                <div className='wrap'>
                    <div className='logo'>Video</div>
                    <div className='right'>
                        <div>+7 911 123 45 67</div>
                        <div>masha@dasha.ru</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;