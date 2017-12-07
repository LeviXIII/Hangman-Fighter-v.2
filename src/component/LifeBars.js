import React, { Component } from 'react';

import '../styles/style.css';

class LifeBars extends Component {
    render() {
        return (
            <div>
                <progress id="health1" 
                    className="healthBar1"
                    value={this.props.gameState.totalHealth1}
                    max="6"></progress>
                <progress id="health2" 
                    className="healthBar2"
                    value={this.props.gameState.totalHealth2}
                    max="100"></progress>
            </div>
        )
    }
}

export default LifeBars;