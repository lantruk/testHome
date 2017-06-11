import React, {PropTypes, Component} from 'react'
import Input from '../../lib/input/index.js';


export const ERR_required = '* поле обязательно для заполнения';
export const ERR_uncorect = '* некорректное значение';

const factory = (Input) => {

    class InputPhoneNumber extends React.Component {

        static propTypes = {
            label: React.PropTypes.string,
            error: React.PropTypes.string,
            value: React.PropTypes.string.isRequired,
            hint: React.PropTypes.string,
            required: React.PropTypes.bool,
            onChange: React.PropTypes.func,
           /* theme: React.PropTypes.shape({
                bar: React.PropTypes.string,
                counter: React.PropTypes.string,
                disabled: React.PropTypes.string,
                error: React.PropTypes.string,
                errored: React.PropTypes.string,
                hidden: React.PropTypes.string,
                hint: React.PropTypes.string,
                icon: React.PropTypes.string,
                input: React.PropTypes.string,
                inputElement: React.PropTypes.string,
                required: React.PropTypes.string,
                withIcon: React.PropTypes.string
            })*/
        }

        handleFocus(e) {
            if(!e.target.value) {

                this.props.onChange && this.props.onChange({
                    value: '+7'
                })
            }
        }


        handleBlur(e) {
            const value = this.props.value == '+' || this.props.value == '+7' ? '' : this.props.value;

            const error = this.checkPhone(value, this.props.required);
                let state;

            if (error.hasMistake) {

                state = {
                    value: value,
                    error: error.mes
                };

            } else {
                state = {
                    value: value
                }
            }

            this.props.onChange && this.props.onChange(state)
        }

 checkPhone(val, required) {

    const onlyNum = val.replace(/\D+/g,"");


    if (required && !onlyNum.length) {

        return {
            hasMistake: true,
            type: 0,
            mes: ERR_required
        }
    }

    if (onlyNum.length && onlyNum.length < 11 ) {

        return {
            hasMistake: true,
            type: 1,
            mes: ERR_uncorect
        }
    }


    return {
        hasMistake: false,
        type: null,
        mes: ''
    }
}


        handleChange(value) {
            value = this.formatPhone(value)

            const req = /\D/;
            //Только цифры
           if(req.test(value.substr(1))) return

            const state = {
                value: value,
                error: ''
            };

            //this.setState(state)
            this.props.onChange && this.props.onChange(state)
        }

        formatPhone(value){
            if(!value){
                return '+'
            }

            if(value && value[0] !== '+'){
                return '+' + value
            }

            return value

        }

        render() {
            const value = this.props.value && this.props.value[0] !== '+' ? '+' + this.props.value : this.props.value;

            return <Input
                required={this.props.required}
                hint={this.props.hint || 'введите телефон'}
                //theme={this.props.theme}
                label={this.props.label || 'Телефон'}
                disabled={!!this.props.disabled}
                value={value}
                //value={this.props.value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                maxLength={15}
                error={this.props.error}
                />
        }
    }

    return InputPhoneNumber
};

const decoratedInput = factory(Input);
//const ThemedInput = themr('Default', theme)(decoratedInput);

//export {theme as InputUserName__DefaultTheme}
export { decoratedInput as InputPhoneNumber }
