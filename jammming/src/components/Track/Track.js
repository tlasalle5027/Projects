import React from 'react';
import './Track.css';

class Track extends React.Component{    

    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    renderAction(){
        let isRemoval = this.props.isRemoval;        

        if(isRemoval){
            return <button className="Track-action"
                    onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action"
                    onClick={this.addTrack}>+</button>
        }

    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <br></br>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <br></br>
                    <p><strong>Sample:</strong></p>
                    <br></br>
                    <audio src={this.props.track.sample} controls>Audio not supported</audio>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;