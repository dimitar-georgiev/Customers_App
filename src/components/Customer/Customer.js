import React, {Component} from 'react';

import classes from './Customer.css';

import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import data from '../../../customers.json';
import Button from '../UI/Button/Button';
import NewCustomer from '../../containers/Customers/NewCustomer/NewCustomer';
import Aux from '../../hoc/Auxs/Auxs';
import Output from '../UI/Output/Output';
import customerPictutre from '../../assets/images/john-doe.jpg';

class Customer extends Component {
    state = {
        edit: false,
        customer: null
    }

    componentDidMount(){
        //request to DB
        const customer = data.filter(customer => {
            return customer.id.toString() === this.props.match.params.id
        })[0];

        this.setState({customer});
    }

    editHandler = () => {
        this.setState({edit: true});
    };

    cancelHandler = () => {
        this.setState({edit: false});
    };

    deleteHandler = () => {
        console.log('Delete: ', this.props.match.params.id);
    };

    render(){
        // console.log('Props: ', this.props);
        // console.log('Customer: ', this.state.customer);
        // console.log('State: ', this.state);

        let display = null;
        
        if (this.state.customer) {
            const {first_name, last_name, email, ip, longitude, latitude, created_at} = this.state.customer;

            const created =  moment(created_at).format('MMM Do, YYYY');

            const outputValues = [
                {
                    label: <FontAwesomeIcon icon="envelope"/>,
                    values: [
                        {key: 'email', value: email}
                    ]
                },
                {
                    label: <FontAwesomeIcon icon="globe" />,
                    values: [
                        {key: 'longitude', value: longitude},
                        {key: 'latitude', value: latitude}
                    ]
                },
                {
                    label: <FontAwesomeIcon icon="map-marker-alt"/>,
                    values: [
                        {key: 'ip', value: ip}
                    ]
                }
            ];

            const output = outputValues.map(value => {
                return (
                    <Output key={value.values[0].key} label={value.label} values={value.values}/>
                );
            });

            display = (
                <Aux>
                    <div className={classes.InfoUpper}>
                        <div style={{width: '100px', height: '100px', borderBottom: '2px solid #ccc'}}></div>
                        <div className={classes.CustomerPicture}>
                            <img src={customerPictutre} alt="Profile Picture"/>
                        </div>
                        <div className={classes.Container}>
                            <div className={classes.Name}>
                                <span>{first_name} {last_name}</span>
                            </div>
                            <div className={classes.Created}>
                                <div className={classes.Row}>
                                    <div><b>Created:</b></div>
                                    <div>{created}</div>
                                </div>
                                <div className={classes.Row}>
                                    <div><b>Last Update:</b></div>
                                    <div>{created}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {output}
                    
                    <div className={classes.Controls}>
                        <Button btnType="Danger" clicked={this.deleteHandler}>Delete</Button>
                        <Button btnType="Success" clicked={this.editHandler}>Edit</Button>
                    </div>
                </Aux>
            );
        }
        
        if (this.state.edit) {
            display = <NewCustomer customer={this.state.customer} label="Edit Customer" cancel={this.cancelHandler}/>
        }

        return (
            <div className={classes.Customer}>
                {display}
            </div>
        );
    }
}

export default Customer;