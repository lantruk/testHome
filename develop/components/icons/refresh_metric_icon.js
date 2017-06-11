import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import Ink from 'react-ink'
import './refresh_metric_icon.scss'


class Refresh_icon extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        theme: PropTypes.shape({
            icon: PropTypes.string
        })
    }

    onClick = (e) => {
        this.props.onClick && this.props.onClick(e)
    }

    render() {
       //const { theme } = this.props;

        return (
            <div onClick={this.onClick} className='refresh_metric_icon__icon'>
                <Ink radius={1000}/>
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20zm0-1.2c10.383 0 18.8-8.417 18.8-18.8C38.8 9.617 30.383 1.2 20 1.2 9.617 1.2 1.2 9.617 1.2 20c0 10.383 8.417 18.8 18.8 18.8zm10.46-17.125c.492-2.98-.332-6.156-2.52-8.585-3.68-4.09-9.875-4.56-14.07-1.154l2.888.162-.058 1.192-4.236-.237-.596-.034.03-.597.205-4.238 1.192.067-.132 2.716c4.68-3.76 11.565-3.225 15.662 1.326 2.44 2.71 3.36 6.256 2.812 9.58l-1.178-.2zM9.773 17.942c-.493 2.98.33 6.156 2.518 8.585 3.682 4.09 9.877 4.56 14.07 1.154l-2.887-.16.06-1.193 4.235.238.596.033-.03.596-.206 4.238-1.192-.067.132-2.716c-4.68 3.76-11.564 3.224-15.662-1.327-2.44-2.71-3.36-6.256-2.812-9.58l1.178.2z" fill="#4E5768" fillRule="evenodd"/>
                </svg>
            </div>
        )
    }
}


export default Refresh_icon

