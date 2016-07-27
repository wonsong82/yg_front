require('./Footer.scss')
import React from 'react'
import EmailSignup from '../containers/EmailSignup'


const Footer = ({ color }) => (
    <div className="Footer" style={{color}}>

      <div className="site-links">
        <a href="/about-us" style={{color}}>About Us</a>
        <a href="/contact" style={{color}}>Contact Us</a>
        <a href="/returns-exchange" style={{color}}>Returns & Exchanges</a>
        <a href="/privacy-policy" style={{color}}>Privacy Policy</a>
      </div>

      <div className="social-links">
        <a href="https://www.youtube.com/user/YGEntertainment" target="_blank">
          <span className="icon-youtube" style={{color}} />
        </a>
        <a href="https://www.instagram.com/ygpresents" target="_blank">
          <span className="icon-instagram" style={{color}} />
        </a>
        <a href="https://twitter.com/ygpresents" target="_blank">
          <span className="icon-twitter" style={{color}} />
        </a>
        <a href="https://www.facebook.com/ygfamily" target="_blank">
          <span className="icon-facebook" style={{color}} />
        </a>
      </div>

      <EmailSignup title="NEWSLETTER" />

    </div>
)


export default Footer
