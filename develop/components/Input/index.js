import React from 'react';
import classnames from 'classnames';

import InjectedFontIcon from '../font_icon/FontIcon.js';
import MaskedInput from 'react-input-mask';


const factory = (FontIcon) => {
  class Input extends React.Component {
    static propTypes = {
      children: React.PropTypes.any,
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      onlyRead: React.PropTypes.bool,
      error: React.PropTypes.string,
      floating: React.PropTypes.bool,
      hint: React.PropTypes.string,
      link: React.PropTypes.string,
      mask: React.PropTypes.string,
      icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ]),
      label: React.PropTypes.string,
      maxLength: React.PropTypes.number,
      multiline: React.PropTypes.bool,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onClickLink: React.PropTypes.func,
      onKeyPress: React.PropTypes.func,
      required: React.PropTypes.bool,
      type: React.PropTypes.string,
      value: React.PropTypes.any
    };

    static defaultProps = {
      className: '',
      hint: '',
      disabled: false,
      floating: true,
      multiline: false,
      required: false,
      type: 'text'
    };

    componentDidMount () {
      window.addEventListener('resize', this.handleAutoresize);
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.multiline && nextProps.multiline) {
        window.addEventListener('resize', this.handleAutoresize);
      } else if (this.props.multiline && !nextProps.multiline) {
        window.removeEventListener('resize', this.handleAutoresize);
      }
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleAutoresize);
    }

    handleChange = (event) => {
      const value = event.target.value;

      if (this.props.multiline) {
        this.handleAutoresize();
      }


      if (this.props.onChange) this.props.onChange(value, event);
    };

    handleAutoresize = () => {
      if(this.props.mask) return


      const element = this.refs.input;
      // compute the height difference between inner height and outer height
      const style = getComputedStyle(element, null);
      const heightOffset = style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      // resize the input to its content size
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight + heightOffset}px`;
    }

    onClickLink = (e) => {
      this.props.onClickLink && this.props.onClickLink(e)
    }

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { children, disabled, onlyRead, className: classNameProp, error, floating, hint, link, icon,
              name, label: labelText, maxLength, multiline, required,
              type, value, ...others} = this.props;
      const length = maxLength && value ? value.length : 0;
      const labelClassName = classnames('input--label', {['input--fixed']: !floating});


      const className = classnames('input--input', classNameProp, {
        'input--disabled': disabled,
        'input--errored': error,
        'input--hidden': type === 'hidden',
        'input--withIcon': icon
      });

      const valuePresent = value !== null
        && value !== undefined
        && value !== ''
        && !(typeof value === Number && isNaN(value));


        //Дополненный функционал клика по ссылке в инпуте не нужно запихивать в сам инпут
        others.onClickLink && delete others.onClickLink

        const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
          ...others,
          className: classnames('input--inputElement', {['input--filled']: valuePresent}),
          onChange: this.handleChange,
          ref: 'input',
          role: 'input',
          name,
          disabled: disabled || onlyRead,
          required,
          type,
          value,
          maxLength
        });


      return (
        <div data-react-toolbox='input' className={className}>
          {InputElement}
          {icon ? <FontIcon className="input--icon" value={icon} /> : null}
          <span className="input--bar"/>
          {labelText
            ? <label className={labelClassName}>
                {labelText}
                {required ? <span className="input--required"> * </span> : null}
              </label>
            : null}
          {hint ? <span className="input--hint">{hint}</span> : null}
          {link ? <span onClick={this.onClickLink} className="input--link">{link}</span> : null}
          {error ? <span className="input--error">{error}</span> : null}
          {maxLength ? <span className="input--counter">{length}/{maxLength}</span> : null}
          {children}
        </div>
      );
    }
  }

  return Input;
};

//const Input = factory(InjectedFontIcon);
const Input = factory();

export default Input
