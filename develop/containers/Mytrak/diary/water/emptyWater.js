import {PropTypes, Component} from 'react';
import {WaterIcon} from 'components/icons/metric_icons'

function EmptyWater(props) {

    return (
        <div className="waterDiary--book emptyBook emptyBook__waterWrap">
            <div className="emptyBook--wrap">
                <div className="emptyBook--icon">
                <WaterIcon disabled/>
                    </div>
                <p className="emptyBook--text">Вы еще не внесли потребление воды в ваш дневник.
                    <br/>
                    Добавьте объем воды с помощью кнопок + и - или внесите через каталог еды.
                </p>
            </div>

        </div>
    )

}

export default EmptyWater