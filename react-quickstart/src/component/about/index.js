import React, { Component } from 'react';

const arr = [
    <h1>hello world!</h1>,
    <h2>REact is awesome</h2>
];


class About extends Component {
    render() {
        return (
            <div>{arr}</div>
        );
    }
}

export default About;
