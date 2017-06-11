import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Cropper from 'lib/react-cropper';
import Dialog from 'lib/dialog';
import DownLoadIcon from 'components/icons/download_file_icon.js';
import {ZoomInIcon, ZoomOutIcon, RotateLeftIcon, RotateRightIcon} from 'components/icons/cropping_image_icons.js';
import {CloseIcon} from 'components/icons/interface_icons.js';
import SaveButton from 'components/Buttons/profile_save_button';
import Loader from 'lib/loader';
import {
    DEFAULT_MALE_AVATAR_IMG, DEFAULT_FEMALE_AVATAR_IMG, DEFAULT_BACKGROUND_IMG, OLD_DEFAULT_AVATAR, AVATAR_CROP,
    BACKGROUND_CROP
} from '../../constants';

const AVA_ASPECT_RATIO = 1; //1 / 1
//const BACK_ASPECT_RATIO = 9;
const BACK_ASPECT_RATIO = Math.smartRound(1054 / 116, 2);// 1 / 9.09 Соотношение взято из макета

export default class Crop extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.oneOf([AVATAR_CROP, BACKGROUND_CROP]),
        saveAvatar: PropTypes.func,
        onClose: PropTypes.func

    }

    constructor(props) {
        super()

        this.opt = this.getCropOptions(props);

        this.state = {
            rotate: 0,
            image: props.image,
            isLoading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        //Меняем фото только если менялся пол, а остальные фото пусть берутся исходники загруженные чтоб снова не грузить если надо поправить
        if (nextProps.image === DEFAULT_MALE_AVATAR_IMG || nextProps.image === DEFAULT_FEMALE_AVATAR_IMG) {
            this.setState({image: nextProps.image})
        }
    }

    getCropOptions(props) {
        const type = props.type;

        let mainOpt = {
            autoCrop: false,
            //autoCropArea: 0.6,
            style: {height: '100%', width: '100%'},//Стили для главного контейнера
            dragMode: 'move',
            // Cropper.js options
            toggleDragModeOnDblclick: false, //Изменение работы на двойной щелчок
            cropBoxMovable: false, //Перемещение области обрезания
            cropBoxResizable: false, //возможность изменять область обрезки
            guides: false, //появление линий синих
            rotatable: true,
            viewMode: 1,
            center: true, //Показывает крестик по центру
            restore: true, //включает установку canvasData и cropperData соответственно изменениям, но работает коряво
            responsive: true, //перестраивается под стили контейнера при изменени разрешения
            zoom(e){ //Функция выполняющаяся при уведичении и уменьшении
                if (e.ratio > e.oldRatio && e.ratio > 5) {
                    return false
                }

            },
            autoCropArea: 1,
            resize(){//Добавил обрабочтик на resize - работает толькое если restore = true чтобы не нарушать исходную логику
                this.options.built()
            }
        };

        if (type === AVATAR_CROP) {
            return Object.assign(mainOpt, {
                aspectRatio: AVA_ASPECT_RATIO,
                built: () => {
                    const maxD = 270; //Максимальный диаметр
                    const minVerticalOffset = 60;

                    const container = this.refs.cropper.getContainerData();
                    const canvasData = this.refs.cropper.getCanvasData();

                    // Чтобы круг не залазил на кнопки и надпись будем учитывать их высоту в качестве minVerticalOffset
                    const consideringOffset = container.height - minVerticalOffset * 2;
                    const D = consideringOffset > maxD ? maxD : consideringOffset;

                    this.refs.cropper.setCropBoxData({
                        width: D,
                        height: D,
                        left: container.width / 2 - D / 2,
                        top: container.height / 2 - D / 2
                    })

                    if (this.state.image === DEFAULT_MALE_AVATAR_IMG || this.state.image === DEFAULT_FEMALE_AVATAR_IMG) {
                        this.refs.cropper.setCanvasData({
                            width: maxD,
                            height: maxD,
                            left: container.width / 2 - maxD / 2,
                            top: container.height / 2 - maxD / 2
                        })
                    }

                }
            })
        }

        if (type === BACKGROUND_CROP) {
            return Object.assign(mainOpt, {
                aspectRatio: BACK_ASPECT_RATIO,
                //aspectRatio: 9,
                built: () => {
                    //const minVerticalOffset = 60;

                    const container = this.refs.cropper.getContainerData();
                    const cropBox = this.refs.cropper.getCropBoxData();
                    const canvasData = this.refs.cropper.getCanvasData();

                    const naturalRelation = Math.smartRound(canvasData.width / canvasData.height, 2)

                    this.refs.cropper.setCanvasData({
                        width: container.width,
                        left: 0,
                        top: (container.height / 2) - (container.width / naturalRelation / 2)

                    })

                    const height = Math.round(container.width / BACK_ASPECT_RATIO);

                    this.refs.cropper.setCropBoxData({
                        width: container.width,
                        //left: 0,
                        top: (container.height / 2) - (height / 2)
                    })


                }
            })
        }

    }


    cropAndSave = () => {

        const avaSize = {w: 740, h: 740};
        const backMaxWidth = 2560;

        let needUpdate = true

        if (this.state.image === DEFAULT_MALE_AVATAR_IMG || this.state.image === DEFAULT_FEMALE_AVATAR_IMG ||
            this.state.image === DEFAULT_BACKGROUND_IMG || this.state.image === OLD_DEFAULT_AVATAR) {
            needUpdate = false
        }

        if (this.props.type === AVATAR_CROP) {
            var image = this.refs.cropper.getCroppedCanvas({width: avaSize.w, height: avaSize.h}).toDataURL();
        } else if (this.props.type === BACKGROUND_CROP) {
            const imageData = this.refs.cropper.getImageData();

            const cropSize = {
                width: imageData.naturalWidth > backMaxWidth ? backMaxWidth : imageData.naturalWidth,
                //высоту он и так режит соглавно aspectRatio
                //height: imageData.naturalWidth > backMaxWidth ? Math.round(backMaxWidth / BACK_ASPECT_RATIO) : Math.round(imageData.naturalWidth / BACK_ASPECT_RATIO)
            };

            const img = this.refs.cropper.getCroppedCanvas(cropSize);

            var image = this.refs.cropper.getCroppedCanvas(cropSize).toDataURL();

        }

        this.props.saveAvatar && this.props.saveAvatar(needUpdate, image)
    }

    zoomIn = () => {
        this.refs.cropper.zoom(0.1)
    }

    zoomOut = () => {
        this.refs.cropper.zoom(-0.1)
    }

    rotateRight = () => {
        this.refs.cropper.rotate(90)
    }

    rotateLeft = () => {
        this.refs.cropper.rotate(-90)
    }

    triggerInput = () => {
        this.refs.input.click()
    }

    downloadImage = (e) => {
        this.setState({isLoading: true})

        var file = e.target.files[e.target.files.length - 1];

        if (!file || !(file.type.indexOf('image') + 1)) return


        var reader = new FileReader(),
            _this = this;

        reader.onload = function (e) {
            _this.setState({
                isLoading: false,
                image: e.currentTarget.result
            })
        }

        reader.readAsDataURL(file)
        //this.refs.cropper.getCroppedCanvas()

    }

    render() {
        const {image, isLoading} = this.state;
        const {active, onClose, type} = this.props;
        const opt = this.opt;


        const text = type == 'avatarCrop' ? 'Изменить фотографию' : 'Изменить фоновое изображение';


        return (
            <Dialog type={type} active={active}
                    light
                    onEscKeyDown={onClose}
                    onOverlayClick={onClose}>
                <div onClick={onClose} className="profileCrop--closeIcon"><CloseIcon /></div>
                <h3 className="profileCrop--header">{text}</h3>
                <div className={classnames("profileCrop--body", {
                    ['profileCrop--body__Avatar']: type === AVATAR_CROP,
                    ['profileCrop--body__Background']: type === BACKGROUND_CROP }
                )}>
                    <div className="profileCrop--Tooltip">Выберите область фотографии для отображения в профиле</div>
                    <Cropper
                        src={image}
                        ref='cropper'
                        {...opt}
                    />

                    <div className="profileCrop--IconsRow">
                        <div onClick={this.zoomIn}><ZoomInIcon /></div>
                        <div onClick={this.zoomOut}><ZoomOutIcon /></div>
                        <div onClick={this.rotateLeft}><RotateLeftIcon /></div>
                        <div onClick={this.rotateRight}><RotateRightIcon /></div>
                    </div>
                    {isLoading ? <Loader /> : null}
                </div>
                <div className="profileCrop--downloadIconWrap">
                    <input onChange={this.downloadImage} ref="input" type="file" accept="image/*"/>
                    <div onClick={this.triggerInput}>
                        <DownLoadIcon  />
                    </div>
                </div>
                <SaveButton onClick={this.cropAndSave}/>
            </Dialog>
        );
    }
}
