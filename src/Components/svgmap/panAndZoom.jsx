import React from 'react';

export default class PanAndZoom extends React.Component {

    state = {
      scale: this.props.scale,
      xOffset: this.props.xOffset,
      yOffset: this.props.yOffset,
      dragging: false,
      clientX:0,
      clientY:0,
      targX:0,
      targY:0,
    }

    scaleIncrease = () => {
      this.setState({scale: this.state.scale+0.25})
    }

    scaleDecrease = () => {
      this.setState({scale: this.state.scale-0.25})
    }

    mouseMoveHandle = (e) => {
      if (this.state.dragging){
        const x = this.state.targX + e.clientX - this.state.clientX;
        const y = this.state.targY + e.clientY - this.state.clientY;
        this.setState({xOffset: x, yOffset: y})
      }
    }

    startDragging = (e) => {
      this.setState({dragging: true})
      this.setState({clientX:e.clientX, clientY:e.clientY})
      this.setState({targX:this.state.xOffset, targY:this.state.yOffset})
    }

    endDragging = (e) => {
      this.setState({dragging: false})
    }

    render() {
      return (
        <div className="panAndZoom">
          <div className="panAndZoom-wrapper" onMouseMove={this.mouseMoveHandle} onMouseDown={this.startDragging} onMouseUp={this.endDragging}>
          	<div className="panAndZoom-content" style={{left:this.state.xOffset+"px", top:this.state.yOffset+"px", transform: 'scale('+this.state.scale+')', transformOrigin:'50% 50%'}}>
            		{this.props.children}
            	</div>
          </div>
          <div className="panAndZoom-nav">
            <button className="panAndZoom-button panAndZoom-button_incr" onClick={this.scaleIncrease}>+</button>
            <button className="panAndZoom-button panAndZoom-button_decr" onClick={this.scaleDecrease}>-</button>
          </div>
        </div>
      )
    }
}

PanAndZoom.defaultProps = {
  scale:2.75,
  xOffset:-22,
  yOffset:41
};
