import React, { useEffect } from 'react';
import './Footer.css';


function Footer() {
    return (
        <div id='footer-container'>
            <div id='footer'>
                <div>
                    &copy; Jacob Premo {new Date().getFullYear()}
                </div>
                <a href='github.com' className='footer-link'>
                    <div className='footer-link-image-wrapper'>
                        <i className="fab fa-github fa-2x"></i>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Footer;
