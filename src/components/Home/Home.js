import React from 'react';

import classes from './Home.css';

const home = (props) => (
        <div className={classes.Home}>
            <p>Hello,</p>
            <p>The present application is my solution to the JS Engineering and UI/UX design challegens. It is by no means perfect, 
                but instead - it is intended to demonstarte the fundamentals of React, React Router and Webpack. 
                It covers:
            </p>
            <ul>
                <li>Higher-Order Components</li>
                <li>JSX</li>
                <li>Spread Attributes</li>
                <li>Asynchronous nature of setState()</li>
                <li>Lifting State Up</li>
                <li>Conditional Rendering of Components</li>
                <li>Controlled Components</li>
                <li>Form initialization with Controlled Components</li>
                <li>Form Validation</li>
                <li>Redirection</li>
                <li>Infinite Scroll</li>
                <li>Webpack Asset Management - loading CSS, images and data</li>
            </ul>
            <p>
                I would love to answer any question you might have with regards to this application.
            </p>
            <p>
                Thank you for the consideration.
            </p>
            <div>
                Best Regards
            </div>
            <div>
                Dimitar Georgiev
            </div>
        </div>
    );

export default home;