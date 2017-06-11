import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {InputUserName} from 'components/InputUserName'
import {InputEmail} from 'components/InputEmail'
import {InputPhoneNumber} from 'components/InputPhoneNumber'
import InputVKCities from 'components/InputAutocompleteCities'
import InputVKCountries from 'components/InputAutocompleteCountries'
import PasswordsBlock from 'components/InputPasswordBlock'
import {getCountryIdFromName} from 'containers/Profile/getVKCountries.js';
//import removeSocialAccounts from 'middlewares/removeSocialAccounts.js';
import SaveButton from 'components/Buttons/profile_save_button'
import {VkIcon, FbIcon, OkIcon} from 'components/icons/social_icons'
import {accountVerify} from './totalVerify.js';
import {ERR_required} from './verifications'
import {MEDCART} from '../../constants'

//import saveAccount from 'middlewares/saveAccount.js';
import {
    FIRST_NAME,
    FIRST_NAME_ERR,
    LAST_NAME,
    LAST_NAME_ERR,
    MIDDLE_NAME,
    MIDDLE_NAME_ERR,
    COUNTRY,
    COUNTRY_ERR,
    COUNTRY_ID,
    CITY,
    CITY_ID,
    CITY_ERR,
    EMAIL,
    EMAIL_ERR,
    PHONE,
    PHONE_ERR,
    OLD_PASS,
    NEW_PASS,
    NEW_PASS_REPEAT,
    OLD_PASS_ERR,
    NEW_PASS_ERR,
    NEW_PASS_REPEAT_ERR,
    FB,
    VK,
    OK_SOC
} from '../../constants'


class Account extends Component {

    static propTypes = {
        // model: PropTypes.object.isRequired,
        //isUnfilled: PropTypes.bool,
        goNext: PropTypes.func,
        onSaveMessage: PropTypes.func,
        toggleLoader: PropTypes.func
    }


    constructor(props) {
        super()


        const {profileVerify, first_name, last_name, middle_name, country, city, email, phone_number} = props.profile

        //const verify = profileVerify.account;

        const acounts = props.profile.social_accounts

        let vk = false, fb = false, okSoc = false;

        acounts.forEach(item => {
            if (item.provider === VK) vk = true
            if (item.provider === FB) fb = true
            if (item.provider === OK_SOC) okSoc = true;

        })

        this.state = {
            passwordBlockActive: false,
            [FIRST_NAME]: first_name,
            [FIRST_NAME_ERR]: first_name ? '' : ERR_required,//Делаем так если нада чтобы сразу засветились красными
            [LAST_NAME]: last_name,
            [LAST_NAME_ERR]: last_name ? '' : ERR_required,
            [MIDDLE_NAME]: middle_name,
            //[MIDDLE_NAME_ERR]: verify.middleName && verify.middleName.mes,
            [MIDDLE_NAME_ERR]: '',
            [COUNTRY]: country ? country.name : '',
            [COUNTRY_ERR]: country.name ? '' : ERR_required,
            [COUNTRY_ID]: country ? country.vk_id : '',
            [CITY]: city ? city.name : '',
            //[CITY]: city ? city.name + (city.area == undefined || city.area == '' ?  '' :  ', ' + city.area) + (city.region == undefined || city.area == '' ?  '' :  ', ' + city.region) : '', // region: "область",   area: 'район',
            [CITY_ID]: city ? city.vk_id : '',
            [CITY_ERR]: ERR_required,
            [EMAIL]: email,
            [EMAIL_ERR]: '',
            [PHONE]: phone_number || '',
            [PHONE_ERR]: '',
            [OLD_PASS]: '',
            [OLD_PASS_ERR]: '',
            [NEW_PASS]: '',
            [NEW_PASS_ERR]: '',
            [NEW_PASS_REPEAT]: '',
            [NEW_PASS_REPEAT_ERR]: '',
            [VK]: vk,
            [FB]: fb,
            [OK_SOC]: okSoc
        }

    }

    componentWillUnmount() {
        this.xhr = undefined

        clearTimeout(this.mesTimer)
    }

    setOnChangeCallback = (val, err) => (state) => {
        //Карта для формирования нужых ключей для нового стате
        const map = {
            value: val,
            error: err,
            [COUNTRY]: val,
            [CITY]: val,
            [COUNTRY_ID]: COUNTRY_ID,
            [CITY_ID]: CITY_ID
        };

        //Если это страна нужно ID поменять
        if (val == COUNTRY) {
            state[COUNTRY_ID] = getCountryIdFromName(state[COUNTRY])
        }

        let newState = {};

        //Транформируем стате с нужными ключами
        Object.keys(state).forEach((key)=> {
            newState[map[key]] = state[key]
        })

        //Для удобства ошибки будем хранить булевыми
        //newState[err] = !!(newState[err]) !! не будем потому что ошибки сверху приходят

        this.setState(newState)
    }

    onChangePasswords = (state) => {
        this.setState(state)

    }


    verifyAndSave = () => {


        const {
            passwordBlockActive, first_name, middle_name, last_name, country_err, city_err, city_id, email, phone_number,
            oldPas, city, country, newPas, newPasRepeat
        } = this.state;
        /*let {last_name_err, first_name_err, middle_name_err, email_err,
         oldPasErr, newPasErr, newPasRepeatErr} = this.state;*/

        //Это дополнительный вызов, но только так можно засветить красное не сразу при открытии
        // а только при нажатии на кнопку

        const verify = accountVerify({
            first_name, last_name, middle_name, email, phone_number,
            passwordBlockActive, oldPas, newPas, newPasRepeat, city_err, city_id
        });

        let state = {
            first_name_err: verify.firstName.mes,
            last_name_err: verify.lastName.mes,
            middle_name_err: verify.middleName.mes,
            email_err: verify.eMail.mes,
            phone_err: verify.phone_num.mes
        };

        if (passwordBlockActive) Object.assign(state, {
            oldPasErr: verify.old_pas.mes,
            newPasErr: verify.new_pas.mes,
            newPasRepeatErr: verify.new_pas_repeat.mes
        })


        this.setState(state)

        if (verify.hasMistake || country_err) {
            return
        }


        /* const callback = this.props.isUnfilled ? this.props.goNext : (...arg)=> {
         this.props.onSaveMessage(...arg)
         this.closeAndResetPasswords()
         };*/

        let newObjToApi = {}

        first_name !== this.props.profile.first_name && Object.assign(newObjToApi, {first_name})
        last_name !== this.props.profile.last_name && Object.assign(newObjToApi, {last_name})
        middle_name !== this.props.profile.middle_name && Object.assign(newObjToApi, {middle_name})
        email !== this.props.profile.email && Object.assign(newObjToApi, {email})
        passwordBlockActive && Object.assign(newObjToApi, {
            'old_password': oldPas,
            'new_password': newPas,
            'new_password_confirm': newPasRepeat
        })
        phone_number !== this.props.profile.phone_number && Object.assign(newObjToApi, {phone_number})
        country !== this.props.profile.country.name && Object.assign(newObjToApi, {'country': country})
        city !== this.props.profile.city && Object.assign(newObjToApi, {'city': city})

        /* console.info('state', first_name)
         console.info('stor', this.props.profile.first_name)
         console.info('==',  first_name !== this.props.profile.first_name)
         */

        console.info('----', newObjToApi)
        //this.props.goNextRedux(MEDCART)
        // saveAccount.call(this, callback)

    }

    togglePasswordsBlock = () => {
        const isActive = this.state.passwordBlockActive;

        //При выключении сбросим парольки и ошибки
        if (isActive) {
            this.closeAndResetPasswords()
        } else {
            this.setState({passwordBlockActive: true})
        }
    }

    closeAndResetPasswords() {
        this.setState({
            passwordBlockActive: false,
            [OLD_PASS]: '',
            [OLD_PASS_ERR]: '',
            [NEW_PASS]: '',
            [NEW_PASS_ERR]: '',
            [NEW_PASS_REPEAT]: '',
            [NEW_PASS_REPEAT_ERR]: ''
        })
    }

    addSocialAccount = (id) => () => {

        this.props.toggleLoader && this.props.toggleLoader(true)

        window.location.href = '/profiles/' + id + '/login/?process=connect&next=%2Fmytrak%2F%23my_profile';
    }

    removeSocialAccount = (name, _this) => () => {
        console.info('отключить аккаунт')
        //removeSocialAccounts.call(_this, name)
    }

    renderSocialAccount(data) {

        return (
            <div key={data.data_val} className="accountSocialAccount">
                <div className="accountSocialAccount--innerWrap">
                    <div className="accountSocialAccount--IconColumn">
                        <span className="accountSocialAccount--Icon accountSocialAccount--Icon__FB">
                            {data.isConnect ? <a href={'http://' + data.link}>{data.icon}</a> : data.icon}
                        </span></div>
                    {data.isConnect ?
                        <div className="accountSocialAccount--ContentColumn">
                            <span className="accountSocialAccount--UserName">{data.name}</span>
                            <span className="accountSocialAccount--Link">{data.link}<span
                                onClick={this.removeSocialAccount(data.data_val, this)}
                                className="accountSocialAccount--RemoveButton">Отключить</span></span>
                        </div> :
                        <div className="accountSocialAccount--ContentColumn">
                            <span onClick={this.addSocialAccount(data.data_val)}
                                  className="accountSocialAccount--AddButton">Добавить</span>
                            {data.isDublicate ?
                                <span className="accountSocialAccount--ErrorText">* Аккаунт, который вы пытаетесь подключить, уже привязан к другой учетной записи</span> : null}
                        </div>}
                </div>
            </div>
        )

    }

    renderSocialAccounts() {

        const acounts = this.props.social_accounts

        const duplicate_accounts = undefined//this.props.duplicate_socialaccount (не понятно откуда берется)


        let vkData = {
                isConnect: false,
                isDublicate: duplicate_accounts && duplicate_accounts.provider == VK ? true : false,
                data_val: VK,
                icon: <VkIcon />
            },
            fbData = {
                isConnect: false,
                isDublicate: duplicate_accounts && duplicate_accounts.provider == FB ? true : false,
                data_val: FB,
                icon: <FbIcon />
            },
            okData = {
                isConnect: false,
                isDublicate: duplicate_accounts && duplicate_accounts.provider == OK_SOC ? true : false,
                data_val: OK_SOC,
                icon: <OkIcon />
            },
            Items = [];


        acounts.forEach((item) => {
            //var keys = JSON.parse(item.extra_data);
            const keys = item.extra_data;

            //VK
            if (item.provider === 'vk') {
                Object.assign(vkData, {
                    isConnect: true,
                    name: (keys.first_name || 'Подключен') + ' ' + (keys.last_name || ''),
                    link: 'vk.com/' + (keys.screen_name || ''),
                })
            }


            if (item.provider === 'facebook') {
                Object.assign(fbData, {
                    isConnect: true,
                    name: keys.name || 'Подключен',
                    link: 'facebook.com/' + (keys.id || ''),
                });
            }

            if (item.provider === 'odnoklassniki') {
                Object.assign(okData, {
                    isConnect: true,
                    name: keys.name || 'Подключен',
                    link: 'odnoklassniki.ru/' + (keys.screen_name || ''),
                });
            }

            /* if (item.provider === 'twitter') {
             data = {
             name: keys.name || 'Подключен',
             link: 'twitter.com/' + (keys.screen_name || ''),
             data_val: item.provider
             };
             }*/


        })


        Items.push(this.renderSocialAccount(vkData))
        Items.push(this.renderSocialAccount(fbData))
        Items.push(this.renderSocialAccount(okData))

        return (
            <div className="accountSocialAccountWrap">
                {Items}
            </div>
        )
    }


    render() {
        //debugger


        const isUnfilled = this.props.isUnfilled;
        const {
            passwordBlockActive, oldPas, oldPasErr, newPas, newPasErr, newPasRepeat, newPasRepeatErr, first_name, first_name_err, last_name, last_name_err, middle_name, middle_name_err,
            country, country_id, country_err, city, city_err, email, email_err, phone_number, phone_err
        } = this.state;

        return (
            <section className="profileContentContainer">
                <div className="accountPointsWrap">
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputUserName onChange={this.setOnChangeCallback(FIRST_NAME, FIRST_NAME_ERR)}
                                           error={first_name_err} value={first_name} firstName required/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputUserName onChange={this.setOnChangeCallback(LAST_NAME, LAST_NAME_ERR)}
                                           error={last_name_err} value={last_name} lastName required/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputUserName onChange={this.setOnChangeCallback(MIDDLE_NAME, MIDDLE_NAME_ERR)}
                                           error={middle_name_err} value={middle_name} patronymicName/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            { <InputVKCountries
                                country={country}
                                onChange={this.setOnChangeCallback(COUNTRY, COUNTRY_ERR)}
                                error={country_err} required/>}
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputVKCities
                                city={city}
                                disabled={country_id ? false : true}
                                country_id={country_id}
                                error={city_err}
                                onChange={this.setOnChangeCallback(CITY, CITY_ERR)}/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputPhoneNumber onChange={this.setOnChangeCallback(PHONE, PHONE_ERR)} error={phone_err}
                                              value={phone_number}/>
                        </div>
                    </div>
                    <div className="accountPoint">
                        <div className="accountPoint--innerWrap">
                            <InputEmail onChange={this.setOnChangeCallback(EMAIL, EMAIL_ERR)} error={email_err}
                                        value={email} required/>
                        </div>
                    </div>
                    <PasswordsBlock oldPas={oldPas}
                                    newPas={newPas}
                                    newPasRepeat={newPasRepeat}
                                    oldPasErr={oldPasErr}
                                    newPasErr={newPasErr}
                                    newPasRepeatErr={newPasRepeatErr}
                                    active={passwordBlockActive}
                                    togglePasswordsBlock={this.togglePasswordsBlock}
                                    onChange={this.onChangePasswords}
                    />
                </div>

                {this.renderSocialAccounts()}

                <div className="profileSaveButtonWrap">
                    <SaveButton onClick={this.verifyAndSave} next={isUnfilled}/>
                </div>
            </section>
        )
    }

}


export default connect(state => ({
    profile: state.profile.toJS(),
    isUnfilled: state.profile.getIn(['profileVerify', 'isMistake']),
    // duplicate_socialaccount: state.profile.get('duplicate_socialaccount').toJS(),
    social_accounts: state.profile.get('social_accounts').toJS()
}), {})(Account)

