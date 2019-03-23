import React, {Component} from 'react';

import classes from './SearchControls.css';

import Input from '../UI/Input/Input';

class SearchControls extends Component {
    state = {
        searchControls: {
            filterDropdown: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'all', displayValue: 'All Fields'},
                        {value: 'first_name', displayValue: 'First Name'},
                        {value: 'last_name', displayValue: 'Last Name'},
                        {value: 'email', displayValue: 'Email'},
                        {value: 'ip', displayValue: 'IP'},
                        {value: 'latitude', displayValue: 'Latitude'},
                        {value: 'longitude', displayValue: 'Longitude'},
                        {value: 'created_at', displayValue: 'Created'},
                        {value: 'updated_at', displayValue: 'Updated'}
                    ]
                },
                value: 'all'
            },

            searchField: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Search Customers',
                },
                value: ''
            }
        }
    }
    
    inputChangeHandler = (e, inputIdentifier) => {
        const searchControls = {...this.state.searchControls};
        const searchElement = {...searchControls[inputIdentifier]};

        searchElement.value = e.target.value;

        searchControls[inputIdentifier] = searchElement;

        this.setState({searchControls}, () => this.inputDataHandler());
    };

    inputDataHandler = () => {
        const {searchControls} = this.state;
        const inputData = {};

        for (let key in searchControls) {
            inputData[key] = searchControls[key].value;
        }
        
        this.props.search(inputData);
    };

    render() {
        const {searchControls} = this.state;

        const searchInputs = [];

        for (let key in searchControls) {
            
            searchInputs.push(
                <Input 
                    key={key}
                    elementType={searchControls[key].elementType}
                    elementConfig={searchControls[key].elementConfig}
                    value={searchControls[key].value}
                    placeholder={searchControls[key].placeholder}
                    changed={(e) => this.inputChangeHandler(e, key)}
                />
            );
        }

        // console.log('Inputs: ', searchInputs);

        return (
            <div className={classes.SearchControls}>
                {searchInputs}
            </div>
        );
    }
}

export default SearchControls;