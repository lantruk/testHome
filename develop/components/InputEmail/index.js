import React, {PropTypes, Component} from 'react';
import Input from '../../lib/input/index.js';
//import { EMAIL } from 'regexp_inspections.js';
import {checkEmail} from 'containers/Profile/verifications.js' 

/*
* а если как надо => Profile будет ошибка
* 
* вставляя функцию в компонент, на прямую => все норм (ниже она закомментирован)
* 
* Вывод: предположительно дело в react-e, когда большая буква, он думает что это компонент, а при сборке webpack-ом, они просто ссылаются на эти функции
* 
* p.s. интересности, не так ли :) 
* */


const factory = (Input) => {

    class InputEmail extends React.Component {

        static propTypes = {
            label: React.PropTypes.string,
            error: React.PropTypes.string,
            value: React.PropTypes.string.isRequired,
            hint: React.PropTypes.string,
            required: React.PropTypes.bool,

        }


        handleBlur(e) {

            const error = checkEmail(e.target.value, this.props.required);

            if (error.hasMistake) {

                const state = {
                    value: this.props.value,
                    error: error.mes
                };
                this.props.onChange(state)
            }


        }


        handleChange(value) {
            /* if (EMAIL.test(value)) {
             return
             }*/

            const state = {
                value: value,
                error: ''
            };

            //this.setState(state)
            this.props.onChange && this.props.onChange(state)
        }

       /* checkEmail(val, required) {
            var regexp = /.+@.+\..+/i, regexp2 = /[а-яё]/i;


            if (required && !val.length) {

                return {
                    hasMistake: true,
                    type: 0,
                    mes: ERR_required
                }
            }

            if (val.length && (!regexp.test(val) || regexp2.test(val))) {

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
        }*/

        render() {


            return <Input
                required={this.props.required}
                hint={this.props.hint || 'введите E-mail'}
                //theme={this.props.theme}
                label={this.props.label || 'E-mail'}
                disabled={!!this.props.disabled}
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                maxLength={50}
                error={this.props.error}
            />
        }
    }

    return InputEmail
};

const decoratedInput = factory(Input);
//const ThemedInput = themr('Default', theme)(decoratedInput);

//export {theme as InputUserName__DefaultTheme}
export {decoratedInput as InputEmail}
