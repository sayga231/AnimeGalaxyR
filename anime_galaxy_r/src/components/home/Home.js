import React from 'react';
import CardLayout from "../CardLayout";
import Carousel from "../Carousel";

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1 className="title"><span><i className="fas fa-newspaper"/>  Episódios:</span></h1>
                <CardLayout/>
                <h1 className="title"><span><i className="fas fa-newspaper"/>  Últimos Animes:</span></h1>
                <Carousel/>
            </div>
        );
    }

};