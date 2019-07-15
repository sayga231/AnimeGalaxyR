import React from 'react';
import ReactJWPlayer from 'react-jw-player';

import "./episodepage.sass";

export default class EpisodePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            episode: null
        };
    }

    getPlaylist = () => {

    };

    render() {
        return (
            <div className="episode-page">
                <div className="gradient-container">
                    <div className="spacer"/>
                    <div className="breakpoint-container">
                        <div className="player-container">
                            {
                                this.state.episode === null ?
                                    <ReactJWPlayer playerId={"episode-player"} className="player" playerScript="https://cdn.jwplayer.com/libraries/7OxfLofq.js" aspectRatio={"16:9"} playlist={`${process.env.REACT_APP_API_URL}/episode/playlist/${this.props.match.params.id}`}/>
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="spacer"/>
                </div>
            </div>
        );
    }

};