import React, {PropTypes, Component} from 'react';

import Input from '../../lib/input/index.js';
//import { OFFICIAL_NAMES } from 'regexp_inspections.js';
import {checkName} from 'containers/Profile/verifications.js'

const ERR_required = '* поле обязательно для заполнения';
const ERR_uncorect = '* некорректное значение';
const ERR_smallLength = '* слишком маленькое значение';
const OFFICIAL_NAMES = /^ |  |^-|--|[^a-zа-яё -]/i;


const factory = (Input) => {

    class InputUserName extends React.Component {


        static propTypes = {
            firstName: React.PropTypes.bool,
            lastName: React.PropTypes.bool,
            patronymicName: React.PropTypes.bool,
            label: React.PropTypes.string,
            error: React.PropTypes.string,
            value: React.PropTypes.string.isRequired,
            hint: React.PropTypes.string,
            required: React.PropTypes.bool,
       
        }

        constructor(props) {
            super()


            /*this.state = {
                value: props.value || '',
                error: props.error || ''
            }*/

        }

        componentWillReceiveProps(next){
            /*if(this.props.error !== next.error){
                this.setState({error: next.error})
            }*/
        }

        handleBlur(e) {
            const error = checkName(e.target.value, this.props.required);



            if (error.hasMistake) {
                /*const state = {
                    value: this.state.value,
                    error: error.mes
                };

                this.setState(state)
                this.props.onChange && this.props.onChange(state)*/

                const state = {
                    value: this.props.value,
                    error: error.mes
                };
                this.props.onChange(state)
            }


        }


        handleChange(value) {

            if (OFFICIAL_NAMES.test(value)) {
                return
            }

            const state = {
                value: value,
                error: ''
            };

            //this.setState(state)
            this.props.onChange && this.props.onChange(state)
        }

        getLabelAndHint() {
            let label, hint;


            if (this.props.firstName) {
                label = "Имя"
                hint = "Введите имя"
            } else if (this.props.lastName) {
                label = "Фамилия"
                hint = "Введите фамилию"
            }
            else if (this.props.patronymicName) {
                label = "Отчество"
                hint = "Введите отчество"
            }

            return {label, hint}
        }

        render() {
            const {label, hint} = this.getLabelAndHint();

            return <Input
                required={this.props.required}
                hint={this.props.hint || hint}
               // theme={this.props.theme}
                label={this.props.label || label}
                disabled={!!this.props.disabled}
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                maxLength={24}
                error={this.props.error}
                />
        }
    }

    return InputUserName
};

const decoratedInput = factory(Input);
//const ThemedInput = themr('Default', theme)(decoratedInput);

//export {theme as InputUserName__DefaultTheme}
export { decoratedInput as InputUserName }
