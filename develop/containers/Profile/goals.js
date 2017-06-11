import React from 'react'
import {connect} from 'react-redux'
import { BalanceIcon, StepIcon, DistanseIcon, SleepIcon, WeightIcon, WaterIcon, PresureIcon, PulseIcon, GlucoseIcon } from 'components/icons/metric_icons';
import Refresh_icon from 'components/icons/refresh_metric_icon.js';
import GlobalGoalsInputs from 'components/InputCheckedType/GlobalGoals.js';
import SaveButton from 'components/Buttons/profile_save_button';
import RecomendedGoalsConfirming from 'components/recomendedGoalsConfirming';
import {PRIVACY} from '../../constants'
//import { goals } from 'identifiers';
//import saveGoals from 'middlewares/saveGoals.js';
import SelectType  from '../../lib/selectType/selectType_medcart';
import { GOAL_STEPS, GOAL_DISTANCES, GOAL_SLEEPS, GOAL_WEIGHTS, GOAL_WATERS } from './sources.js';
import { checkDistGoal } from './verifications.js';
import { goalsVerify } from './totalVerify.js';
import {getStepLenght} from '../../utils'


import { MAINTAINWEIGHT, GAINWEIGHT, LOSEWEIGHT, GLOBAL, STEPS, DISTANCE, SLEEP, WATER, WEIGHT } from '../../constants'


class Goals extends React.Component {

    static propTypes = {
        model: React.PropTypes.object.isRequired,
        isUnfilled: React.PropTypes.bool,
        goNext: React.PropTypes.func,
        onSaveMessage: React.PropTypes.func,
        toggleLoader: React.PropTypes.func
    }

    constructor(props) {
        super()


        const stepLenght = getStepLenght(props.model.height, props.model.gender)
        this.distSource = GOAL_DISTANCES(stepLenght)


        //const { global, steps, distance, sleep, weight, water } = this.getParsedGoals();
        this.state = this.getParsedGoals(props.model)

    }

    componentWillUnmount(){
      /*  this.xhr = undefined

        clearTimeout(this.mesTimer)*/
    }


    getParsedGoals(model) {
        //По существующей логике попадая в медкарту медкарта уже прошла верификацию
        const goals = model.user_goals;
        const weight = model.weight;
        const height = model.height;
        const gender = model.gender;

        let state = {};


        goals.forEach((g)=> {
            switch (g.goals_type_id) {
                case -1:
                    state[GLOBAL] = g.goal
                    break;
                case 1:
                    state[STEPS] = g.goal
                    break;
                case 2:
                    state[SLEEP] = g.goal
                    break;
                case 4:
                    state[WATER] = g.goal
                    break;
                case 5:
                    state[WEIGHT] = g.goal
                    break;
            }

        })


        const verify = goalsVerify({
            [GLOBAL]: state[GLOBAL],
            [STEPS]: state[STEPS],
            [SLEEP]: state[SLEEP],
            [WEIGHT]: state[WEIGHT],
            [WATER]: state[WATER],
            userWeight: weight,
            height, gender
        });

        return {
            [GLOBAL]: verify.global.formated,
            [STEPS]: verify.steps.formated,
            [DISTANCE]: verify.dist.formated,
            [SLEEP]: verify.sleep.formated,
            [WATER]: verify.water.formated,
            [WEIGHT]: verify.weightGoal.formated,
            goalsConfirming: false
        }

    }

    showRecomendedConfirming = () => {
        this.setState({goalsConfirming: true})
    }

    closeRecomendedConfirming = () => {
        this.setState({goalsConfirming: false})
    }


    setRecomendedGoals = () => {
        const model = this.props.model;
        const weight = model.weight;
        const height = model.height;
        const gender = model.gender;

        const verify = goalsVerify({height, userWeight: weight, gender});

        this.setState({
            [GLOBAL]: verify.global.formated,
            [STEPS]: verify.steps.formated,
            [DISTANCE]: verify.dist.formated,
            [SLEEP]: verify.sleep.formated,
            [WATER]: verify.water.formated,
            [WEIGHT]: verify.weightGoal.formated,
            goalsConfirming: false
        })

    }

    setGoal = key => val => {
        let state;

        if (key === STEPS) {
            state = this.getDistanceFromSteps(val)
        } else if (key === DISTANCE) {
            state = this.getStepsFromDist(val)
        } else {
            state = {[key]: val}
        }


        this.setState(state)
    }

    getDistanceFromSteps(steps){
        const model = this.props.model;

        const height = model.height;
        const gender = model.gender;

        const dist = checkDistGoal(steps, height, gender)

        return {
            [STEPS]: steps,
            [DISTANCE]: dist.formated
        }

    }

    getStepsFromDist(dist){
        const model = this.props.model;
        const height = model.height;
        const gender = model.gender;

        const stepLenght = getStepLenght(height, gender);


        const steps = Math.round(dist / stepLenght / 100) * 100;

        return {
            [DISTANCE]: dist,
            [STEPS]: steps
        }


    }


    verifyAndSave = () => {

        const callback = this.props.isUnfilled ? this.props.goNext : (...arg)=> {
            this.props.onSaveMessage(...arg)
        };
    console.log('сохранили -----------',)
        this.props.goNextRedux(PRIVACY)
       // saveGoals.call(this, callback)
    }

    render() {
        const {global, steps, distance, sleep, weight, water, goalsConfirming} = this.state;

        const isUnfilled = this.props.isUnfilled;

        return (
            <section className={"profileContentContainer" + (isUnfilled ? ' __unfilled' : '')}>
                <div className="goalsPointsWrap">
                    <article className="goalsGlobal">
                        <div className="goalsGoalRow">
                            <div className="goalsGoalRow--Image"><BalanceIcon /></div>
                            <div className="goalsGoalRow--Text">Глобальная цель</div>
                            <div className="goalsGoalRow--Input"></div>
                        </div>
                        <GlobalGoalsInputs checked={global} onChange={this.setGoal(GLOBAL)}/>
                    </article>
                    <article className="goalsMetrics">
                        <div className="goalsMetricsColumn">
                            <div className="goalsGoalRow">
                                <div className="goalsGoalRow--Image"><StepIcon /></div>
                                <div className="goalsGoalRow--Text">Шаги (количество)</div>
                                <div className="goalsGoalRow--Input">
                                    <SelectType onChange={this.setGoal(STEPS)} scroll source={GOAL_STEPS} value={steps}/>
                                </div>
                            </div>
                            <div className="goalsGoalRow">
                                <div className="goalsGoalRow--Image"><DistanseIcon /></div>
                                <div className="goalsGoalRow--Text">Дистанция (км)</div>
                                <div className="goalsGoalRow--Input">
                                    <SelectType onChange={this.setGoal(DISTANCE)} scroll source={this.distSource} value={distance}/>
                                </div>
                            </div>
                            <div className="goalsGoalRow">
                                <div className="goalsGoalRow--Image"><SleepIcon /></div>
                                <div className="goalsGoalRow--Text">Сон (чч:мм)</div>
                                <div className="goalsGoalRow--Input">
                                    <SelectType onChange={this.setGoal(SLEEP)} scroll source={GOAL_SLEEPS} value={sleep}/>
                                </div>
                            </div>
                            <div className="goalsGoalRow">
                                <div className="goalsGoalRow--Image"><WeightIcon /></div>
                                <div className="goalsGoalRow--Text">Вес (кг)</div>
                                <div className="goalsGoalRow--Input">
                                    <SelectType onChange={this.setGoal(WEIGHT)} scroll source={GOAL_WEIGHTS} value={weight}/>
                                </div>
                            </div>
                        </div>
                        <div className="goalsMetricsColumn">
                            <div className="goalsGoalRow">
                                <div className="goalsGoalRow--Image"><WaterIcon /></div>
                                <div className="goalsGoalRow--Text">Вода (л)</div>
                                <div className="goalsGoalRow--Input">
                                    <SelectType onChange={this.setGoal(WATER)} scroll source={GOAL_WATERS} value={water}/>
                                </div>
                            </div>
                            <div className="goalsGoalRow goalsGoalRow__disabled">
                                <div className="goalsGoalRow--Image"><PresureIcon disabled/></div>
                                <div className="goalsGoalRow--Text">Давление (мм рт.ст.)</div>
                                <div className="goalsGoalRow--Input"><input disabled defaultValue=""/></div>
                            </div>
                            <div className="goalsGoalRow goalsGoalRow__disabled">
                                <div className="goalsGoalRow--Image"><PulseIcon disabled/></div>
                                <div className="goalsGoalRow--Text">Пульс (ударов/мин.)</div>
                                <div className="goalsGoalRow--Input"><input disabled defaultValue=""/></div>
                            </div>
                            <div className="goalsGoalRow goalsGoalRow__disabled">
                                <div className="goalsGoalRow--Image"><GlucoseIcon disabled/></div>
                                <div className="goalsGoalRow--Text">Глюкоза (ммоль/л)</div>
                                <div className="goalsGoalRow--Input"><input disabled defaultValue=""/></div>
                            </div>
                        </div>
                    </article>
                    <div className="returnRecommended">
                        <Refresh_icon onClick={this.showRecomendedConfirming}/>
                        <div className="returnRecommended--text">Вернуть рекомендуемые значения</div>
                    </div>
                </div>
                <div className="profileSaveButtonWrap">
                    <SaveButton onClick={this.verifyAndSave} next={isUnfilled}/>
                </div>
                <RecomendedGoalsConfirming active={goalsConfirming} onSave={this.setRecomendedGoals} onClose={this.closeRecomendedConfirming} />
            </section>
        )
    }


}
export default connect(state => ({
    model: state.profile.toJS(),
    isUnfilled: state.profile.getIn(['profileVerify', 'isMistake']),
   // duplicate_socialaccount: state.profile.get('duplicate_socialaccount').toJS(),
    social_accounts: state.profile.get('social_accounts').toJS()
}),{

})(Goals)

