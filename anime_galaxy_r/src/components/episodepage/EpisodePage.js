import React from 'react';

import "./episodepage.sass";

import axios from 'axios';
import ReactJWPlayer from 'react-jw-player';
import EpisodeList from "./EpisodeList";
import EpisodeOptions from "./EpisodeOptions";

export default class EpisodePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            episode: null,
            id: null,
            has_player: false
        };
        this.getEpisode();
        console.log("Start ------------------------------");
    }

    getEpisode() {
        axios.get(`${process.env.REACT_APP_API_URL}/videos/${this.props.match.params.id}`).then(res => {
            this.setState({episode: res.data, id: res.data.id});
        });
    }

    getEpisodeInfo() {
        console.log(`${process.env.REACT_APP_API_URL}/videos/${this.props.match.params.id}`);
        axios.get(`${process.env.REACT_APP_API_URL}/videos/${this.props.match.params.id}`).then(res => {
            this.setState({episode: res.data});
            console.log(res.data);
            console.log("Getting episode info");
        });
    }

    removePlayer = () => {
        if (this.state.has_player) {
            console.log("Video Removed");
            window.jwplayer("player-container").remove();
        }
    };

    componentWillUnmount() {
        this.removePlayer();
    }

    render() {
        if (this.state.episode !== null) {
            return (
                <div className="episode-page">
                    <div className="spacer"/>
                    <div className="player-episodes-container">
                        <div className="player-misc-wrapper">
                            <div className="player-desc-wrapper">
                                <ReactJWPlayer playerId={`player-container`} playerScript="https://cdn.jwplayer.com/libraries/7OxfLofq.js" playlist={`${process.env.REACT_APP_API_URL}/playlist/${this.state.episode.id}`}
                                               onReady={
                                                   event => {
                                                       this.setState({has_player: true});
                                                   }
                                               }
                                               onVideoLoad={
                                                   event => {
                                                       if (parseInt(event.item.id) !== parseInt(this.props.match.params.id)) {
                                                           this.props.history.push(`/v/${event.item.id}`);
                                                           this.getEpisodeInfo();
                                                       }
                                                       this.setState({is_loaded: true});
                                                   }
                                               }
                                               onError={
                                                   event => {
                                                       if (event.code === 224003) {
                                                           if (localStorage.getItem("jwplayer.qualityLabel") === "HD") {
                                                               localStorage.setItem("jwplayer.qualityLabel", "SD");
                                                           } else if (localStorage.getItem("jwplayer.qualityLabel") === "SD") {
                                                               localStorage.setItem("jwplayer.qualityLabel", "HD");
                                                           } else {
                                                               localStorage.setItem("jwplayer.qualityLabel", "SD");
                                                           }
                                                       }
                                                   }
                                               }
                                />
                                <EpisodeOptions episode={this.state.episode}/>
                            </div>
                        </div>
                        <div className="episode-list-container">
                            {/*<EpisodeList/>*/}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Wait a second
                </div>
            );
        }
    }

}