import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/style.css';

class LifeBars extends Component {
    render() {
        return (
            <div>
                <progress id="health1" 
                    className="healthBar1"
                    value={this.props.totalHealth1}
                    max="6"></progress>
                <progress id="health2" 
                    className="healthBar2"
                    value={this.props.totalHealth2}
                    max="100"></progress>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalHealth1: state.animation.totalHealth1,
        totalHealth2: state.animation.totalHealth2,
    }
}

export default connect(mapStateToProps)(LifeBars);