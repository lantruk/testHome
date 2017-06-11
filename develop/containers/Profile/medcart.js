import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import IMT_line from '../../components/profile_IMT_line'
import Birthday from 'components/InputSelectType/birthDay'
import Height from 'components/InputSelectType/Height'
import Weight from 'components/InputSelectType/Weight'
import Gender from 'components/InputCheckedType/Gender'
import SaveButton from '../../components/Buttons/profile_save_button'
//import saveMedcart from 'middlewares/saveMedcart.js';
import {getISODate, getBMI, safulyNewDateFromStr} from '../../utils'
import {GOALS} from '../../constants'
//import { profile } from 'identifiers.js';
import { ACCOUNT_HEIGHTS, ACCOUNT_INT_WEIGHTS, ACCOUNT_PART_WEIGHTS, ACCOUNT_MONTHS, ACCOUNT_YEARS } from './sources.js'; 


//const {ACCOUNT,MEDCART,GOALS,PRIVACY,BIRTHDAY,HEIGHT, WEIGHT, GENDER,MALE,FEMALE} = profile;
import {ACCOUNT,BIRTHDAY,HEIGHT, WEIGHT, GENDER,MALE,FEMALE} from '../../constants'

class Medcart extends Component {


    static propTypes = {
        //model: React.PropTypes.object.isRequired,
        //isUnfilled: React.PropTypes.bool,
        goNext: React.PropTypes.func,
        onSaveMessage: React.PropTypes.func,
        saveDefAvaFromGender: React.PropTypes.func,
        toggleLoader: React.PropTypes.func
    }

    constructor(props){
        super()

        const {profileVerify, gender, birthday, height, weight} = props.profile
        const verify = profileVerify.medcart;
        const genderId = verify.gender.hasMistake ? verify.gender.formated : gender;

        this.state = {
            //Если нет гендера или он не установлена берем по дефолту, в другом случае определяем пол
            gender : genderId === 1 ? MALE : FEMALE,
            birthday : verify.birthday.hasMistake ? verify.birthday.formated : birthday ,
            height : verify.height.hasMistake ? verify.height.formated : height,
            weight : verify.weight.hasMistake ? verify.weight.formated : weight
        }
    }

    componentWillUnmount(){
      /*  this.xhr = undefined

        clearTimeout(this.mesTimer)*/
    }


    saveCallback = (key) => (val) => {
        if(key === BIRTHDAY) val = getISODate(val)
        if(key === GENDER) this.props.saveDefAvaFromGender(val)

        if(this.state[key] !== val) this.setState({ [key] : val })
    }

    verifyAndSave = () => {
        //ЗДЕСЬ НЕТ НИКАКИХ ПРОВЕРОК ИБО ПОДСТАВЛЯЮТСЯ ДЕФОЛТНЫЕ ДАННЫЕ И ЕДИНОЖДЫ СОХРАНЯЮТСЯ
        const callback = this.props.isUnfilled ? this.props.goNext : (...arg)=>{
            this.props.onSaveMessage(...arg)
        };

            console.log('saveMedcart.call(this, callback)')
        this.props.goNextRedux(GOALS)
        //saveMedcart.call(this, callback)
    }

    render() {
        const isUnfilled = this.props.isUnfilled;

        const {gender, birthday, height, weight}= this.state;
        const BMI = getBMI(weight,height);

        return (
            
            <section className={"profileContentContainer" + (isUnfilled ? ' __unfilled' : '')}>
                <div className="medcartPointsWrap">
                    <div className="medcartPoinr medcartPoinr__Birthday">
                        <div className="medcartPoint--innerWrap">
                            <p className="medcartPoinr--head">Дата рождения</p>
                            {<Birthday onChange={this.saveCallback(BIRTHDAY)} months={ACCOUNT_MONTHS} years={ACCOUNT_YEARS} birthday={safulyNewDateFromStr(birthday)}/>}
                        </div>
                    </div>
                    <div className="medcartPoinr medcartPoinr__Height">
                        <div className="medcartPoint--innerWrap">
                            <p className="medcartPoinr--head">Рост</p>
                            <Height onChange={this.saveCallback(HEIGHT)} source={ACCOUNT_HEIGHTS} height={Math.round(+height)}/>
                        </div>
                    </div>
                    <div className="medcartPoinr medcartPoinr__Weight">
                        <div className="medcartPoint--innerWrap">
                            <p className="medcartPoinr--head">Вес</p>
                           <Weight onChange={this.saveCallback(WEIGHT)} sourceInt={ACCOUNT_INT_WEIGHTS} sourcePart={ACCOUNT_PART_WEIGHTS} weight={weight}/>
                        </div>
                    </div>
                    <div className="medcartPoinr medcartPoinr__Gender">
                        <div className="medcartPoint--innerWrap">
                            <p className="medcartPoinr--head">Пол</p>
                         <Gender onChange={this.saveCallback(GENDER)} gender={gender} />
                        </div>
                    </div>
                </div>
                <div className="medcartBMI_Wrap">
                    <div className="medcartBMI_Value">ИМТ - {BMI}</div>
                    <IMT_line type={ACCOUNT} BMI={BMI}/>
                    <div>
                        <p className="medcartBMI_description"><span>Выраженный дефицит массы тела</span><span className="medcartBMI_description--Value">&lt;
                            16</span></p>
                        <p className="medcartBMI_description"><span>Недостаточная масса тела</span><span className="medcartBMI_description--Value">16 - 18,5</span></p>
                        <p className="medcartBMI_description"><span>Физиологическая норма</span><span className="medcartBMI_description--Value">18,5 - 25</span></p>
                        <p className="medcartBMI_description"><span>Избыточная масса тела</span><span className="medcartBMI_description--Value">25 - 30</span></p>
                        <p className="medcartBMI_description"><span>Ожирение I степени</span><span className="medcartBMI_description--Value">30 - 35</span></p>
                        <p className="medcartBMI_description"><span>Ожирение II степени</span><span className="medcartBMI_description--Value">35 - 40</span></p>
                        <p className="medcartBMI_description"><span>Ожирение III степени</span><span className="medcartBMI_description--Value">&gt;
                            40</span></p>
                    </div>
                    <p className="medcartBMI_PSdescription">ИМТ (индекс массы тела) – условный коэффициент соответствия
                        массы тела росту. В таблице приведены средние показатели для лиц старше 18лет. ИМТ не подходит
                        для оценки состояния профессиональных спортсменов и людей с большой мышечной массой.</p>
                </div>
                <div className="profileSaveButtonWrap">
                     <SaveButton onClick={this.verifyAndSave} next={isUnfilled} />
                </div>
            </section>
        )
    }


}

export default connect(state => ({
    profile: state.profile.toJS(),
    isUnfilled: state.profile.getIn(['profileVerify', 'isMistake']),

}),{

})(Medcart)






