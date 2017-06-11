import React from 'react'
import Autocomplete from '../../lib/autocomplete';
import getData from 'containers/Profile/getVKCountries.js';
import {checkCountryOrCity} from 'containers/Profile/verifications.js'
//import {account } from 'identifiers.js'
import {COUNTRY} from '../../constants'
//const {COUNTRY} = account;
import {ERR_required} from 'containers/Profile/verifications.js'

class InputCountries extends React.Component {

    static propTypes = {
        country: React.PropTypes.string,
        error: React.PropTypes.string,
        onChange: React.PropTypes.func
    }

    state = {
        isLoading: false,
        country: this.props.country || '',
        //Возможно потом страны будут браться динамически поэтому оставил в state
        countries: getData(),
        error: this.props.error
    }

    onBlur = (query) => {

        const {countries, country} = this.state;
        const verify = checkCountryOrCity(COUNTRY, query, countries, true);

        let newState;
        if (!country) {
            newState = {
                country: country,
                error: ERR_required
            }
        }else if (verify.hasMistake) {
            newState = {
                country: country,
                error: verify.mes
            }
        } else {
            newState = {//Если все ок то сохраним иммено отфарматированное значение из списка
                country: verify.formatedQuery,
                error: ''
            }
        }

        this.setState(newState)
        this.props.onChange && this.props.onChange(newState)

    }

    onChange = (query) => {
        if (this.state.country !== query) {
            this.setState({
                country: query
            })
        }
    }


    render() {
  
        return <Autocomplete
            scroll
            label="Страна"
            hint="Выбирете Страну..."
            source={this.state.countries}
            value={this.state.country}
            error={this.state.error}
            onBlur={this.onBlur}
            onChange={this.onChange}/>
    }
}

export default InputCountries
