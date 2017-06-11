import React from 'react'
import './loader.scss'


//!!!Пришлось отключить гугловский лоад ибо dash анимация не работает в IE

class Loader extends React.Component {

   /* static propTypes = {
        multicolor: React.PropTypes.bool,
        active: React.PropTypes.bool,
        theme: React.PropTypes.shape({
            circle: React.PropTypes.string,
            circular: React.PropTypes.string,
            path: React.PropTypes.string,

        })
    }*/

    render() {
        return (<div className="circularLoader circularLoader__center"></div>)
    }
}

export default Loader;

