import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import SvgWidget from './svgWidget'
import {saveWater} from 'AC/water'

import EmptyWater from './emptyWater'
import {dateToUrl, getISODate} from 'utils'

class Water extends Component {

    getOnlyWaterData() {
        let consumed = 0,
            goal = 0,
            water__sum = 0,
            consumed_water = 0

        let response = this.props.water.filter((dayPressures)=> {

            return dayPressures.date == getISODate(this.props.date)
        })

        if (response.length) {
            goal = response[0].goal
            water__sum = response[0].water__sum
            consumed_water = response[0].consumed_water
        }


        if (consumed_water) {//Если есть данные (пришел запрос) достучимся до воды
            const consumedWater = consumed_water;
            (!consumedWater ? consumed = 0 : consumed = consumedWater) //если сегодня еще ничего не выпил, то 0
        }

        const water_sum = water__sum == null ? 0 : water__sum

        return {consumed, goal, water_sum}
    }

    saveWaterInModel = (newVal, oldVal) => {
        const meal_time = dateToUrl(this.props.date);
        const isRemoving = newVal < oldVal;
        const differend = isRemoving ? oldVal - newVal : newVal - oldVal;


        const consumed = differend / 100;
        const date = this.props.date
        const method = isRemoving ? 'DELETE' : 'POST'
        const callApi = isRemoving ? '/mytrak/api/v1/consumed_food/delete_water' : '/mytrak/api/v1/consumed_food/add_water';
        let newWater = 0
            this.props.water.forEach((day)=>{

                if(day.date == getISODate(date)){
                   newWater = day.consumed_water
                }})

        const options = {
            'food_count': consumed,
            'meal_time': meal_time,
            'datetime_ms_id': Date.now(),
            'date': meal_time
        }

            if(isRemoving){
                newWater -= consumed * 100
            }else{
                 newWater += consumed * 100
            }

//        console.info('save', {date, options, callApi, method, newWater})
        this.props.saveWater({date, options, callApi, method, newWater})


    }

    render() {

        const consumedOnlyWater = this.getOnlyWaterData();

        return (

            <div className="waterDiary">

                <div className="waterDiary--widget">

                    {<SvgWidget
                        saveWaterInModel={this.saveWaterInModel}
                        date={this.props.date}
                        {...consumedOnlyWater}


                    />}
                    {<EmptyWater />}
                </div>
            </div>
        )
    }
}

export default connect(state => ({
        date: state.others.get('date'),
        water: state.water.toJS(),
    }),
    {saveWater}
)(Water)

