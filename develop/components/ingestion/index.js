import {PropTypes, Component} from 'react';
import {FavoriteIcon, ArrowOpen} from 'components/icons/interface_icons.js';
import Food from 'components/food';

import Pie from 'components/Pie';

var data = [{
    color: "#ed998e",
    highlight: "#5AD3D1",
    label: "Белки",
    value: 38
}, {
    color: "#df5f5d",
    highlight: "#5AD3D1",
    label: "Жиры",
    value: 62
}, {
    color: "#9f3a3a",
    highlight: "#5AD3D1",
    label: "Углеводы",
    value: 100
}];


class Ingestion extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        consumedCal: PropTypes.number,
        isLiked: PropTypes.bool,
        goal: PropTypes.number,
        data: PropTypes.shape({
            calc_calories: PropTypes.number,
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
            }),
            foods: PropTypes.arrayOf(PropTypes.shape({
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
        })
    }

    state = {
        isOpen: false,
        animRuning: false
    }

    componentWillUnmount() {
        this.stopper = true
        clearTimeout(this.animTimeout)
    }

    componentDidUpdate(nextProps, nextState) {


        if (nextState.isOpen !== this.state.isOpen) {
            if (this.state.isOpen) {
                this.animateBodyDown()
            } else {
                this.animateBodyUp()
            }
        }
    }

    animateBodyUp() {
        const body = this.refs.detailedBody;
        const _this = this;
        const step = 40;

        let count = body.offsetHeight;

        this.anim_stopper = false;

        function anim() {

            _this.animTimeout = setTimeout(() => {

                if (count <= 0) {

                    _this.stopper = true
                    clearTimeout(_this.animTimeout)

                    body.style.height = 0 + 'px'

                    _this.setState({
                        animRuning: false
                    })
                    return
                }

                count = count - step

                body.style.height = count + 'px'


                requestAnimationFrame(anim)

            }, 0)
        }

        this.setState({
            animRuning: true
        })

        anim()

    }

    animateBodyDown() {
        const body = this.refs.detailedBody;
        const table = this.refs.table;
        const footer = this.refs.footer;
        const _this = this;
        const step = 40;

        this.anim_stopper = false;

        let count = 0;

        function anim() {

            _this.animTimeout = setTimeout(() => {

                if (footer.offsetTop - 1 >= table.offsetTop + table.offsetHeight) {

                    _this.stopper = true
                    clearTimeout(_this.animTimeout)

                    body.style.height = (table.offsetTop + table.offsetHeight - body.offsetTop) + 1 + 'px'


                    _this.setState({
                        animRuning: false
                    })
                    return
                }

                count = count + step

                body.style.height = count + 'px'


                requestAnimationFrame(anim)

            }, 0)
        }

        this.setState({
            animRuning: true
        })

        anim()
    }


    toggleOpen = () => {
        if(this.state.animRuning) return

        this.setState({isOpen: !this.state.isOpen})

    }

    getNutrientsTitle(){
        switch(this.props.id){
            case 1:
                return 'завтрака';
            case 2:
                return 'обеда';
            case 3:
                return 'ужина';
            case 4:
                return 'перекусов';
        }

    }

    renderFoods() {
        const foods = this.props.data.foods;


        return (
            <div className="caloriesDiaryIngestion--bodyDetailedProducts">
                {foods.map(food => {
                    //const fatSecretData = food.fatsecret_food.find(ff => ff.fatsecret_food_id === food.fatsecret_food_id);
                    //const {brand__name , food_name } = fatSecretData;
                    const {calc_calories, currentInfo} = food;

                    return (
                        <div key={food.fatsecret_food_id} className="caloriesDiaryIngestion--productWrap">
                            <Food calories={calc_calories}
                                  currentInfo={currentInfo}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderBodyDetailed() {
        const nutrients = this.props.data.nutrients;

        //Округлим до целых согласно спецификации
        for (let key in nutrients) {
            nutrients[key] = Math.round(nutrients[key])
        }

        const {protein, fat, carbohydrate, calcium, cholesterol, fiber, iron,
            monounsaturated_fat, polyunsaturated_fat, potassium, saturated_fat, sodium,
            sugar, vitamin_a, vitamin_c} = nutrients;

        return (
            <div ref="detailedBody" className="caloriesDiaryIngestion--bodyDetailed">
                {this.renderFoods()}
                <div className="caloriesDiaryIngestion--addingButtonWrap"></div>
                <div className="caloriesDiaryIngestion--nutritionalWrap">
                    <div className="caloriesDiaryIngestion--nutritionalTitle">Пищевая ценность {this.getNutrientsTitle()}</div>
                    <div className="caloriesDiaryIngestion--nutritionalHead">
                        <div className="caloriesDiaryIngestion--nutritionalDiagram">
                            <Pie tooltipSign="г" data={utils.getDataForNutrientsPie({protein, fat, carbohydrate})}
                                 options={{
                                    tooltips:{enabled:false}
                                 }} width="60px" height="60px"/>
                        </div>
                        <div className="caloriesDiaryIngestion--nutritionalPercents">
                            <div className="caloriesDiaryIngestion--nutritionalPercentsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Белки</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __proteins"/>
                                            <span className="caloriesDiaryIngestion--nutrientsItemValue">{protein}&nbsp;
                                                г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalPercentsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Жиры</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __fats"/>
                                            <span className="caloriesDiaryIngestion--nutrientsItemValue">{fat}&nbsp;
                                                г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalPercentsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Углеводы</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __carbohydrates"/>
                                <span className="caloriesDiaryIngestion--nutrientsItemValue">{carbohydrate}&nbsp;
                                    г</span>
                            </div>
                        </div>
                    </div>
                    <div ref="table" className="caloriesDiaryIngestion--nutritionalTable">
                        <div className="caloriesDiaryIngestion--nutritionalTableRow">
                            <div className="caloriesDiaryIngestion--nutritionalTableRowTitle caloriesDiaryIngestion--nutritionalSpaceBetween">
                                <span>Белки</span><span>{protein} г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalTableRowCell">
                            </div>
                        </div>
                        <div className="caloriesDiaryIngestion--nutritionalTableRow">
                            <div className="caloriesDiaryIngestion--nutritionalTableRowTitle caloriesDiaryIngestion--nutritionalSpaceBetween">
                                <span>Жиры</span><span>{fat} г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalTableRowCell">
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Ненасыщенные жиры</span><span>{saturated_fat}&nbsp;
                                    г</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween"><span>Мононенасыщенные жиры</span><span>{monounsaturated_fat}&nbsp;
                                    г</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween"><span>Полиненасыщенные жиры</span><span>{polyunsaturated_fat}&nbsp;
                                    г</span></div>
                            </div>
                        </div>
                        <div className="caloriesDiaryIngestion--nutritionalTableRow">
                            <div className="caloriesDiaryIngestion--nutritionalTableRowTitle caloriesDiaryIngestion--nutritionalSpaceBetween">
                                <span>Углеводы</span><span>{carbohydrate} г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalTableRowCell">
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Сахар</span><span>{sugar}&nbsp;г</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Клетчатка</span><span>{fiber}&nbsp;
                                    г</span></div>
                            </div>
                        </div>
                        <div className="caloriesDiaryIngestion--nutritionalTableRow __noBorder">
                            <div className="caloriesDiaryIngestion--nutritionalTableRowTitle caloriesDiaryIngestion--nutritionalSpaceBetween">
                                <span>Другое</span><span></span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutritionalTableRowCell">
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween"><span>Холестерин</span><span>{cholesterol}&nbsp;
                                    мг</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Натрий</span><span>{sodium}&nbsp;
                                    мг</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Калий</span><span>{potassium}&nbsp;мг</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Кальций</span><span>{calcium}&nbsp;%</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Железо</span><span>{iron}&nbsp;%</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Витамин С</span><span>{vitamin_c}&nbsp;%</span></div>
                                <div className="caloriesDiaryIngestion--nutritionalSpaceBetween">
                                    <span>Витамин А</span><span>{vitamin_a}&nbsp;%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    getFoodList() {
        const foods = this.props.data.foods;

        const listArr = foods.map(food => {
            const fatSecretData = food.fatsecret_food.find(ff => ff.fatsecret_food_id === food.fatsecret_food_id);

            return fatSecretData.food_name
        })


        return listArr.join(', ')
    }

    render() {
        const {title, data, isLiked, goal} = this.props;
        const {calc_calories, nutrients, foods} = data;
        const {fat, carbohydrate, protein} = nutrients;
        const isOpen = this.state.isOpen;

        return (
            <div className={"caloriesDiaryIngestion" + (isOpen ? " caloriesDiaryIngestion__open" : '')}>
                <div className="caloriesDiaryIngestion--header">
                    {/*<div className="caloriesDiaryIngestion--likedIcon"><FavoriteIcon isLiked={isLiked}/></div>*/}
                    <div className="caloriesDiaryIngestion--Title">{title}</div>
                    <div className="caloriesDiaryIngestion--CalScore">{calc_calories || 0}&nbsp;ккал</div>
                </div>
                <div className="caloriesDiaryIngestion--goalRecomended">{goal}&nbsp;ккал</div>
                { foods.length ?
                    <div className="caloriesDiaryIngestion--body">
                        <div className="caloriesDiaryIngestion--productShortList"><span>{this.getFoodList()}</span></div>
                        <div className="caloriesDiaryIngestion--nutrients">
                            <div className="caloriesDiaryIngestion--nutrientsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __proteins"/>
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Белки</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemValue">{Math.round(protein)}&nbsp;
                                    г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutrientsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __fats"/>
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Жиры</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemValue">{Math.round(fat)}&nbsp;
                                    г</span>
                            </div>
                            <div className="caloriesDiaryIngestion--nutrientsItem">
                                <span className="caloriesDiaryIngestion--nutrientsItemCircle __carbohydrates"/>
                                <span className="caloriesDiaryIngestion--nutrientsItemText">Углеводы</span>
                                <span className="caloriesDiaryIngestion--nutrientsItemValue">{Math.round(carbohydrate)}&nbsp;
                                    г</span>
                            </div>
                        </div>
                        {/*isOpen ? this.renderBodyDetailed() : null*/}
                        {this.renderBodyDetailed()}
                        <div ref="footer" onClick={this.toggleOpen} className="caloriesDiaryIngestion--ToggleArrowWrap">
                            <div className="caloriesDiaryIngestion--ToggleArrow"><ArrowOpen isOpen={isOpen}/></div>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default Ingestion
