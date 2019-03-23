import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import classes from './NewCustomer.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class NewCustomer extends Component{
    state = {
        newCustomerForm: {
            first_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: this.props.customer ? this.props.customer.first_name : '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            last_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: this.props.customer ? this.props.customer.last_name : '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: this.props.customer ? this.props.customer.email : '',
                validation: {
                    required: true,
                    matches: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                },
                valid: false,
                touched: false
            },
            longitude: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Longitude'
                },
                value: this.props.customer ? this.props.customer.longitude : '',
                validation: {
                    // required: false
                },
                valid: true,
                touched: false
            },
            latitude: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Latitude'
                },
                value: this.props.customer ? this.props.customer.latitude : '',
                validation: {
                    // required: false
                },
                valid: true,
                touched: false
            },
            ip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'IP'
                },
                value: this.props.customer ? this.props.customer.ip : '',
                validation: {
                    // required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        redirect: false,
        // customer: null
    }

    componentDidMount(){
        // if (this.props.customer) {
        //     this.inputChangeHandler(null, null, this.props.customer);
        // }
    }

    inputChangeHandler = (e, inputIndentifier, customer) => {
        const newCustomerForm = {...this.state.newCustomerForm};
        const formElement = {...newCustomerForm[inputIndentifier]};

        if (!e) {
            const {first_name, last_name, email, ip, longitude, latitude} = customer;

            for (let key in newCustomerForm) {
                newCustomerForm[key].value = customer[key];
            }

            this.setState({newCustomerForm});
        } else {
            formElement.value = e.target.value;
            formElement.valid = this.checkValidity(formElement.value, formElement.validation);
            formElement.touched = true;

            newCustomerForm[inputIndentifier] = formElement;

            let formIsValid = true;

            for (let key in newCustomerForm) {
                formIsValid = newCustomerForm[key].valid && formIsValid;
            }

            this.setState({newCustomerForm, formIsValid});
        }

        
    };

    checkValidity = (value, rules) => {
        let valid = true;

        if (rules.required) {
            valid = value.trim() !== '' && valid;
        }

        if (rules.minLength) {
            valid = value.trim().length >= rules.minLength && valid;
        }

        if (rules.matches) {
            valid = value.trim().match(rules.matches);
        }

        return valid;
    };

    formSubmissionHandler = (e) => {
        e.preventDefault();

        //sending a request to the server

        console.log('Submitted');

        this.setState({redirect: true});
    };

    formCanceled = () => {
        // this.props.history.replace('/customers');
        this.setState({redirect: true});
    };
    
    render(){
        // console.log("Props: ", this.props);
        const {newCustomerForm} = this.state;
        const formInputs = [];

        for (let key in newCustomerForm) {
            formInputs.push(
                <Input 
                    key={key}
                    elementType={newCustomerForm[key].elementType}
                    elementConfig={newCustomerForm[key].elementConfig}
                    value={newCustomerForm[key].value}
                    changed={(e) => this.inputChangeHandler(e, key)}
                    invalid={!newCustomerForm[key].valid}
                    shouldValidate={newCustomerForm[key].validation}
                    touched={newCustomerForm[key].touched}
                />
            );
        }

        const form = (
            <form className={classes.Form} onSubmit={this.formSubmissionHandler}>
                {formInputs}
                <div className={classes.FormButtons}>
                    <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Add</Button>
                </div>
            </form>
        );

        const redirectAfterSubmit = this.state.redirect ? <Redirect to="/customers"/> : null;

        return (
            <div className={classes.NewCustomer}>
                {redirectAfterSubmit}
                <div className={classes.FormLabel}>{this.props.label}</div>
                {form}
            </div>
        );
    }
}

export default NewCustomer;