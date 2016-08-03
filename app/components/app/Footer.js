require('./Footer.scss')
import React from 'react'
import EmailSignup from '../../containers/app/footer/EmailSignup'
import AnchorLink from '../../components/lib/link/AnchorLink'



const Footer = ({ color, bgColor }) => (
    <div className="Footer" style={{color, backgroundColor: bgColor}}>

      <div className="site-links">
        <AnchorLink href="/about-us" style={{color}}>About Us</AnchorLink>
        <AnchorLink href="/contact" style={{color}}>Contact Us</AnchorLink>
        <AnchorLink href="/returns-exchange" style={{color}}>Returns & Exchanges</AnchorLink>
        <AnchorLink href="/privacy-policy" style={{color}}>Privacy Policy</AnchorLink>
      </div>

      <div className="social-links">
        <AnchorLink href="https://www.youtube.com/user/YGEntertainment" target="_blank">
          <span className="icon-youtube" style={{color}} />
        </AnchorLink>
        <AnchorLink href="https://www.instagram.com/ygpresents" target="_blank">
          <span className="icon-instagram" style={{color}} />
        </AnchorLink>
        <AnchorLink href="https://twitter.com/ygpresents" target="_blank">
          <span className="icon-twitter" style={{color}} />
        </AnchorLink>
        <AnchorLink href="https://www.facebook.com/ygfamily" target="_blank">
          <span className="icon-facebook" style={{color}} />
        </AnchorLink>
      </div>

      <EmailSignup title="NEWSLETTER" />

    </div>
)


export default Footer
