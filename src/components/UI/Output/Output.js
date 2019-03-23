import React from 'react';

import classes from './Output.css';

const oputput = (props) => {
    let displayValues = null;

    if(props.values.length > 1) {
        displayValues = props.values.map(value => {
            // console.log('Value: ', value);
            return <div key={value.key}>{value.key.charAt(0).toUpperCase() + value.key.slice(1)}: {value.value}</div>
        });
    } else {
        displayValues = props.values.map(value => {
            return <div key={value.key}>{value.value}</div>
        });
    }
    
    return (
        <div className={classes.Output}>
            <div className={classes.Row}>
                <div className={classes.Label}>{props.label}</div>
                <div className={classes.Values}>
                    {displayValues}
                </div>
            </div>
        </div>
    );
}

export default oputput;