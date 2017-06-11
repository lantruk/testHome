//import { account } from 'identifiers.js';
//import { FIRST_NAME, LAST_NAME, EMAIL, PHONE } from '../constants';


export default function createUpgradeOrder(props, callback) {

    const data = {
        upgrade_type_price_id: props.upgrade_type_id,
        payment_method_id: props.payment_method_id,
        device_mac_address: props.device_mac_address,
        user_email: props.user_email,
        user_phone: props.user_phone
    };
   
    setTimeout(function () {
        fetch('/upgrade_bracelets/api/v1/create_upgrade_device_order/?tz_seconds=' + new Date().getTimezoneOffset() * -60, {
            method: 'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(data)

        })
            .then(function (response) {
                //Логика по успешному ответу
                console.log('UPDATE успешно отправлен')
                return response.json();
            })
            .then(function (json) {
                //Логика по записи и парсу данных

                callback(json)

            })
            .catch((err) => {
                console.info('ОШИБКА в изменении STATUS', err)

            });
    }, 1500)

  }

