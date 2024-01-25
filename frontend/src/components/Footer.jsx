import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="top">
                <h1>ChromaMix</h1>
                <p>© Developer by <a href='/'>Hung Ngo</a></p>
            </div>
            <div className="bottom">
                <h1>Follow me on</h1>
                <div className="links">
                    <a href="https://github.com/hungngodev">
                        <FaGithub className='footer-icons' size={19} />
                    </a>
                    <a href="https://www.linkedin.com/in/hung-ngo-5992b8251/">
                        <FaLinkedinIn className='footer-icons' size={19} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer