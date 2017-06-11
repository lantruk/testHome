import React, {PropTypes, Component} from 'react';
import WaterMeasureRow from './waterMeasureRow'

class WaterMeasureWrap extends Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            ingestionId: PropTypes.number.isRequired,
            calc_calories: PropTypes.number, //198.75
            changed: PropTypes.string, //"2015-07-30T08:12:56+03:00"
            currentInfo: PropTypes.shape({
                foodCount: PropTypes.number,
                weight: PropTypes.number,
                brand: PropTypes.string,
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
        }))
    }


    renderMeasurements() {


        return this.props.data.map(waterData => {

            return <WaterMeasureRow key={waterData.id} waterData={waterData}/>
        })
    }



    render() {

        return (
            <div className="waterDiary--book">
                <div className="waterDiary--listBar">
                    <div className="waterDiary--ListBarWrap">
                        <div className="waterDiary--description">
                            Добавлено из каталога еды
                        </div>
                        <div className="waterDiary--indicatorWrap">
                            <div className="waterDiary--indicator">
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderMeasurements()}
            </div>
        )
    }
}

export default WaterMeasureWrap