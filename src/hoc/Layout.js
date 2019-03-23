import React from 'react';

import classes from './Layout.css';

import Aux from './Auxs/Auxs';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={classes.Layout}>
            {props.children}
        </main>
    </Aux>
);

export default layout;