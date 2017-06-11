import React, { Component, PropTypes } from 'react'
import './decoratedOpacity.scss'


export default (Component) => class SmoothOpacity extends Component {

    componentDidMount(){
        //Делаем асинхронно чтобы вызвалось после вставки корневого узла в дом
        setTimeout(()=>{
            this.refs.component.classList.remove('decoratedOpacity__opacity0')
        },0)
    }


    render(){

        return <div className="decoratedOpacity decoratedOpacity__opacity0" ref="component"><Component  {...this.props} /></div>
    }

}


