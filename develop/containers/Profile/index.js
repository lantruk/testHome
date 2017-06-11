import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux'
import smoothOpacity from "../../decorators/smoothOpacity.js";


import {
    ACCOUNT,
    MEDCART,
    GOALS,
    PRIVACY,
    DEVICES,
    DEFAULT_MALE_AVATAR_IMG,
    DEFAULT_FEMALE_AVATAR_IMG,
    FEMALE,
    AVATAR_CROP,
    BACKGROUND_CROP
} from '../../constants'
import "./profile.scss";
import Dialog from '../../lib/dialog'
import Account from './account'
import Medcart from './medcart'
import Goals from './goals'
import Privacy from './privacy'
import Button from 'components/Buttons'
import classnames from 'classnames';
import Cropper from 'components/cropper/avatarCropper.js'
import {AccountIcon, GoalsIcon, MedcartIcon, PrivacyIcon} from 'components/icons/profile_navigation_icons'

class ProfileContainer extends Component {

    static propTypes = {}

    constructor(props) {
        super()

        const {background, avatar} = props;

        this.state = {
            contentName: ACCOUNT, //заглушка
            //contentName: MEDCART,
            [AVATAR_CROP]: false,
            [BACKGROUND_CROP]: false,
            savingMessageType: '',
            savingMessageText: '',
            endingDialogActive: false,
            savingMessageIsOpen: false,
            savingMessageStartAnim: false,
            avatar: avatar,
            background: background,
            wrapLoader: false
        }
    }

    componentDidMount() {
        document.body.classList.remove('__greyBackground')
    }

    componentWillUnmount() {
        this.cropperTimer && clearTimeout(this.cropperTimer)
        document.body.classList.add('__greyBackground')
    }

    saveCallback(type) {
        var _this = this;

        return function (value) {
            _this.setState({
                [type]: value
            })
        }
    }

    navigateTo = (contentName) => () => {
        //app.router.navigate('/new_profile/account', true);
        this.setState({contentName: contentName})
    }

    navigateToDevices() {
        // app.router.navigate('my_devices', true)
    }

    goNextRedux = (goTo) => {
        this.setState({
            contentName: goTo
        })
    }

    goNext = () => {
        const content = this.state.contentName;

        const map = {
            [ACCOUNT]: MEDCART,
            [MEDCART]: GOALS,
            [GOALS]: PRIVACY,
            [PRIVACY]: DEVICES
        };


        const nextSection = map[content];

        //nextSection !== DEVICES ? this.navigateTo(nextSection) : app.router.navigate('my_devices', true);
        nextSection !== DEVICES ? this.navigateTo(nextSection) : this.setState({endingDialogActive: true});
    }

    openAvatarCropDialog = (AvaOrBackGround) => () => {
        //покажем лоадер на случай если картинка попадется грузная и будет долго рендерится кроппер
        this.setState({
            wrapLoader: true
        })

        //Таймаут на открытие диалого кропера нужен чтобы засветить кроппер после того как засветится
        //лоадер иначе он просто не появится
        this.cropperTimer = setTimeout(() => {
            this.setState({
                [AvaOrBackGround]: true
            })
        }, 200)
    }

    closeAvaterCropDialog = (AvaOrBackGround) => () => {
        this.setState({
            wrapLoader: false,
            [AvaOrBackGround]: false
        })
    }

    saveDefAvaFromGender = (gender) => {


        if (this.state.avatar == DEFAULT_MALE_AVATAR_IMG || this.state.avatar == DEFAULT_FEMALE_AVATAR_IMG) {

            const image = gender == FEMALE ? DEFAULT_FEMALE_AVATAR_IMG : DEFAULT_MALE_AVATAR_IMG;

            this.setState({avatar: image})

            this.props.model.set({avatar_url: image})
        }
    }

    saveAvatar = (AvaOrBackGround, needUpdate) => {

        let newState = {
            savingMessageType: 'success',
            savingMessageText: 'Изображение сохранено',
            savingMessageIsOpen: true,
            savingMessageStartAnim: true
        };


        if (AvaOrBackGround === AVATAR_CROP) {
            return (needUpdate, image) => {


                if (needUpdate) {
                    this.setState({avatar: image, [AvaOrBackGround]: false})
                    this.props.model.set('avatar_url', image)

                    newState.avatar = image

                    const callback = ()=> {
                        this.setState(newState)
                    };

                    saveAvatar.call(this, image, true, callback)
                } else {
                    this.setState({[AvaOrBackGround]: false})
                }
            }
        }

        if (AvaOrBackGround === BACKGROUND_CROP) {
            return (needUpdate, image) => {

                if (needUpdate) {
                    this.setState({background: image, [AvaOrBackGround]: false})
                    this.props.model.set('background_image_url', image)

                    newState.background = image

                    const callback = ()=> {
                        this.setState(newState)
                    };

                    saveBackground.call(this, image, true, callback)
                } else {
                    this.setState({[AvaOrBackGround]: false})
                }
            }
        }

    }

    onSaveMessage = (type, text) => {
        this.setState({
            savingMessageType: type,
            savingMessageText: text,
            savingMessageIsOpen: true,
            savingMessageStartAnim: true
        })
    }

    removeMessage = () => {
        this.setState({
            savingMessageIsOpen: false
        })
    }

    onStart = () => {
        this.setState({
            savingMessageStartAnim: false
        })
    }

    toggleLoader = (show) => {
        //show = true/false
        this.setState({
            wrapLoader: show
        })
    }

    navigationBlockRender() {
        //const model = this.props.model;
        const first_name = this.props.profile.first_name//model.get('first_name');
        const last_name = this.props.profile.last_name//model.get('last_name');
        const name = first_name + (last_name ? ' ' + last_name : '');

        return (
            <div className="profileHeader">
                <h3 className="profileHeader--UserFullName">{name}</h3>
                <nav className="profileNavigation">
                    <div onClick={this.navigateTo(ACCOUNT)}
                         className={classnames("profileNavigation--icon",{['__active'] : this.state.contentName == ACCOUNT})}>
                        <AccountIcon />
                    </div>
                    <div onClick={this.navigateTo(MEDCART)}
                         className={"profileNavigation--icon " + (this.state.contentName == MEDCART ? ' __active' : '')}>
                        <MedcartIcon />
                    </div>
                    <div onClick={this.navigateTo(GOALS)}
                         className={"profileNavigation--icon "  + (this.state.contentName == GOALS ? ' __active' : '')}>
                        <GoalsIcon />
                    </div>
                    <div onClick={this.navigateTo(PRIVACY)}
                         className={"profileNavigation--icon "  + (this.state.contentName == PRIVACY ? ' __active' : '')}>
                        <PrivacyIcon />
                    </div>
                </nav>
            </div>
        )
    }


    renderUnFilledHeader() {
        let headText, num, necessarily, clarify;

        switch (this.state.contentName) {
            case ACCOUNT:
                headText = 'Настройки аккаунта';
                num = '1.';
                necessarily = true;
                break;
            case MEDCART:
                headText = 'Медицинская карта';
                num = '2.';
                clarify = 'На основе биометрических данных мы рассчитываем для вас наилучший вариант двигательной активности';
                necessarily = false;
                break;
            case GOALS:
                headText = 'Цели и нормы';
                num = '3.';
                clarify = 'Установите цели и достигайте результатов вместе с ONETRAK';
                break;
            case PRIVACY:
                headText = 'Настройки приватности';
                num = '4.';
                break;
        }

        return <UnFilledHeader {...{headText, num, necessarily, clarify}}  />
    }

    renderContent() {
        const {model, isUnfilled} = this.props;

        switch (this.state.contentName) {
            case ACCOUNT:
                return <Account
                    //model={model} 
                    //isUnfilled={isUnfilled}
                    goNextRedux={this.goNextRedux}
                    goNext={this.goNext}
                    onSaveMessage={this.onSaveMessage}
                    toggleLoader={this.toggleLoader}
                />

            case MEDCART:
                return <Medcart
                    //model={model}
                    //isUnfilled={isUnfilled}
                    goNext={this.goNext}
                    goNextRedux={this.goNextRedux}
                    saveDefAvaFromGender={this.saveDefAvaFromGender}
                    onSaveMessage={this.onSaveMessage}
                    toggleLoader={this.toggleLoader}
                />


                return
            case GOALS:
                return <Goals
                    //model={model}
                    //isUnfilled={isUnfilled}
                    goNextRedux={this.goNextRedux}
                    goNext={this.goNext}
                    onSaveMessage={this.onSaveMessage}
                    toggleLoader={this.toggleLoader}
                />
            case PRIVACY:
                return <Privacy
                    //model={model}
                    //isUnfilled={isUnfilled}
                    goNextRedux={this.goNextRedux}
                    goNext={this.goNext}
                    onSaveMessage={this.onSaveMessage}
                    toggleLoader={this.toggleLoader}
                />
        }
    }

    renderHeader(isUnfilled) {


        return (
            <div className="profileHead">
                <div className="profileHead--UserBackgroundImage--wrap">
                    <div style={{ backgroundImage: 'url(' + this.state.background + ')'} }
                         className="profileHead--UserBackgroundImage"></div>
                    <div className="profileHead--UserBackgroundImage--Gradient"></div>
                </div>
                <div className="profileHead--innerWrap">
                    <div onClick={this.openAvatarCropDialog(AVATAR_CROP)}
                         className={classnames("profileUserAvatarImage",{
                         "profileUserAvatarImage__default": this.state.avatar === DEFAULT_MALE_AVATAR_IMG || this.state.avatar === DEFAULT_FEMALE_AVATAR_IMG
                         })}>
                        <div style={{ backgroundImage: 'url(' + this.state.avatar + ')'}}
                             className="profileUserAvatarImage--Image"></div>
                        <div className="profileImageEditButton profileImageEditButton__avatar"></div>

                    </div>
                    {isUnfilled ? null : this.navigationBlockRender()}
                    <div onClick={this.openAvatarCropDialog(BACKGROUND_CROP)}
                         className="profileImageEditButton profileImageEditButton__background"></div>
                </div>
                <Cropper type={AVATAR_CROP}
                         active={this.state[AVATAR_CROP]}
                         image={this.state.avatar}
                         onClose={this.closeAvaterCropDialog(AVATAR_CROP)}
                         saveAvatar={this.saveAvatar(AVATAR_CROP)}
                />
                <Cropper type={BACKGROUND_CROP}
                         active={this.state[BACKGROUND_CROP]}
                         image={this.state.background}
                         onClose={this.closeAvaterCropDialog(BACKGROUND_CROP)}
                         saveAvatar={this.saveAvatar(BACKGROUND_CROP)}
                />
            </div>
        )
    }

    render() {
        const isUnfilled = this.props.isUnfilled;


        const content = this.renderContent();

        const {savingMessageType, savingMessageText, savingMessageIsOpen, savingMessageStartAnim, contentName, endingDialogActive, wrapLoader} = this.state;


        return (
            <section>
                {/*savingMessageIsOpen ?
                 <Notification type={savingMessageType} text={savingMessageText}
                 startAnim={this.state.savingMessageStartAnim}
                 onStart={this.onStart}
                 onEnd={this.removeMessage}/>
                 : null*/}
                {isUnfilled ? this.renderUnFilledHeader() : null}
                { !isUnfilled || (isUnfilled && contentName == ACCOUNT) ? this.renderHeader(isUnfilled) : null}
                <div className="profileContent">
                    {content}
                </div>

                <Dialog active={false/*endingDialogActive*/} type="endingPopup" light>
                    <div className="profileEndingPopup">
                        <h2 className="profileEndingPopup--title">Поздравляем!</h2>
                        <p className="profileEndingPopup--messaage">
                            Вы успешно заполнили профиль в вашем аккаунте. Чтобы перейти в Мой Trak — подключите
                            устройство ONETRAK в разделе мои устройства
                        </p>
                        <Button onClick={this.navigateToDevices} text="Мои устройства" style={{padding: '13px 37px'}}/>
                    </div>
                </Dialog>
                {/*<WrapLoader active={wrapLoader} needBackground={false}/>*/}
            </section>
        )

    }

}

function UnFilledHeader(props) {
    const {headText, num, necessarily, clarify} = props;

    return (
        <div className="propfileUnFilledHeader">
            <h2>Профиль</h2>
            <h3 className={!clarify && !necessarily ? '__noPaddingBottom' : ''}>
                <span className="propfileUnFilledHeader--sectionNum">{num}</span>
               <span className="propfileUnFilledHeader--sectionText">
                   <p className="propfileUnFilledHeader--sectionText--title">{headText}</p>
                   {necessarily ?
                       <p className="propfileUnFilledHeader--sectionText--sign">обязательная информация *</p> : null}
               </span>
            </h3>
            {clarify ? <p className="propfileUnFilledHeader--clarify">{clarify}</p> : null}
        </div>
    )
}

UnFilledHeader.propTypes = {
    headText: React.PropTypes.string.isRequired,
    num: React.PropTypes.string.isRequired,
    necessarily: React.PropTypes.bool,
    clarify: React.PropTypes.string
}

export default connect(state => ({
    profile: state.profile.toJS(),
    isUnfilled: state.profile.getIn(['profileVerify', 'isMistake']),
    avatar: state.profile.get('avatar_url'),
    background: state.profile.get('background_image_url')
}), {})(smoothOpacity(ProfileContainer))


