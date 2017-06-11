import {PropTypes, Component} from 'react';
import {FavoriteIcon, ArrowOpen} from 'components/icons/interface_icons.js'

class Food extends Component {

    static propTypes = {
        calories: PropTypes.number,
        currentInfo: PropTypes.shape({
            foodCount: PropTypes.number,
            name: PropTypes.string,
            weight: PropTypes.number,
            brand: PropTypes.string,
            unit: PropTypes.string,
            measurementDescription: PropTypes.string
        })
    }


    render() {
        const {calories, currentInfo } = this.props;
        const {name, brand} = currentInfo;

        return (
            <div className="consumedProduct">
                <div className="consumedProduct--title"><span>{name}</span><span>{Math.round(calories)} ккал</span></div>
                <div className="consumedProduct--other"><span>{utils.getWeightString(currentInfo)}</span><span>{brand}</span></div>
            </div>
        )
    }
}

export default Food
