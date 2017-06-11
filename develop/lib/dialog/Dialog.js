import React, { PropTypes } from 'react';
//import { themr } from 'react-css-themr';
import classnames from 'classnames';
//import { DIALOG } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectButton from '../button/Button.js';
import InjectOverlay from '../overlay'//'../overlay/Overlay.js';

const factory = (Overlay, Button) => {

    const theme = {
            active: "dialog__active",
            addPressurePopUp: "dialog__addPressurePopUp",
            avatarCropping: "dialog__avatarCropping",
            avatarViewer: "dialog__avatarViewer",
            backgroundCropping: "dialog__backgroundCropping",
            body: "dialog__body",
            button: "dialog__button",
            dialog: "dialog__dialog",
            endingPopup: "dialog__endingPopup",
            goalsConfirming: "dialog__goalsConfirming",
            large: "dialog__large",
            navigation: "dialog__navigation",
            normal: "dialog__normal",
            small: "dialog__small",
            title: "dialog__title"
        }

  const Dialog = (props) => {
    const actions = props.actions.map((action, idx) => {
      const className = classnames(theme.button, {[action.className]: action.className});
      return <Button key={idx} {...action} className={className} />;
    });

    const className = classnames([theme.dialog, theme[props.type]], {
      [theme.active]: props.active
    }, props.className);


    const type = props.light ? 'light' : null;


    return (
      <Overlay
          type={type}
        active={props.active}
        onClick={props.onOverlayClick}
        onEscKeyDown={props.onEscKeyDown}
        onMouseDown={props.onOverlayMouseDown}
        onMouseMove={props.onOverlayMouseMove}
        onMouseUp={props.onOverlayMouseUp}
      >
        <div data-react-toolbox='dialog' className={className}>
          <section role='body' className={props.theme.body}>
            {props.title ? <h6 className={props.theme.title}>{props.title}</h6> : null}
            {props.children}
          </section>
          {actions.length
            ? <nav role='navigation' className={props.theme.navigation}>
                {actions}
              </nav>
            : null
          }
        </div>
      </Overlay>
    );
  };

  Dialog.propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onEscKeyDown: PropTypes.func,
    onOverlayClick: PropTypes.func,
    onOverlayMouseDown: PropTypes.func,
    onOverlayMouseMove: PropTypes.func,
    onOverlayMouseUp: PropTypes.func,
   /* theme: PropTypes.shape({
      active: PropTypes.string,
      body: PropTypes.string,
      button: PropTypes.string,
      dialog: PropTypes.string,
      navigation: PropTypes.string,
      title: PropTypes.string
    }),*/
    title: PropTypes.string,
    type: PropTypes.string
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    type: 'normal'
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
//export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
