import React, {PropTypes, Component} from 'react';
import ScrollArea from './ScrollArea.js';
import classnames from 'classnames';
//import { themr } from 'react-css-themr';
//import { SCROLL_BAR } from '../identifiers.js';
//import './scrollBarSelectType.scss';
import './scrollBarAutocomlete.scss';


class CustomScroll extends Component {
    static propTypes = {
        theme: PropTypes.shape({
            area: PropTypes.string,
            container: PropTypes.string
        }).isRequired,
        children: PropTypes.element
    }


    render() {

        const {theme, active, children, topPosition} = this.props;

        const scrollbarStyles = {borderRadius: 5};

        const scrollArea = <ScrollArea
            topPosition={topPosition}
            active={active}
            className={classnames(theme.area, {[theme.active]: active})}
            contentClassName={theme.content}
            verticalScrollbarStyle={scrollbarStyles}
            verticalContainerStyle={scrollbarStyles}
            smoothScrolling={true}
            minScrollSize={40}
        >
            {children}
        </ScrollArea>


        return scrollArea

    }
}


const CustomScrollArea = (ScrollAreaRedux)=> class ScrollArea extends Component {
    
    render() {
        return (
            <ScrollAreaRedux {...this.props}
                
                theme={{area: "cunstomScrollBar__area"}}/>
        )
    }
}

const SelectCustomScroll = CustomScroll//themr(SCROLL_BAR, theme)(CustomScroll);
const AutocomleteCustomScroll = CustomScrollArea(CustomScroll)//themr(SCROLL_BAR, theme1)(CustomScroll);


export default SelectCustomScroll
export {AutocomleteCustomScroll, SelectCustomScroll}
//export default CustomScroll


