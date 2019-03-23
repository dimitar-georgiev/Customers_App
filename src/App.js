import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faGlobe, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faGlobe, faMapMarkerAlt);

import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import Customer from './components/Customer/Customer';
import Customers from './containers/Customers/Customers';
import NewCustomer from './containers/Customers/NewCustomer/NewCustomer';

class App extends Component{
    render(){
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path='/customer/:id' component={Customer} />
                        <Route path='/customers/new-customer' render={() => <NewCustomer label="New Customer"/>} />
                        <Route path='/customers' component={Customers} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;