import React from 'react';

import CardLayout from "./../CardLayout";
import {OldCarousel} from "./OldCarousel";
import RequestUtilities from "../../util/RequestUtilities";

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latest_episodes: [],
            latest_anime: [],
            watched_anime: []
        };
        // this.getLatestEpisodes();
        // this.getLatestAnime();
        // this.getWatchedAnime();
        console.log("HEy");
    }

    getLatestEpisodes() {
        // console.log(`${process.env.REACT_APP_API_URL}/episodes`);
        RequestUtilities.sendGetRequest("episode/latest", false).then(res => {
            this.setState({
                latest_episodes: res.data
            });
        }).catch(res => {
            console.log("Error getting the latest episodes");
            setTimeout(() => this.getLatestEpisodes(), 5000);
        });
    }

    getLatestAnime() {
        RequestUtilities.sendGetRequest("anime/latest", false).then(res => {
            this.setState({
                latest_anime: res.data
            });
        }).catch(res => {
            console.log("Error getting the latest anime");
            setTimeout(() => this.getLatestAnime(), 5000);
        });
    }

    getWatchedAnime() {
        RequestUtilities.sendGetRequest("anime/watched", true).then(res => {
            this.setState({
                watched_anime: res.data
            });
        }).catch(res => {
            console.log("Error getting the watched anime");
            setTimeout(() => this.getWatchedAnime(), 5000);
        });
    }

    // componentDidMount() {
    //     this.getLatestEpisodes();
    //     this.getLatestAnime();
    //     this.getWatchedAnime();
    // }

    render() {
        // return (
        //     <div className="breakpoint-container">
        //         <h1 className="title"><span><i className="fas fa-newspaper"/>  Episódios:</span></h1>
        //         <CardLayout card_type={"LatestEpisodeCard"} items={this.state.latest_episodes}/>
        //         <h1 className="title"><span><i className="fas fa-newspaper"/>  Últimos Animes:</span></h1>
        //         <OldCarousel item_type="CarouselItem" items={this.state.latest_anime}/>
        //         <h1 className="title"><span><i className="fas fa-newspaper"/>  Assistidos No Momento:</span></h1>
        //         <OldCarousel item_type="CarouselItemEpisode" items={this.state.watched_anime}/>
        //     </div>
        // );
        return (
            <div>

                <div className="border-bottom-red"/>
                <div className="gradient-container">
                    <div className="breakpoint-container">
                        <h2 className="bg-title">
                            <div className="pless-title">
                                <span>Últimos Episódios</span>
                            </div>
                        </h2>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                    </div>
                </div>
                <div className="border-bottom-red"/>
                <div className="gradient-container">
                    <div className="breakpoint-container">
                        <h2 className="bg-title">
                            <div className="pless-title">
                                <span>Últimos Animes</span>
                            </div>
                        </h2>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                        <div className="spacer"/>
                    </div>
                </div>
            </div>
        );
    }

};