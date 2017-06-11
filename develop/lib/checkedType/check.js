import {PropTypes, Component} from 'react';
import classnames from 'classnames';


function Check(props){
    const { checked, theme } = props;

    return  <div className={classnames({[theme.checkedType]: theme.checkedType}, {[theme.check]: theme.check}, {[theme.checked] : checked})}></div>
}

Check.propTypes = {
    checked: PropTypes.bool.isRequired,
    theme: PropTypes.shape({
        checkedType: PropTypes.string,
        checked: PropTypes.string
    }).isRequired
}

export default Check
