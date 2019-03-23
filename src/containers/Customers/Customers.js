import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import classes from './Customers.css';

import data from '../../../customers.json';

import SearchControls from '../../components/SearchControls/SearchControls';
import SearchResults from '../../components/SearchResults/SearchResults';
import Button from '../../components/UI/Button/Button';
import NewCustomer from '../Customers/NewCustomer/NewCustomer';

class Customers extends Component{
    state = {
        customers: [],
        searchResults: [],
        edit: false,
        editedCustomer: null
    }

    componentDidMount() {
        // this.setState({customers: data, searchResult: data});
        this.setState({customers: data});
    }

    search = (serachInputs) => {
        const filter = serachInputs.filterDropdown;
        const searchString = serachInputs.searchField.toLowerCase();

        const searchResults = this.parseSearchString(filter, searchString);

        this.setState({searchResults});
    };
    
    parseSearchString = (filter, str) => {
        let searchReasults = [];
        
        if (filter === 'all') {
            //all fields
            if (str.match(/^\s{0}\S+\s{0}$/)) {
                searchReasults = this.state.customers.filter(customer => {
                    return (
                        customer.first_name.toLowerCase().includes(str) ||
                        customer.last_name.toLowerCase().includes(str) ||
                        customer.email.toLowerCase().includes(str) || 
                        customer.longitude.toString().includes(str) || 
                        customer.latitude.toString().includes(str) ||
                        customer.ip.toString().includes(str)
                    );
                });
            }
            
            //all fields -> first and last name
            if (str.match(/^\s{0}[A-z]+\s{1}[A-z]*\s{0}$/)) {
                searchReasults = this.state.customers.filter(customer => {
                    const searchString = str.toLowerCase().split(' ');
                    const firstName = searchString[0];
                    const lastName = searchString[1];
                    
                    return (
                        customer.first_name.toLowerCase().includes(firstName) &&
                        customer.last_name.toLowerCase().includes(lastName)
                    );
                });
            }
        } else {
            if (str.match(/^\s{0}\S+\s{0}$/)) {
                searchReasults = this.state.customers.filter(customer => {
                    if (filter === 'longitude' || filter === 'latitude') {
                        return customer[filter].toString().includes(str);
                    }
                    return customer[filter].toLowerCase().includes(str);
                });
            }
        }
        
        

        return searchReasults
            .sort((a, b) => {
                const A_first_name = a.first_name.toLowerCase();
                const B_first_name = b.first_name.toLowerCase();
                const A_last_name = a.last_name.toLowerCase();
                const B_last_name = b.last_name.toLowerCase();

                if (A_first_name === B_first_name) {
                    return (A_last_name < B_last_name) ? -1 : (A_last_name > B_last_name) ? 1 : 0;
                } else {
                    return (A_first_name < B_first_name) ? -1 : 1;
                }
            });
    };

    editCustomerHandler = (id) => {
        console.log('Edit Customer: ', id);

        const editedCustomer = this.state.customers.filter(customer => customer.id === id);

        this.setState({editedCustomer: editedCustomer[0]});
    };

    cancelEditCustomer = () => {
        this.setState({editedCustomer: null});
    };

    render() {

        console.log('Customer: ', this.state.editedCustomer);

        // const display = <Route path={`${this.props.match.path}/edit`}/>;

        let display = (
            <div className={classes.Customers}>
                <div className={classes.SearchControls}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{boxSizing: 'border-box', padding: '4px 0', display: 'flex', alignItems: 'flex-end'}}>Search Results: {this.state.searchResults.length}</div>
                        <Link to={`${this.props.match.path}/new-customer`} style={{textDecoration: 'none'}}>
                            <Button btnType="Info">Add Customer</Button>
                        </Link>
                    </div>
                    <SearchControls 
                        search={this.search}
                    />
                </div>
                <div>
                    <SearchResults
                        data={this.state.searchResults}
                        edit={this.editCustomerHandler}
                    />
                </div>
            </div>
        );

        if (this.state.editedCustomer) {
            display = (
                <NewCustomer customer={this.state.editedCustomer} cancel={this.cancelEditCustomer}/>
            );
        }

        return display;
    }
} 

export default Customers;