import {
    CHANGE_DEVICE_STATUS,
    UPGRADE_DEVICE, CHECK_FULL_FUNCTIONALITY,
    GO_TO_PAYMENT_HISTORY
} from '../constants.js'
import {fromJS, List} from 'immutable'

/*export default function setDevices(response) {

 console.log('вызвали АС setDevice')
 //Данный пример возвращает функцию которая обрабатывается плагином Thunk
 //Каждый вызов dispatch- это асинхронный выброс экшена можно выстравивать цепочки зависимых экшенов
 //которые будут обрабатываться пока предыдущий экшн не пройдет полный цикл в том числе и отработает его редьюсер

 return (dispatch, getState) => {

 dispatch({
 type: 'SET_DEVICES',
 devices: 'Записали '
 })

 dispatch({
 type: 'CHECK_FULL_FUNCTIONALITY',
 devices: getState().devices
 })


 }
 }*/

export function acChangeStatus(options, opt) {

    return (dispatch, getState) => {

        dispatch({
            type: CHANGE_DEVICE_STATUS,
            callApi: '/mytrak/api/v1/profile',
            method: 'PUT',
            options: options,// {state: 'ACTIVE', mac: 65435135351}
            ...opt

        })
      
    }
}

export function acUpgradeDevice(opt) {

    return (dispatch, getState) => {

        dispatch({
            type: UPGRADE_DEVICE,
            upgradeTo: opt.updateDevice,
            upgradeFrom: {
                from_type_id: opt.from_type_id,
                mac: opt.mac
            },
            getState: getState()
        })

    }

}

export function acPaymentHistotry(opt) {

    return (dispatch, getState) => {

        dispatch({
            type: GO_TO_PAYMENT_HISTORY,
            newPayment_historyObj: opt,
            getState: getState()
        })

    }

}

