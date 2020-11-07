import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Track.css';

class Track extends React.Component{
    renderAction(){
        let isRemoval = false;

        if(!isRemoval){
            return <button className="Track-action">+</button>
        } else {
            <button className="Track-action">-</button>
        }
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>Test</h3>
                    <p>Artist | Album</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;