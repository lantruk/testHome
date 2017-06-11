import React, {PropTypes, Component} from 'react';
import {utils} from '../../../../utils'

class WaterMeasureRow extends Component {

    static propTypes = {
        waterData: PropTypes.shape({
            ingestionId: PropTypes.number.isRequired,
            calc_calories: PropTypes.number, //198.75
            changed: PropTypes.string, //"2015-07-30T08:12:56+03:00"
            currentInfo: PropTypes.shape({
                foodCount: PropTypes.number,
                weight: PropTypes.number,
                brand: PropTypes.string,
                name: PropTypes.string,
                unit: PropTypes.string,
                measurementDescription: PropTypes.string
            }),
            datetime_ms_id: PropTypes.number, //1438233176209
            fatsecret_food: PropTypes.array,
            fatsecret_food_id: PropTypes.number, //4091014
            fatsecret_serving_id: PropTypes.number, //3981761
            food_count: PropTypes.number, //0.75
            id: PropTypes.number, //2442
            meal_time: PropTypes.string, //"2015-07-30T00:00:00+03:00"
            servings: PropTypes.array,
            nutrients: PropTypes.shape({
                calcium: PropTypes.number,
                carbohydrate: PropTypes.number,
                cholesterol: PropTypes.number,
                fat: PropTypes.number,
                fiber: PropTypes.number,
                iron: PropTypes.number,
                monounsaturated_fat: PropTypes.number,
                polyunsaturated_fat: PropTypes.number,
                potassium: PropTypes.number,
                protein: PropTypes.number,
                saturated_fat: PropTypes.number,
                sodium: PropTypes.number,
                sugar: PropTypes.number,
                vitamin_a: PropTypes.number,
                vitamin_c: PropTypes.number
            })
        })
    }


    getIngestionName(id) {

        switch (id) {
            case 1:
                return 'Завтрак';
            case 2:
                return 'Обед';
            case 3:
                return 'Ужин';
            case 4:
                return 'Перекус';
        }

    }





    render() {
        const {meal_time, ingestionId, fatsecret_food, fatsecret_food_id, currentInfo} = this.props.waterData;
        const formatedData = `${meal_time.substr(11, 2)}:${meal_time.substr(14, 2)}`;
        const formatedName = this.getIngestionName(ingestionId);
        const name = currentInfo.name;

        const {foodCount, weight, brand, unit, measurementDescription} = currentInfo;

        return (
            <div className="waterBook--row">
                <div className="waterBook--bigColumn waterBook--bigColumn__smallWidth">
                    <div className="waterBook--smallColumn waterBook__time">{ formatedData }</div>
                    <div className="waterBook--smallColumn waterBook__eat">{ formatedName }</div>
                </div>

                <div className="waterBook--bigColumn waterBook--bigColumn__bigWidth">
                    <div className="waterBook--smallColumn waterBook__from">{name}</div>
                    <div className="waterBook--smallColumn waterBook__much">
                        <span>{brand}</span><span>{getWeightString(currentInfo)}</span>
                    </div>
                </div>

                <div className="waterBook--column">
                    <div className="waterBook--indicator"></div>


                    <div className="dayPressure--menuEdit">
                        <div className="dayPressure--menuButton">⋮</div>
                    </div>
                </div>
            </div>

        )
    }
}

export default WaterMeasureRow