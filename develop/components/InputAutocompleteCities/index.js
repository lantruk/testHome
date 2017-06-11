import React from 'react'
import Autocomplete from '../../lib/autocomplete';
import getData from '../../containers/Profile/getVKCities.js';
//import {getCityVK} from '../../middlewares/getVKCities.js';



import { getCityIdFromName } from '../../containers/Profile/getVKCities.js';
import {checkCountryOrCity, ERR_required} from 'containers/Profile/verifications.js'
import {CITY } from '../../constants'
/*import {account } from 'identifiers.js'

const {CITY} = account;*/

class InputVKCities extends React.Component {

    static propTypes = {
        country_id: React.PropTypes.any,
        city: React.PropTypes.string,
        err: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func
    }

    constructor(props) {
        super()

        const {city, country_id, city_id} = props;

        this.state = {
            isLoading: false,
            city: city || '',
            city_id: city_id || '',
            cities: [],
            error: city || city_id ? '' : country_id ? ERR_required : '* заполните поле "Страна"' //''
            //cities: country_id ? getData(city, country_id) : []
            ,
            originalCity: []
        }

    }

    componentDidMount() {
        const {city, country_id} = this.props;

        if (country_id) getData.call(this, city, country_id)
       
    }

    componentWillUnmount() {
        this.getTimeout && clearTimeout(this.getTimeout) 
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.country_id !== this.props.country_id) {
            const newState = {
                city: '',
                error: ERR_required,
                cities: []
            };

            this.setState(newState)
            this.props.onChange && this.props.onChange(newState)

            this.getCities(this.state.query, nextProps.country_id)
        }
    }

    getCities(query, country_id) {

        if (country_id) {
            getData.call(this, query, country_id || this.props.country_id)
        }
    }

    saveCity(state) {
        this.setState(state)

        state.city_id = getCityIdFromName(state.city, this.response)

        this.props.onChange && this.props.onChange(state)
    }

    onFocus = (query) => {
              if (!this.state.cities.length) {
            this.getCities(query, this.props.country_id)
        }
    }

    onBlur = (query) => {
        //Ищем есть ли в массиве cities выбранный город
        const {cities, city} = this.state;
//debugger
        const verify = checkCountryOrCity(CITY, query, cities, this.props.country_id);

        let newState;

        if (!query) {
            newState = {
                city: city,
                error: this.props.country_id? ERR_required : '* заполните поле "Страна"'//ERR_required
            }
        } else if (verify.hasMistake) {
            newState = {
                city: city,
                error: verify.mes
            }
        } else {
            newState = {//Если все ок то сохраним иммено отфарматированное значение из списка
                city: verify.formatedQuery,
                error: ''
            }
        }

        this.saveCity(newState)

        //Если есть и если нужно отформатировать берем соответствующее значение из списка
        /*if (index !== -1 && query !== cities[index]) {
         this.saveCity(cities[index])
         }

         this.setState({
         error: index == -1 && query ? ERROR_NO_MATCHES : ''
         })*/

    }

    onChange = (query) => {

        this.getTimeout && clearTimeout(this.getTimeout)


        if (this.state.city !== query) {
            this.saveCity({city: query})

            this.getTimeout = setTimeout(()=> {

                this.getCities(query, this.props.country_id)

            }, 500)
        }

    }

    render() {

          //console.log(this.state.cities)
        return <Autocomplete
            scroll={true}
            showLoading={true}
            label="Город"
            hint="Выбирете город..."
            isLoading={this.state.isLoading}
            source={this.state.cities}
            originalCity={this.state.originalCity}
            value={this.state.city}
            error={this.state.error}
            disabled={this.props.disabled}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}/>
    }
}

export default InputVKCities
