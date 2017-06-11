import React, {Component, PropTypes} from 'react'
import './mytrak.scss'
import {DIARY__ROUTE} from '../../constants'
import {connect} from 'react-redux'
import smoothOpacity from '../../decorators/smoothOpacity.js'
import CategoryChanger from 'components/categoryChanger';
import DayPicker from 'components/DayPicker/index.js';
import {getISODate} from 'utils'
import {stoploader, changeMyDay} from '../../AC/others'
import {pushPressure, loadPressure} from '../../AC/pressure'
import {
    loadDashboardDiaryData,
    loadConsumedFood
} from '../../AC/diaryData'


class MytrakContainer extends Component {

    static propTypes = {
        profile: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        pushPressure: PropTypes.func.isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {

    }

    changeDiaryCategory = (widget) => (selectType) => {

        this.context.router.push(DIARY__ROUTE + selectType)
    }

    onChangeDay = (newdate) => {
        this.props.changeMyDay(newdate)

        /*
         * для давления. Если в роутере 'pressure' меняя дату, тянем еще не достающих 2-е api(в ином случае тянем 1-о api нового дня)
         * */
        if (this.context.router.routes[2] == 'pressure') {
            this.props.pushPressure(newdate, this.props.pressures)
        } else {
            if (!this.props.pressures.some((day) => {
                    return day.date == getISODate(newdate)
                })) {
                this.props.loadPressure(newdate)
            }

        }


        if (!this.props.water.some((day) => {
                return day.date == getISODate(newdate)
            })) {
            this.props.loadDashboardDiaryData(newdate)
            this.props.loadConsumedFood(newdate)
        }


    }

    render() {
        const {isLoading, first_name, last_name} = this.props.profile;

        return (
            <div>
                {!isLoading ? '...LOADING' :
                    <div className="mytrakSubHeader">
                        <div className="mytrakSubHeader--content">
                            <div className="mytrakSubHeader--diaryCategoriesChanger">
                                {this.context.router.routes[2].path ?
                                    <CategoryChanger onChange={this.changeDiaryCategory()}
                                                     value={this.context.router.routes[2].path}/> : null}
                            </div>
                            <div className="mytrakSubHeader--dateChanger">
                                <DayPicker day={this.props.date} onChangeDay={this.onChangeDay.bind(this)}/>
                            </div>
                        </div>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }

}

const DecoratedOpacity = smoothOpacity(MytrakContainer)

export default connect(state => ({
    date: state.others.get('date'),
    profile: state.profile.toJS(),
    pressures: state.pressure.get('data').toJS(),
    water: state.water.toJS()
}), {
    stoploader,
    changeMyDay,
    pushPressure,
    loadPressure,
    loadDashboardDiaryData,
    loadConsumedFood
})(DecoratedOpacity)


