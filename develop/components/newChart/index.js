import React, {Component, PropTypes} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts' //установить через npm
import ScrollBox from 'components/scrollBox/ScrollBox'
import './newChart.scss'

const data = [
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
    {name: 'Page A', uv: 4000, female: 2400, male: 2400},
    {name: 'Page B', uv: 3000, female: 1398, male: 2210},
    {name: 'Page C', uv: 2000, female: 9800, male: 2290},
    {name: 'Page D', uv: 2780, female: 3908, male: 2000},
    {name: 'Page E', uv: 1890, female: 4800, male: 2181},
    {name: 'Page F', uv: 2390, female: 3800, male: 2500},
    {name: 'Page G', uv: 3490, female: 4300, male: 2100},
];

class newChart extends Component {

    static propTypes = {}

    render() {
        /*var a = {
         aerobic_burn: 40,
         aerobic_distance: 40,
         aerobic_steps: 40,
         burned_calories: 40,
         metric_datetime: "2017-03-03T08:56:00+03:00",
         run_burn: 40,
         run_distance: 40,
         run_steps: 40,
         walking_burn: 40,
         walking_distance: 40,
         walking_steps: 40
         }*/

        // console.log(this.props.data)
        return (
            <div className="pressureDiagramWrap">
                <div className="newCart--pressureDiagram">
                    <div className="megaChart">
                        <ScrollBox style={{height: '300px'}}> {/* контейнер который с кнопками и скролится*/}
                            {/*нижний скрол можно отключить в ScrollBox => defaultProps: hideScrollBarX = true*/}
                            <div className="scroll-box__handle scroll-box__handle--x scroll-box__trak--dragged">
                                <BarChart width={1600} height={300} data={this.props.data}
                                          margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    {/* <Legend />*/}
                                    <Bar dataKey="aerobic_burn" stackId="a" fill="red"/>
                                    <Bar dataKey="aerobic_distance" stackId="a" fill="blue"/>
                                    <Bar dataKey="aerobic_steps" stackId="a" fill="yellow"/>
                                    <Bar dataKey="burned_calories" stackId="a" fill="gray"/>
                                    <Bar dataKey="run_burn" stackId="a" fill="green"/>
                                    <Bar dataKey="run_distance" stackId="a" fill="#82ca0d"/>
                                    <Bar dataKey="walking_burn" stackId="a" fill="#8784d8"/>
                                    <Bar dataKey="walking_distance" stackId="a" fill="#62ca9d"/>
                                    <Bar dataKey="walking_steps" stackId="a" fill="#82ca9d"/>
                                    {/*<Bar dataKey="walking_steps" stackId="c" fill="red"/>*/}
                                    {/*<Bar dataKey="walking_steps" fill="#ffc658"/>*/}
                                </BarChart>
                            </div>
                        </ScrollBox>
                    </div>
                </div>
            </div>




        )
    }

}


export default newChart




