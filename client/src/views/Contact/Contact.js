import React from 'react';
import { Hero, ContactInfo, MapAddress, ContactForm } from './components';

const Contact = props => {
    return ( 
        <div>
            <Hero/>
            <ContactInfo/>
            <MapAddress/>
            <ContactForm/>
        </div>
     );
}
 
export default Contact;