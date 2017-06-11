//В ЭТОМ ФАЙЛЕ СОДЕРЖАТСЯ ВСПОМОГАТЕЛЬНЫЕ ПЕРЕИСПОЛЬЗУЕМЫЕ МЕТОДЫ

import {
    OLD_DEFAULT_AVATAR,
    DEFAULT_MALE_AVATAR_IMG,
    DEFAULT_FEMALE_AVATAR_IMG,
    DEFAULT_BACKGROUND_IMG
} from './constants.js'

/*
 * Форматирует из даты рождения строки 2016-16-16
 * Возраст число
 */
export function ageFromBirthdate(birthDate) {
    if (!birthDate) return 0

    if (typeof birthDate === 'string') {
        birthDate = safulyNewDateFromStr(birthDate);
    }
    var today = new Date();

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/******Логирование ошибок на сервер**************/
export function getCrashReport(url, err, line, column, onerror_mes) {
    //line, column, message  приходят только из window.onerror

    if (!err) err = {};

    err.LINE = line;
    err.COLUMN = column;
    err.ONERROR_MES = onerror_mes;

    var data = {
        'client': UserAgent.device.type + " " + UserAgent.os.name,
        'location': url,
        'browser': UserAgent.browser.name + " (" + UserAgent.browser.version + ") " + UserAgent.browser.patch,
        'error_object': err,
        'stack_trace': String(err.stack)
    };

    return data
}

/*****  ПРоверка дефолтных фоток в провиле - если приходят старые дефолтные урлы то подменяем на новые
 ***** - ибо в новом дизайне другие уже  *********/
export function checkAndSetDefaultPhotos(avatar_url, background_image_url, gender) {
    const checkedAva = !avatar_url || avatar_url === OLD_DEFAULT_AVATAR ? !gender || gender == 1 ? DEFAULT_MALE_AVATAR_IMG : DEFAULT_FEMALE_AVATAR_IMG : avatar_url;
    const checkedBack = !background_image_url || background_image_url === OLD_DEFAULT_AVATAR ? DEFAULT_BACKGROUND_IMG : background_image_url;

    return {checkedAva, checkedBack}

}

/***** - безопасное создание объекта даты из строки  *********/
/***** принимает str = '1988-01-01' || '1988.01.01' || '1988 01 01' ***/
export function safulyNewDateFromStr(str) {
    if (!str) throw new Error(`utils.safulyNewDateFromStr str param ${str}, is required`);

    const divider = str.substr(4, 1);
    const splitted = str.split(divider).map(i => +i);

    return new Date(splitted[0], splitted[1] - 1, splitted[2])
}

/*****Округленин до ближайшего Шага вверх ***/
export function roundToNearStep(val, step) {
    const Count = Math.ceil(val / step);

    return Count * step;

}

/* Принимает объект даты и сепоратор
 * Возвращает '2016-01-01'
 */
export function getISODate(date, separator) {
    if (typeof(separator) === "undefined") {
        separator = '-'
    }
    return date.getFullYear() + separator + toPaddedString((date.getMonth() + 1), 2) + separator + toPaddedString(date.getDate(), 2);
}

/**
 * Добавляет 0 к началу строки если строка меньше длины
 * Форматирует число в строку определенной длины
 */
export function toPaddedString(num, length) {
    try {
        if (num + "" === 'NaN' || num + "" === "undefined") {
            throw new TryCatchError('argument is NaN', {num, length})
        }
    } catch (err) {
        //sendCrashReport('Utils.toPaddedString', err)
    }

    if (!length) length = 2;

    var result = num + '';

    while (result.length < length) result = '0' + result;
    return result;
}

/* Для Device Upgrade
 * принимает Date.now()
 * возвращает число секунд = 2
 */
export function getTimeoutForXHR(startTime) {
    const minTimeout = 700;

    const endTime = Date.now();
    const timeOut = endTime - startTime < minTimeout ? minTimeout - (endTime - startTime) : 0;

    return timeOut
}


/**
 * ниже Гусаров навтыкал всяких шняг (экспорт из старых утилзов)
 */
export function dateToUrl(date, timezone) {//В РЕДКОМ СЛУЧАЕ, НАПРИМЕР В ДЕТАЛЬНОЙ СТАТИСТИКЕ чтобы побороть разные часовые пояса в периоде из за перехода летнего зимнего времени подставляем таймзону вручную
    // Дата должна быть в формате ISO с тайм зоной например http://onetrak.ru/mytrak/api/v1/user_statistic/2015-07-20T17:17+03:00
    //Возвращает 2016-03-22T10:19+03:00
    timezone || (timezone = getTimeZoneString(date));

    var date_str = date.getFullYear() + '-' + toPaddedString(date.getMonth() + 1, 2) + '-' + toPaddedString(date.getDate(), 2) + 'T' +
        format_time(date) + ':' + toPaddedString(date.getSeconds(), 2) + timezone;


    try {//ПРОВЕРИТЬ ТАЙМЗОНУ НА КОНЦЕ
        //2015-07-20T17:17:55:00+03:00
        var timeZone = date_str.substr(-6);

        var regexp = /.[^0-9-+:]/; //Все кроме 0-9-+

        if (timeZone.length !== 6 || timeZone.substr(3, 1) !== ':' || !(timeZone.substr(0, 1) === '-' || timeZone.substr(0, 1) === '+') || Boolean(timeZone.match(regexp))) {
            throw new TryCatchError('date.dateToUrl uncurrect timezone', {date_str, timeZone, date})
        }

    } catch (err) {
        // sendCrashReport('Utils.dateToUrl', err)
    }

    return date_str
}


export function getTimeZoneString(date) {
    //Принимает объект дату
    //Возвращает строку формата +00:00 или -00:00

    try {
        if (!date.getTimezoneOffset) {
            throw new TryCatchError('date.getTimezoneOffset is undefined', {date})
        }
    } catch (err) {

        //sendCrashReport('Utils.getTimeZoneString', err)
    }

    //var tz = date.getTimezoneOffset() ?  date.getTimezoneOffset() * (-1) : 180;
    var tz = date.getTimezoneOffset() * (-1);


    if (tz > 0) {
        return '+' + toPaddedString(tz / 60, 2) + ':' + toPaddedString(tz % 60, 2);
    } else if (tz < 0) {
        return '-' + toPaddedString(tz * -1 / 60, 2) + ':' + toPaddedString(tz % 60, 2);
    }
}


export function format_time(date) {
    return toPaddedString(date.getHours(), 2) + ':' + toPaddedString(date.getMinutes(), 2);
    //return utils.toPaddedString(date.getHours(), 2)  + utils.toPaddedString(date.getMinutes(), 2);
}

export function format_date(date, separator) {
    separator = separator || '/';
    return toPaddedString(date.getDate(), 2) + separator + toPaddedString(date.getMonth() + 1, 2) + separator + toPaddedString(date.getFullYear(), 2);
}

//Составление записи в еде или воде о том скока потребленно и какие порции
export function getWeightString(currentInfo) {
    const {name, foodCount, weight, brand, unit, measurementDescription} = currentInfo;

    if (measurementDescription == 'г' || measurementDescription == 'g' || measurementDescription == 'мл' || measurementDescription == 'ml') {
        return `${Math.round(weight)} ${measurementDescription}`
    } else {
        return `${foodCount} ${measurementDescription} (${Math.round(weight)} ${unit})`
    }

}

export function formatWater(val) {
    return Math.smartRound(val / 1000, 2)
}

export function formatTime(int) {

    //ПРиходят минуты
    if (!int) {
        int = 0
    }

    int = Math.round(parseFloat(int)) //Сделаем чтоб работало со входящими строками

    var hours = ~~(int / 60); //узнаем часы

    hours = hours > 9 ? hours : ('0' + hours); //Добавляем нолик к часам если меньше 10

    var minutes = int % 60; //Добавил проверку, чтоб остаток от деления был корректным, иначе вылазят лишние минутки

    var res = hours + ':' + ((minutes >= 10) ? minutes : ('0' + minutes));

    return res
}
//                                        -------------PRESSURE--------------
/*
 *
 * на вход строка  '2015-07-20T17:17:55:00+03:00'
 * на выход строка '17:55'
 *
 * */
export function getTimeAtString(str) {
    if (str) {
        return str.split('T')[1].substring(0, 5)
    }
    return ''
}


//Для давления Dias цветовая схема.
// На вход цыфра: 89
// Результат: { className: '__lowBloodPressure--color',status: 'Низкое' }
export function getColorFromDiasPressure(data, time) {
    if (time >= 7 && time <= 21) {

        if (data < 65) {
            return {
                className: '__lowBloodPressure--color',
                status: 'Низкое',
                level: 0
            }
        }
        if (data >= 65 && data <= 85) {
            return {
                className: '',
                status: 'Нормальное',
                level: 1
            }
        }
        if (data >= 86 && data <= 90) {
            return {
                className: '__normalBloodPressure--color',
                status: 'Пограничное',
                level: 2
            }
        }
        if (data >= 91 && data <= 100) {
            return {
                className: '__highBloodPressure--color',
                status: 'Повышенное',
                level: 3
            }
        }
        if (data >= 101 && data <= 110) {
            return {
                className: '__veryHighPressure--color',
                status: 'Высокое',
                level: 4
            }
        }
        if (data > 110) {
            return {
                className: '__severelyHighPressure--color',
                status: 'Очень высокое',
                level: 5
            }
        }
    } else {
        if (data < 50) {
            return {
                className: '__lowBloodPressure--color',
                status: 'Низкое',
                level: 0
            }
        }
        if (data >= 50 && data <= 70) {
            return {
                className: '',
                status: 'Нормальное',
                level: 1
            }
        }
        if (data >= 71 && data <= 75) {
            return {
                className: '__normalBloodPressure--color',
                status: 'Пограничное',
                level: 2
            }
        }
        if (data >= 76 && data <= 85) {
            return {
                className: '__highBloodPressure--color',
                status: 'Повышенное',
                level: 3
            }
        }
        if (data >= 86 && data <= 100) {
            return {
                className: '__veryHighPressure--color',
                status: 'Высокое',
                level: 4
            }
        }
        if (data > 100) {
            return {
                className: '__severelyHighPressure--color',
                status: 'Очень высокое',
                level: 5
            }
        }


    }


}


export function getColorAndStatusFromSisPressure(data, time) {
    //Для давления Sis цветовая схема + подпись.
    // На вход цыфра: 89
    // Результат: { className: '__lowBloodPressure--color', pressureLine: 'Нормальное'}
    if (time >= 7 && time <= 21) {


        if (data < 100) {
            return {
                className: '__lowBloodPressure--color',
                status: 'Низкое',
                level: 0
            }
        }
        if (data >= 100 && data <= 135) {
            return {
                className: '',
                status: 'Нормальное',
                level: 1
            }
        }
        if (data >= 136 && data <= 140) {
            return {
                className: '__normalBloodPressure--color',
                status: 'Пограничное',
                level: 2
            }
        }
        if (data >= 141 && data <= 155) {
            return {
                className: '__highBloodPressure--color',
                status: 'Повышенное',
                level: 3
            }
        }
        if (data >= 156 && data <= 170) {
            return {
                className: '__veryHighPressure--color',
                status: 'Высокое',
                level: 4
            }
        }
        if (data > 170) {
            return {
                className: '__severelyHighPressure--color',
                status: 'Очень высокое',
                level: 5
            }
        }
    } else {

        if (data < 90) {
            return {
                className: '__lowBloodPressure--color',
                status: 'Низкое',
                level: 0
            }
        }
        if (data >= 90 && data <= 120) {
            return {
                className: '',
                status: 'Нормальное',
                level: 1
            }
        }
        if (data >= 121 && data <= 125) {
            return {
                className: '__normalBloodPressure--color',
                status: 'Пограничное',
                level: 2
            }
        }
        if (data >= 126 && data <= 135) {
            return {
                className: '__highBloodPressure--color',
                status: 'Повышенное',
                level: 3
            }
        }
        if (data >= 136 && data <= 150) {
            return {
                className: '__veryHighPressure--color',
                status: 'Высокое',
                level: 4
            }
        }
        if (data > 150) {
            return {
                className: '__severelyHighPressure--color',
                status: 'Очень высокое',
                level: 5
            }
        }


    }
}

export function getStatusFromPulsePressure(pulse, age) {
    //http://zdravoe.com/120/p1615/index.html
    if (age < 2) {
        if (pulse < 94) {
            return {status: 'Пониженный'}
        } else if (pulse > 154) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 2 && age < 4) {
        if (pulse < 90) {
            return {status: 'Пониженный'}
        } else if (pulse > 140) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 4 && age < 6) {
        if (pulse < 86) {
            return {status: 'Пониженный'}
        } else if (pulse > 126) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 6 && age < 8) {
        if (pulse < 78) {
            return {status: 'Пониженный'}
        } else if (pulse > 118) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 8 && age < 10) {
        if (pulse < 68) {
            return {status: 'Пониженный'}
        } else if (pulse > 108) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 10 && age < 12) {
        if (pulse < 60) {
            return {status: 'Пониженный'}
        } else if (pulse > 100) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 12 && age < 15) {
        if (pulse < 55) {
            return {status: 'Пониженный'}
        } else if (pulse > 95) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 15 && age < 50) {
        if (pulse < 60) {
            return {status: 'Пониженный'}
        } else if (pulse > 80) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 50 && age < 60) {
        if (pulse < 64) {
            return {status: 'Пониженный'}
        } else if (pulse > 84) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }
    if (age >= 60) {
        if (pulse < 69) {
            return {status: 'Пониженный'}
        } else if (pulse > 89) {
            return {status: 'Повышенный'}
        } else {
            return {status: 'Нормальный'}
        }
    }

}

export function getSmileFilling(node_id) {
    //На вход число от 1 до 5
    switch (true) {
        case node_id == 1 :
            return 'Очень плохое';
            break;
        case node_id == 2 :
            return 'Плохое';
            break;
        case node_id == 3 :
            return 'Нормальное';
            break;
        case node_id == 4 :
            return 'Хорошее';
            break;
        case node_id == 5 :
            return 'Очень хорошее';
            break;
        default:
            return '';
            break;
    }
}
/*
 для профиля

 */

export function getStepLenght(height, gender) {

    if (gender == 1) {
        return Math.round(height * 0.415) / 100
    } else if (gender == 2) {
        return Math.round(height * 0.413) / 100
    } else return 0

}

export function getSourceForSelectType(from, to, step = 1) {
    let searce = [];

    for (let i = from; i <= to; i += step) {
        searce.push({
            value: i,
            label: '' + i
        })
    }

    return searce
}

export function getBMI(weight, height) {
    return Math.smartRound(10000 * (weight / (height * height)), 2)
}

/*
 для профиля
 конец
 */
/*
 * lang
 * */
export const lang = {
    full_months: {
        ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    },
    shot_months: {
        ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    },

    members_statuses: {
        server: ['IN_GROUP_INVITE', 'IN_GROUP_ACCEPT', 'IN_GROUP_INVITE_EXPIRED', 'IN_GROUP_INVITE_REJECT'],
        ru: ['Приглашение выслано', 'Уже состоит в этой группе', 'Истекло время приглашения', 'Приглашение отклонено']
    },

    access_reason: {
        server: ['User access value is nobody', 'User acces values is only accept, and you dont coach.'],
        ru: ['Пользователь скрыл данные этого раздела', 'Данные этого раздела доступны только подтвержденным пользователям'],

    }
}

/*
 * lang
 * end
 * */