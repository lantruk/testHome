import React, {PropTypes, Component} from 'react';
import Button from './index';

export default function SaveButton(props) {
    const text = props.next ? 'Далее' : 'Сохранить';
   
    return <Button {...props} style={{lineHeight: "47px", width:"188px"}} text={text}/>
}

SaveButton.propTypes = {
    text: PropTypes.string, // Сохранить
    type: PropTypes.oneOf(['grey']), // Цвет Злолото (по умолчанию) или Серый
    onClick: PropTypes.func // Переход в ...
}

