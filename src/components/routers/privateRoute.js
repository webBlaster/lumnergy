import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (rest.isAuthenticated) {
                    if(location.pathname !== '/setup' && !rest.isProfileUpdated && !rest.financialAssistanceSetupStep) {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/setup",
                                    state: { from: location }
                                }}
                            />
                        );
                    } else {
                        return children;
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location }
                            }}
                        />
                    );
                }
            }}
        />
    );
}

export default PrivateRoute;
