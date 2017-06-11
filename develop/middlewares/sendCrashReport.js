export default function (url, err, line, column, onerror_mes) {
    //line, column, message  приходят только из window.onerror
    console.error(url)
    //
    //if (!err) err = {};
    //
    //err.LINE = line;
    //err.COLUMN = column;
    //err.ONERROR_MES = onerror_mes;
    //
    //var data = {
    //    'client': UserAgent.device.type + " " + UserAgent.os.name,
    //    'location': url,
    //    'browser': UserAgent.browser.name + " (" + UserAgent.browser.version + ") " + UserAgent.browser.patch,
    //    'error_object': err,
    //    'stack_trace': String(err.stack)
    //};
    //
    //console.log('ОБЪЕКТ ОШИБКИ', data)
    //
    //fetch('../frontend_crash_report/v1/add_crash', {
    //    method: 'post',
    //    credentials: 'include',
    //    headers: {
    //        'content-type': 'application/json'
    //    },
    //    body: JSON.stringify(data)
    //
    //})
    //    .then(function (response) {
    //        //Логика по успешному ответу
    //        return response.json();
    //    })
    //    .then(function (json) {
    //        //Логика по записи и парсу данных
    //        console.info(json)
    //    })
    //    .catch((err) => {
    //        console.error('ОШИБКА в отправке на сервер', err)
    //
    //    });
    //

}



