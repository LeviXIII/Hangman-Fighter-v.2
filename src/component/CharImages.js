import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Sound from 'react-sound';

import RyuHit from '../images/Ryu-hit.gif';
import KenHit from '../images/Ken-hit.gif';
import RyuKick from '../images/Ryu-kick.gif';
import KenFireball from '../images/Ken-hadouken.jpg';
import RyuFall from '../images/Ryu-fall.gif';
import KenFall from '../images/Ken-fall.gif';
import IdleKen from '../images/Ken-idle.webp';
import IdleRyu from '../images/Ryu-idle.gif';
import Fireball from '../images/hadouken.gif';

import KenHadoukenSound from '../audio/Ken-hadouken-sound.mp3';
import RyuKickSound from '../audio/Ryu-hurricane-sound.mp3';

import '../styles/style.css';


class CharImages extends Component {
    render() {
        let ken;
        let ryu;
        let fireballStyle = hideFireball;
        
        if (this.props.gameState.kenHit) {
            setTimeout(() => {
                ken = IdleKen;
                ryu = IdleRyu;
                this.props.resetAnimations();
            }, 1700);
            ken = KenHit;
            ryu = RyuKick;
        }
        else if (this.props.gameState.ryuHit) {
            setTimeout(() => {
                ken = IdleKen;
                ryu = IdleRyu;
                this.props.resetAnimations();
            }, 1000);
            ken = KenFireball;
            ryu = RyuHit;
            fireballStyle = seeFireball;
        }
        else if (this.props.gameState.totalHealth1 === 0) {
            ken = KenFall;
            ryu = IdleRyu;
        }
        else if (this.props.gameState.totalHealth2 === 0) {
            ken = IdleKen;
            ryu = RyuFall;
        }
        else {
            ken = IdleKen;
            ryu = IdleRyu;
        }

        return (
            <div>
                <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                    <img    key={Fireball} className="fireball"
                            style={fireballStyle} src={Fireball} />    
                </ReactCSSTransitionGroup>
                
                {this.props.gameState.ryuHit && <Sound
                    url={KenHadoukenSound}
                    playStatus={Sound.status.PLAYING}
                    loop={false}
                />}
                {this.props.gameState.kenHit && <Sound
                    url={RyuKickSound}
                    playStatus={Sound.status.PLAYING}
                    loop={false}
                />}
                <img key={ken} className="kenIdle" src={ken} />
                <img key={ryu} className="ryuIdle" src={ryu} />
            </div>
        )
    }
}

//Styles to make fireball appear when attacking.
const seeFireball = {
    cdisplay: 'inline-block',
    visibility: 'visible',
    marginTop: '10%',
};

const hideFireball = {
    cdisplay: 'inline-block',
    visibility: 'hidden',
    marginTop: '10%',
};

export default CharImages;