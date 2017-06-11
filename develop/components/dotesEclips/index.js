import {Component, PropTypes} from 'react';


class DotesEclips extends Component {

    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.number).isRequired, // [1,2,..., n]
        checked: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        checkedColor: PropTypes.string,
        className: PropTypes.string
    }

    setHandler = (id) => (e) => {
        this.props.onChange(id, e)
    }

    render() {
        const className = this.props.className ? 'DotesEclips ' + this.props.className : 'DotesEclips';
        const checkedColor = this.props.checkedColor || '#a5a9b4';


        const list = this.props.list.map(item => {
            const style = {
                backgroundColor: this.props.checked === item ? checkedColor : 'rgba(165, 169, 179, 0.3)'
            };


            return (
                <div key={item} className="DotesEclips--CirclePositionWrap">
                    <div onClick={this.setHandler(item)}
                         className="DotesEclips--CirclePosition"
                         style={style}
                    />
                </div>
            )
        });

        return (
            <div className={className}>
                {list}
            </div>
        )
    }
}

export default DotesEclips