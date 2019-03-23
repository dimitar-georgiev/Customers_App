import React from 'react';

import classes from './SearchResult.css';

import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const searchResult = (props) => {
    return (
        <div className={classes.SearchResult} onClick={props.edit}>
            <div className={classes.SearchResultContainer}>
                <div className={classes.Name}>{props.first_name} {props.last_name}</div>
                <div className={classes.SmallFont}>Created: {moment(props.created_at).format('MMM Do, YYYY')}</div>
                <div className={classes.SmallFont}>Updated: </div>
            </div>
            
            <div className={classes.SearchResultContainer}>
                <div style={{display: 'flex'}}>
                    <div><FontAwesomeIcon icon="envelope"/></div>
                    <div style={{paddingLeft: '10px', boxSizing: 'border-box'}}>{props.email}</div>
                </div>
                <div style={{display: 'flex', margin: '5px 0'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FontAwesomeIcon icon="globe" />
                    </div>
                    <div>
                        <div style={{paddingLeft: '10px', boxSizing: 'border-box'}}>Longitude: {props.longitude}</div>
                        <div style={{paddingLeft: '10px', boxSizing: 'border-box'}}>Latitude: {props.latitude}</div>
                    </div>    
                </div>
                <div style={{display: 'flex'}}>
                    <div>
                        <FontAwesomeIcon icon="map-marker-alt"/>
                    </div>
                    <div style={{paddingLeft: '10px', boxSizing: 'border-box'}}>{props.ip}</div>
                </div>
                
            </div>
        </div>
    );
};

export default searchResult;