import React from 'react';
import { connect } from 'react-redux';

import DefaultHeader from './defaultHeader';
import AuthenticatedHeader from './authenticatedHeader';


const Header = ( { isAuthenticated } ) => {
    return isAuthenticated ? (<AuthenticatedHeader/>) : (<DefaultHeader/>);
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, null)(Header);
