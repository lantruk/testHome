import {PropTypes, Component} from 'react';
import {WaterIconsBottle, WaterIconsCup, WaterIconsCustom} from 'components/icons/waterIcons'
import ProgressBar from '../../../../lib/progress_bar'
import DotesEclips from 'components/dotesEclips'
import {formatWater} from 'utils'


const CHECKED = 'waterSvg--capacity__checked';
const SLIDES_LIST = [1, 2, 3];

class SvgWidget extends Component {

    static propTypes = {
        date: PropTypes.object.isRequired,
        consumed: PropTypes.number.isRequired,  //сколько выпили уже (водавода)
        goal: PropTypes.number.isRequired,  //наша цель выпивания
        water_sum: PropTypes.number.isRequired, //вода-еда
        saveWaterInModel: PropTypes.func.isRequired
    }

    constructor(props) {
        super()

        this.state = {
            capacityKind: SLIDES_LIST[0],
            consumed: props.consumed,
            goal: props.goal,
            water_sum: props.water_sum,
        }
        this._saveWaterModel = this._saveWaterModel.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.consumed !== nextProps.consumed || this.props.goal !== nextProps.goal || this.props.water_sum !== nextProps.water_sum) {
            this.setState({
                consumed: Math.smartRound(nextProps.consumed),
                goal: nextProps.goal,
                water_sum: nextProps.water_sum
            })
        }
    }

    setCapacity = (id, e) => {
        this.setState({capacityKind: id})
    }

    getCapacityById(id) {
        switch (id) {
            case 1:
                return 500;
            case 2:
                return 250;
            case 3:
                return 100;
        }
    }

    // если жмяк на плюсик то увеличиваем
    _increaseMeasureCount = () => {

        this.setState({
            consumed: this.state.consumed + this.getCapacityById(this.state.capacityKind)
        })
    }

    // если жмяк на минусик то уменьшаем
    _decreaseMeasureCount = () => {
        //сколько сейчас выпито воды-воды
        let thisConsumed = this.state.consumed
        //сколько выпито воды-еды
        let thisMinWater = this.state.water_sum

        //нуВАЩЕвся водавода которая только можн
        const thisAllAllWater = thisConsumed + thisMinWater
        //на каком тазу сейчас отнимаем воду и сколько сейчас отнимаем воду и все такое
        const thisCapacityKind = this.getCapacityById(this.state.capacityKind)

        //если выпипаешь из разных тар, то все равно 0!
        if (thisCapacityKind > thisConsumed) thisConsumed = thisCapacityKind

        this.setState({
            //мы должны быть уверены, что не меньше, чем 0 или сумма воды-еды
            consumed: (thisAllAllWater - thisCapacityKind <= 0 ? 0 : thisConsumed - thisCapacityKind )
        })
        //debugger
    }

    // тута будем рисовать на контейнерах воду вверх или вниз
    getTransformY(Ycoord) {
        const perc = (this.state.consumed + this.state.water_sum) * 100 / this.state.goal,
            p = perc > 100 ? 100 : perc;
        const val = Math.smartRound(p * Ycoord / 100, 2);

        return val
    }

    //сохранение воды
    _saveWaterModel() {

        setTimeout(()=> {
            const oldVal = this.props.consumed
            const newVal = this.state.consumed

            if (oldVal !== newVal) {

                this.props.saveWaterInModel(newVal, oldVal)
            }
        }, 1000)
    }

    getNextSlide = () => {
        let newCapacity = this.state.capacityKind + 1
        if (newCapacity === 4) newCapacity = 1
        this.setState({
            capacityKind: newCapacity
        })
    }

    render() {
        const {capacityKind, consumed, goal, water_sum} = this.state;
        const rest = Math.max(0, goal - (consumed + water_sum));

        //сколько еще выпить в %
        let consumedPercent = (consumed + water_sum) * 100 / goal;
        // что бы прогресс бар не вырастал больше 100%
        if (consumedPercent > 100) consumedPercent = 100;
        if (consumedPercent == 0) consumedPercent = 1;

        return (

            <div className="waterBalance">
                <div>
                    <div
                        className="waterBalance--status">{formatWater(consumed + water_sum)}</div>

                    <div className="waterBalance--goal">&nbsp;/ {formatWater(goal)} л</div>
                </div>
                <div className="waterBalance--difference">
                    {formatWater(rest)} л осталось
                </div>
                <div className="waterDiary--progressBar">
                    {<ProgressBar value={Math.round(consumedPercent)} color="#2db4e5" mode="determinate"/>}
                </div>

                <div className="waterSvg waterDiary--svgWidget">
                    <div className="waterSvg--btn">
                    </div>
                    <div onClick={this._decreaseMeasureCount}
                         onMouseLeave={this._saveWaterModel}
                         onTouchEnd={this._saveWaterModel}
                         className="waterSvg--changeWater waterSvg--cancelWater">
                        <span className="waterSvg--changeWaterIcon">–</span>
                    </div>
                    <div onClick={this.getNextSlide}
                         className="waterSvg--capacityWrap">

                        <div ref="first"
                             className={"waterSvg--capacity waterSvg--capacityLeft" + (capacityKind === 1 ? ' ' + CHECKED : '')}>
                            <WaterIconsBottle percent={this.getTransformY(335)}/>
                            <div className="waterSvg--signature">Бутылка 500 мл</div>
                        </div>

                        <div ref="third"
                             className={"waterSvg--capacity waterSvg--capacityRight" + (capacityKind === 3 ? ' ' + CHECKED : '')}>
                            <WaterIconsCustom percent={this.getTransformY(290)}/>
                            <div className="waterSvg--signature">Пользовательский 100 мл</div>
                        </div>

                        <div ref="second"
                             className={"waterSvg--capacity waterSvg--capacityCenter" + (capacityKind === 2 ? ' ' + CHECKED : '')}>
                            <WaterIconsCup percent={this.getTransformY(280)}/>
                            <div className="waterSvg--signature">Стакан 250 мл</div>
                        </div>
                    </div>
                    <div onClick={this._increaseMeasureCount}
                         onMouseLeave={this._saveWaterModel}
                         onTouchEnd={this._saveWaterModel}
                         className="waterSvg--changeWater waterSvg--addWater">
                        <span className="waterSvg--changeWaterIcon">+</span>
                    </div>
                    <div className="waterSvg--btn waterSvg--btnRight">
                    </div>
                </div>

                <DotesEclips list={SLIDES_LIST}
                             checked={capacityKind}
                             checkedColor="#95dffa"
                             onChange={this.setCapacity}/>
            </div>
        )
    }
}

export default SvgWidget
