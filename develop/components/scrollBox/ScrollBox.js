import React from 'react';
import {GenericScrollBox} from './GenericScrollBox';
import './scrollbox.scss'

export default class ScrollBox extends React.Component {

    addClass = () => {
       this.refs.scrollbox__dragged.classList.add('scroll-box__dragged')
    }

    remuveClass = () => {
        this.refs.scrollbox__dragged.classList.remove('scroll-box__dragged')
    }

  render() {
         
    return (
      <GenericScrollBox  {...this.props}>
        <div onMouseDown={this.addClass} onMouseUp={this.remuveClass} ref='scrollbox__dragged' className="scroll-box__viewport">
          {this.props.children}
        </div>
      </GenericScrollBox>
    );
  }
}

//http://smikhalevski.github.io/react-scroll-box/
