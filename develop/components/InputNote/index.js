import Input from '../../lib/input/index.js';

//import {checkEmail} from 'containers/Profile/verifications.js'



const factory = (Input) => {

    class InputNote extends React.Component {

        static propTypes = {
            label: React.PropTypes.string,
            error: React.PropTypes.string,
            value: React.PropTypes.string.isRequired,
            hint: React.PropTypes.string,
            required: React.PropTypes.bool,
            theme: React.PropTypes.shape({
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
            })
        }

       /* handleBlur(e) {
            const error = checkEmail(e.target.value, this.props.required);

            if (error.hasMistake) {

                const state = {
                    value: this.props.value,
                    error: error.mes
                };
                this.props.onChange(state)
            }


        }
*/


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

        render() {
//onBlur={this.handleBlur.bind(this)}
          //debugger
            return <Input

                required={this.props.required}
                hint={this.props.hint || 'Введите заметку'}
                //theme={this.props.theme}
                label={this.props.label || 'Заметка'}
                disabled={!!this.props.disabled}
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                maxLength={120}
                //error={this.props.error}
                />
        }
    }


    return InputNote
};

const decoratedInput = factory(Input);
//const ThemedInput = themr('Default', theme)(decoratedInput);

//export {theme as InputUserName__DefaultTheme}
export { decoratedInput as InputNote }
