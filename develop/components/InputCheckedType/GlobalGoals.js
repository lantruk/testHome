import {PropTypes, Component} from 'react';
import classnames from 'classnames';
import Check from '../../lib/checkedType/surroundedCheck.js'
//import { goals } from 'identifiers';
import '../../lib/checkedType/surroundedCheck.scss'


//const { MAINTAINWEIGHT, GAINWEIGHT, LOSEWEIGHT } = goals;
import { MAINTAINWEIGHT, GAINWEIGHT, LOSEWEIGHT } from '../../constants'

class GlobalGoals extends Component {

    static propTypes = {
        checked: PropTypes.oneOf([1, 2, 3]).isRequired,//Поддерживать, Сбросить, Набрать
        onChange: PropTypes.func.isRequired
    }

    setGlobalGoal = (gender) => {
        this.props.onChange(gender)
    }

    render() {
        const { checked } = this.props;



        return (
            <div className="goalsGlobalCheckedBox">
                <Check title={"Поддерживать вес"}
                       sign={"Потребленные калории равны сожженным"}
                       onClick={this.setGlobalGoal.bind(this, MAINTAINWEIGHT)}
                       checked={checked == MAINTAINWEIGHT || false}/>

                <Check title={"Сбросить вес"}
                       sign={"Потребленные калории меньше сожженных"}
                       onClick={this.setGlobalGoal.bind(this, LOSEWEIGHT)}
                       checked={checked == LOSEWEIGHT || false}/>

                <Check title={"Набрать вес"}
                       sign={"Потребленные калории больше сожженным"}
                       onClick={this.setGlobalGoal.bind(this, GAINWEIGHT)}
                       checked={checked == GAINWEIGHT || false}/>
            </div>
        )

    }

}

export default GlobalGoals;


