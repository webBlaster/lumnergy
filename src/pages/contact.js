import React, {Component} from 'react';
import { Card, Media } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faMobile, faAt } from '@fortawesome/free-solid-svg-icons';

import DefaultHeader from '../components/headers/default.js';
import DefaultFooter from '../components/footers/default.js';


class Contact extends Component {
    render() {
        return (
            <div className="h-100 d-flex flex-column justify-content-between">
                <DefaultHeader />
                <div className="spacer"></div>
                <div>
                    <h1 className="text-center section-heading">Contact Us</h1>
                    <Card className="page-form-card">
                        <Card.Body>
                            <Media className="mb-3">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
                                </span>
                                <Media.Body>
                                    62, Bola Street,<br />
                                    Ebute Metta, Lagos.
                                </Media.Body>
                            </Media>
                            <Media className="mb-3">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faMobile} size="1x" />
                                </span>
                                <Media.Body>
                                    <a href="tel:+2348091607291">(+234) 80 9160 7291</a>
                                </Media.Body>
                            </Media>
                            <Media className="mb-3">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faAt} size="1x" />
                                </span>
                                <Media.Body>
                                    <a href="mailto:hello@lumnergy.com">hello@lumnergy.com</a>
                                </Media.Body>
                            </Media>
                            <p className="mt-5">
                                <a href="https://www.instagram.com/lumnergy_ng/">
                                    <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
                                </a>
                            </p>
                        </Card.Body>
                    </Card>
                </div>
                <DefaultFooter />
            </div>
        );
    };
}

export default Contact;
