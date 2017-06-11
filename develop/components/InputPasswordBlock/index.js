import React, {PropTypes, Component} from 'react'
import Input from '../../lib/input/index.js';
//import { account } from 'identifiers.js'
import {checkPassword} from 'containers/Profile/verifications.js'

import { OLD_PASS,OLD_PASS_ERR, NEW_PASS, NEW_PASS_REPEAT, NEW_PASS_ERR, NEW_PASS_REPEAT_ERR } from '../../constants'

class PasswordsBlock extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        newPas: PropTypes.string,
        newPasErr: PropTypes.string,
        newPasRepeat: PropTypes.string,
        newPasRepeatErr: PropTypes.string,
        oldPas: PropTypes.string,
        oldPasErr: PropTypes.string,
        onChange: PropTypes.func,
        togglePasswordsBlock: PropTypes.func
    }

    setOnChange = (inputName, inputErr) => (val) => {
        const reqexp = /\s/i;
        if(reqexp.test(val)){
            return
        }

        const state = {
            [inputName]:val,
            [inputErr]: ''
        }

        this.props.onChange(state)
    }

    setHandleBlur = (input_name, input_err) => () => {
        const error = checkPassword(this.props[input_name],
            true,
            input_name == OLD_PASS ? 'old' : 'new',
            input_name == NEW_PASS_REPEAT ? this.props[NEW_PASS] : null);

        if (error.hasMistake) {
            const state = {
                [input_err]: error.mes
            };
            this.props.onChange(state)
        }


    }


    render() {
        const {active, togglePasswordsBlock, oldPas, oldPasErr, newPas, newPasErr, newPasRepeat, newPasRepeatErr} = this.props;

        if (!active) {
            return (
                <div className="accountPoint">
                    <div className="accountPoint--innerWrap">
                        <Input label="Пароль"
                               onClickLink={togglePasswordsBlock}
                               link={"Изменить"}
                               value={'123456789'} type="password" required onlyRead/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="accountPasswordBlock">
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <Input onChange={this.setOnChange(OLD_PASS, OLD_PASS_ERR)} onBlur={this.setHandleBlur(OLD_PASS, OLD_PASS_ERR)} value={oldPas} error={oldPasErr} label="Введите старый пароль" onClickLink={togglePasswordsBlock} link={'Отменить'} type="password" required/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <Input onChange={this.setOnChange(NEW_PASS, NEW_PASS_ERR)} onBlur={this.setHandleBlur(NEW_PASS, NEW_PASS_ERR)} value={newPas} error={newPasErr}  label="Введите новый пароль"type="password" required/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <Input onChange={this.setOnChange(NEW_PASS_REPEAT, NEW_PASS_REPEAT_ERR)} onBlur={this.setHandleBlur(NEW_PASS_REPEAT, NEW_PASS_REPEAT_ERR)} value={newPasRepeat} error={newPasRepeatErr}  label="Повторите новый пароль" type="password" required/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default PasswordsBlock
