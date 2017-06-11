import {LOAD_PROFILE_DATA, SUCCESS, CHANGE_DEVICE_STATUS, UPGRADE_DEVICE, GO_TO_PAYMENT_HISTORY} from '../constants.js'
import {fromJS, List} from 'immutable'
import deviceMap from 'containers/Device/deviceMap'
//import servertoServer from 'middlewares/editDeviceStatus'

//devices key in store
const defaultState = fromJS({
    //loading: null, //START, SUCCESS, FAIL
    bracelets: [],
    tonometrs: [],
    pulsometrs: [],
    glukomters: [],
    payment_history: []
})


export default (state = defaultState, action) => {
    let {type, response, upgradeTo, upgradeFrom, newPayment_historyObj} = action

    switch (type) {
        //ФОРСИРОВАНИЕ КОЛЛЕКЦИИ ДЕВАЙСОВ В УДОБНЫЙ ВИД
        case LOAD_PROFILE_DATA + SUCCESS:

            let bracelets = [],
                tonometrs = [],
                pulsometrs = [],
                glukomters = [],
                payment_history = []

            response.result.dataset.devices.forEach(function (el) {
                let id = el.device_type_id;

                if (id == 1 || id == 2 || id == 3 || id == 4) {
                    bracelets.push(el)
                }
                if (id == 13) {
                    tonometrs.push(el)
                }
                if (id == 6) {
                    pulsometrs.push(el)
                }
                if (id == 7) {
                    glukomters.push(el)
                }
            })


            response.result.dataset.payment_history.forEach(function (el) {

                payment_history.push(el)

            })


            //Новый объект с глубокой имутабельной структурой
            const newState = fromJS({bracelets, tonometrs, pulsometrs, glukomters, payment_history})

            //Возвращаем смерженные старый и новый profile
            return state.merge(newState)

        case CHANGE_DEVICE_STATUS + SUCCESS:

            const device = deviceMap[response.result.device.device_type_id].device

            const index = state.get(device).findIndex(item => item.get('mac') == response.result.device.mac);

            return state.setIn([device, index], fromJS(response.result.device));

        case UPGRADE_DEVICE:

            return state.setIn(['upgrade', 'upgradeFrom'], upgradeFrom).setIn(['upgrade', 'upgradeTo'], upgradeTo)

        case GO_TO_PAYMENT_HISTORY:

            return state.updateIn(['payment_history'], payment => payment.push(fromJS(newPayment_historyObj)))

        default:
            return state
    }
}
