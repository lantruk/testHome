import {PropTypes} from 'react'

import {
    Smile__Good,
    Smile__Bad,
    Smile__VeryBad,
    Smile__VeryGood,
    Smile__Normal
} from 'components/icons/interface_icons'

export default function Smile(props){
        const {id, status} = props;

        switch (id) {
            case (5):
                return <Smile__VeryGood status={status} />
            case (4):
                return <Smile__Good status={status}/>
            case (3):
                return <Smile__Normal status={status}/>
            case (2):
                return <Smile__Bad status={status}/>
            case (1):
                return <Smile__VeryBad status={status}/>
            default:
                return <div className="SmileIsAbsent">&nbsp;</div>
        }
}

Smile.propTypes = {
    id: PropTypes.number //приходит id смайла из базы
}