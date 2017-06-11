import React, { Component, PropTypes } from 'react'


class NotFoundSection extends Component {

    static propTypes = {

    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentDidMount(){

        this.context.router.replace('/')
    }

    render(){

        return <div>Страница не найдена</div>
    }

}

export default NotFoundSection
