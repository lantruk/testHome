import React, {PropTypes, Component} from 'react';
import {PRESSURE_ROUT, WATER_ROUT, DIARY__ROUTE} from '../../../constants'
import {connect} from 'react-redux'
import {openAddPopUp} from 'AC/pressure'
import {SortablePane, Pane} from 'react-sortable-pane';
import {ScrollBox,GenericScrollBox, FastTrack} from '../../../components/scrollBox'

const style = {
    //fontSize: "40px",
    //textAlign: "center",
    //paddingTop: "60px",
    //height: "300px",
    border: "solid 1px #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff"
};

const water = []


class Dashboard extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    goTo = (route) => () => {
        this.context.router.push(DIARY__ROUTE + route)
    }

    goTo_addPopUp = () => {
        this.props.openAddPopUp()
        this.context.router.push(DIARY__ROUTE + PRESSURE_ROUT)
    }

    drop = (ev) => {
        //console.info('drop ev.target',ev.target)
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    allowDrop = (e) => {
        //console.info('allowDrop', e.target)
        e.preventDefault();
    }

    drag = (e) => {

        e.dataTransfer.setData("text", e.target.id);
        //console.log('drag', e)

    }

    render() {

        return (
            <div>
                <div className="dashboard __LKSection">
                    <div className="dashboard--containerFluid">
                        <div className="dashboardWidget dashboardWidget__Steps __dashboardMediumWidget">
                            < div className="dashboardWidget--innerWrap">
                                <header className="dashboardWidget--header">Ходьба</header>
                                <div className="dashboardWidget--body">
                                    <div className="dashboardWidget--circularDiagram">
                                        <svg viewBox="0 0 157 157" preserveAspectRatio="xMidYMid meet"
                                             version="1.1">
                                            <circle stroke="#DDDFE2" cx="77.5" cy="77.5" r="76" strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"></circle>
                                            <circle className="bar" cx="77.5" cy="77.5" r="76" stroke="#009BA1"
                                                    strokeDasharray="475" strokeDashoffset="474" strokeWidth="3"
                                                    fill="none" fillRule="evenodd"></circle>
                                        </svg>
                                    </div>

                                    <div className="dashboardWidget--targetWrap">
                                        <i className="starTargetIcon"></i>
                                        <span className="dashboardWidget--targetPercent">10</span>
                                        <span className="dashboardWidget--targetValue">20</span>
                                    </div>
                                    <div className="dashboardWidget--footer">
                                        <div className="dashboardWidget--footerCol"><span
                                            className="dashboardWidgetStepsDist">12</span><span> Пройдено </span>
                                        </div>
                                        <div className="dashboardWidget--footerCol"><span
                                            className="dashboardWidgetStepsBurn">2 ккал </span><span> Сожжено </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*баланс*/}
                        <div className="dashboardWidget dashboardWidget__Balance __dashboardMediumWidget">
                            <div className="dashboardWidget--innerWrap">
                                <header className="dashboardWidget--header">Баланс калорий</header>
                                <div className="dashboardWidget--body">
                                    <div className="dashboardWidget--circularDiagram">
                                        <svg viewBox="0 0 157 157" preserveAspectRatio="xMidYMid meet"
                                             version="1.1">
                                            <circle stroke="#DDDFE2" cx="77.5" cy="77.5" r="76" strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"></circle>
                                            <circle className="bar" cx="77.5" cy="77.5" r="76" stroke="#009BA1"
                                                    strokeDasharray="475" strokeDashoffset="474" strokeWidth="3"
                                                    fill="none" fillRule="evenodd"></circle>
                                        </svg>
                                    </div>
                                    <p className="dashboardWidget--ValueInCircleDiagram"><b>
                                        22</b><span>ккал</span></p>
                                    <div className="dashboardWidget--targetWrap">
                                        <i className="starTargetIcon"></i>
                                        <span className="dashboardWidget--targetPercent">10</span><span
                                        className="dashboardWidget--targetValue">/ 1</span></div>
                                    <div className="dashboardWidget--footer">
                                        <div className="dashboardWidget--footerCol"><span
                                            className="dashboardWidgetBalanceConsumed">150 ккал </span><span> Потреблено </span>
                                        </div>
                                        <div className="dashboardWidget--footerCol"><span
                                            className="dashboardWidgetBalanceBurned"> 333 ккал </span><span> Сожжено </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*water*/}
                        <div onClick={this.goTo(WATER_ROUT)}
                             className="dashboardWidget dashboardWidget__Water __dashboardMediumWidget">
                            <div className="dashboardWidget--innerWrap">
                                <header className="dashboardWidget--header">Вода</header>
                                <div className="dashboardWidget--body">
                                    <div className="dashboardWidget--circularDiagram">
                                        <svg viewBox="0 0 157 157" preserveAspectRatio="xMidYMid meet"
                                             version="1.1">
                                            <circle stroke="#DDDFE2" cx="77.5" cy="77.5" r="76" strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"></circle>
                                            <circle className="bar" cx="77.5" cy="77.5" r="76" stroke="#009BA1"
                                                    strokeDasharray="475" strokeDashoffset="474" strokeWidth="3"
                                                    fill="none" fillRule="evenodd"></circle>
                                        </svg>
                                    </div>
                                    <p className="dashboardWidget--ValueInCircleDiagram">
                                        <b>20</b><span>литров</span></p>
                                    <div className="dashboardWidget--targetWrap">
                                        <i className="starTargetIcon"></i>
                                    <span className="dashboardWidget--targetPercent">
                                     </span><span className="dashboardWidget--targetValue"> 20 / 20 л</span></div>
                                    <div className="dashboardWidget--footerButton">

                                        <div className="dashboardWidget--addingButton"> Добавить</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*сон*/}
                        <div className="dashboardWidget dashboardWidget__Sleep __dashboardMediumWidget">
                            <div className="dashboardWidget--innerWrap">
                                <header className="dashboardWidget--header">Сон</header>
                                <div className="dashboardWidget--body">
                                    <div className="dashboardWidget--circularDiagram">
                                        <svg viewBox="0 0 157 157" preserveAspectRatio="xMidYMid meet"
                                             version="1.1">
                                            <circle stroke="#DDDFE2" cx="77.5" cy="77.5" r="76" strokeWidth="1"
                                                    fill="none"
                                                    fillRule="evenodd"></circle>
                                            <circle className="bar" cx="77.5" cy="77.5" r="76" stroke="#009BA1"
                                                    strokeDasharray="475" strokeDashoffset="474" strokeWidth="3"
                                                    fill="none" fillRule="evenodd"></circle>
                                        </svg>
                                    </div>
                                    <p className="dashboardWidget--ValueInCircleDiagram"><b>
                                        22</b><span></span></p>
                                    <div className="dashboardWidget--targetWrap">
                                        <i className="starTargetIcon"></i>
                                        <span className="dashboardWidget--targetPercent">33 </span><span
                                        className="dashboardWidget--targetValue">/ 44</span></div>
                                    <div className="dashboardWidget--footerOnlyText">Эффективность сна
                                        55
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*pressure*/}
                        <div onClick={this.goTo(PRESSURE_ROUT)}
                             className="dashboardWidget dashboardWidget__Pressure __dashboardVerySmallWidget">
                            <div className="dashboardWidget--innerWrap">
                                <header className="dashboardWidget--header">Давление</header>

                                <div onClick={this.goTo_addPopUp} className="dashboardWidget--smallAddingButton"></div>

                            </div>
                        </div>

                    </div>

                </div>
<ScrollBox>
                    <div style={{width:'200px', height: '200px'}}>
                        <img src='https://onetrak.s3.eu-central-1.amazonaws.com/media/images/background/137_JaAPxEOUCI.png' />
                    </div>
</ScrollBox>
            </div>
        )
    }
}

export default connect(state => ({}), {openAddPopUp})(Dashboard)