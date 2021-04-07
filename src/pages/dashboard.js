import React, {Component} from 'react';

import DefaultHeader from '../components/headers/default.js';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <DefaultHeader />
                <h1 className="text-center">Dashboard</h1>
            </div>
        );
    };
}

export default Dashboard;
