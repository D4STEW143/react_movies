import React from 'react';
import './Footer.css'


class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                Copyright - {new Date().getFullYear()}
            </div>
        )
    }
}

export default Footer;