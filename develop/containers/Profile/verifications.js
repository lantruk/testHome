import {CITY, COUNTRY} from "../../constants.js";
import {getISODate, safulyNewDateFromStr, getStepLenght} from '../../utils'

export const MIN_STEPS = 1000;//Шагов
export const MAX_STEPS = 50000;//Шагов
export const MIN_WEIGHT = 16;//Кило
export const MAX_WEIGHT = 200;//Кило
export const MIN_HEIGHT = 105;//СМ
export const MAX_HEIGHT = 225;//СМ
export const MIN_WATER = 500;//мл
export const MAX_WATER = 5000;//мл
export const MIN_SLEEP = 60;//мин
export const MAX_SLEEP = 720;//мин

export const MIN_YEAR = (function (date) {
    return date.getFullYear() - 100
})(new Date());
export const MIN_BIRHDAY = (function (date) {
    date.setFullYear(date.getFullYear() - 100)
    date.setMonth(0)
    date.setDate(1)

    return getISODate(date)
})(new Date());


export const DEFAULT_GENDER = 1;
export const DEFAULT_BIRHDAY = '1985-01-01';
export const DEFAULT_HEIGHT = '170';
export const DEFAULT_WEIGHT = '70.0';

export const DEFAULT_GLOBAL_GOAL = 1;
export const DEFAULT_GOAL_STEPS = 10000;
///export const DEFAULT_GOAL_DIST Расчет от количества шагов по длине шага
export const DEFAULT_GOAL_SLEEP = 480;
//export const DEFAULT_GOAL_WATER Расчет 30 мл * 1 кг тела

//Округлили до ближайшего Шага вверх
function roundToNearStep(val, step) {
    const Count = Math.ceil(val / step);

    return Count * step;

}


export const ERR_required = '* поле обязательно для заполнения';
export const ERR_uncorect = '* некорректное значение';
export const ERR_smallLength = '* слишком маленькое значение';
export const ERROR_COUNTRY_NO_MATCHES = '* такой страны не найдено';
export const ERROR_CITY_NO_MATCHES = '* такого города не найдено';
export const ERROR_PASS_COPY = '* пароли должны совпадать';
export const ERROR_SHOT_PASS = '* введите не менее 6 символов';
export const ERR_OLD_PASS_UNCORECT = '* неверный пароль';
export const ERR_EMAIL_IS_EXIST = '* такая почта уже зарегистрирована';


//ACCOUNT
export function checkName(val, required) {
    if (required && !val) {

        return {
            hasMistake: true,
            type: 0,
            mes: ERR_required
        }
    }

    if (val && val.length < 2) {

        return {
            hasMistake: true,
            type: 1,
            mes: ERR_smallLength
        }
    }

    return {
        hasMistake: false,
        type: null,
        mes: ''
    }
}


export function checkEmail(val, required) {
    var regexp = /.+@.+\..+/i, regexp2 = /[а-яё]/i;


    if (required && !val.length) {

        return {
            hasMistake: true,
            type: 0,
            mes: ERR_required
        }
    }

    if (val.length && (!regexp.test(val) || regexp2.test(val))) {

        return {
            hasMistake: true,
            type: 1,
            mes: ERR_uncorect
        }
    }


    return {
        hasMistake: false,
        type: null,
        mes: ''
    }
}

export function checkPhone(val, required) {

    const onlyNum = val.replace(/\D+/g, "");


    if (required && !onlyNum.length) {

        return {
            hasMistake: true,
            type: 0,
            mes: ERR_required
        }
    }

    if (onlyNum.length && onlyNum.length < 11) {

        return {
            hasMistake: true,
            type: 1,
            mes: ERR_uncorect
        }
    }


    return {
        hasMistake: false,
        type: null,
        mes: ''
    }
}

export function checkPassword(val, required, type, copy) {

    if (required && !val.length) {

        return {
            hasMistake: true,
            type: 0,
            mes: ERR_required
        }
    }

    if (type !== 'old' && val.length && val.length < 6) {

        return {
            hasMistake: true,
            type: 1,
            mes: ERROR_SHOT_PASS
        }
    }

    if (copy && copy !== val) {

        return {
            hasMistake: true,
            type: 2,
            mes: ERROR_PASS_COPY
        }
    }

    return {
        hasMistake: false,
        type: null,
        mes: ''
    }
}
                                 //CITY, query,   cities,  this.props.country_id
export function checkCountryOrCity(type, query, countries, country_id) {

    const err = type == CITY ? ERROR_CITY_NO_MATCHES : type == COUNTRY ? ERROR_COUNTRY_NO_MATCHES : '';

    const index = countries.findIndex(country => country.toLowerCase().trim() === query.toLowerCase().trim());

    if (query && index == -1) { //Если есть запрос и нет совпадений то это ошибка
        return {
            hasMistake: true,
            type: 1,
            mes: country_id ? err : "* выберете страну"
        }
    }

    //В другом случае - есть запрос и есть совпадания или запроса вовсе нет то это не ошибка
    return {
        hasMistake: false,
        type: null,
        mes: '',
        formatedQuery: index !== -1 ? countries[index] : ''
    }
}

//MEDCART
export function checkBirthday(birthday) {

    const DEFAULT = DEFAULT_BIRHDAY;
    const MIN = MIN_BIRHDAY;


    if (!birthday) {

        return {
            hasMistake: true,
            type: 0,//Отсутствует
            formated: DEFAULT
        }
    }

    //Проверка на корректный формат

    const dateObj = new safulyNewDateFromStr(birthday)


    const splited = birthday.split('-');

    //Если Invalid Date dateObj.getFullYear() вернет NaN
    //Остальные провеки на налчие года месяца и дня и их соответствия объекту даты
    if (!dateObj.getFullYear() || !splited[0] || !splited[1] || !splited[2] ||
        +splited[0] !== dateObj.getFullYear() || +splited[1] !== dateObj.getMonth() + 1 || +splited[2] !== dateObj.getDate()) {

        return {
            hasMistake: true,
            type: 1,//Неккоректное
            formated: DEFAULT
        }
    }


    //Проверка если меньше минимального
    if (birthday < MIN) {
        return {
            hasMistake: true,
            type: 2,//Меньше минимального
            formated: DEFAULT
        }
    }

    //Проверка если из будущего
    if (dateObj > Date.now()) {
        return {
            hasMistake: true,
            type: 3,//Из будущего
            formated: DEFAULT
        }
    }

    return {
        hasMistake: false,
        type: null,
        formated: birthday
    }

}

export function checkGender(gender) {

    const DEFAULT = DEFAULT_GENDER; //МУЖИК ПО ДЕФОЛТУ

    if (!gender || gender == 0) {
        return {
            hasMistake: true,
            type: 0,
            formated: DEFAULT
        }
    }

    return {
        hasMistake: false,
        type: null,
        formated: gender
    }
}

export function checkHeight(height) {
    //Допустимые значения 120 - 225см
    //Толко целые, обязательное значение
    const DEFAULT = DEFAULT_HEIGHT;

    if (!height) {
        return {
            hasMistake: true,
            type: 0, //нет Роста
            formated: DEFAULT,
        }
    }

    const formated = Math.round(+height) + '';

    if (formated < MIN_HEIGHT || formated > MAX_HEIGHT) {
        return {
            hasMistake: true,
            type: 1, //значение вне интервала
            formated: DEFAULT
        }
    }

    return {
        hasMistake: false,
        type: null, //значение вне интервала
        formated: formated
    }

}

export function checkWeight(weight) {
    //Допустимые значения 30 - 200см
    //Толко целые, обязательное значение
    const DEFAULT = DEFAULT_WEIGHT;

    if (!weight) {
        return {
            hasMistake: true,
            type: 0, //нет веса
            formated: DEFAULT
        }
    }

    //Формат 100.1
    const formated = Math.smartRound(+weight, 1) + '';

    if (formated < MIN_WEIGHT || formated > MAX_WEIGHT) {
        return {
            hasMistake: true,
            type: 1, //значение вне интервала
            formated: DEFAULT
        }
    }

    return {
        hasMistake: false,
        type: null, //значение вне интервала
        formated: formated
    }

}

//GOALS
export function checkGlobalGoal(global) {

    if (!global) {
        return {
            hasMistake: true,
            type: 0, //Меньше минимального
            formated: DEFAULT_GLOBAL_GOAL
        }
    }

    return {
        hasMistake: false,
        type: null, //значение вне интервала
        formated: global
    }

}

export function checkStepsGoal(steps) {

    if (!steps) {
        return {
            hasMistake: true,
            type: 0, //Меньше минимального
            formated: DEFAULT_GOAL_STEPS
        }
    }


    //Так как шаг по 100 округляем до верха
    const formated = Math.round(steps / 100) * 100;

    if (formated < MIN_STEPS) {
        return {
            hasMistake: true,
            type: 1, //Меньше минимального
            formated: MIN_STEPS
        }
    }

    if (formated > MAX_STEPS) {
        return {
            hasMistake: true,
            type: 2, //Больше максимального
            formated: MAX_STEPS
        }
    }

    return {
        hasMistake: false,
        type: null, //значение вне интервала
        formated: formated
    }

}

export function checkDistGoal(steps, height, gender) {
    //Дистанция пляшет от шагов поэтому считаем длину шага, вычисляем дист и округляем по 100
    if (!steps) steps = DEFAULT_GOAL_STEPS

    const stepLenght = getStepLenght(height, gender);


    const formated = Math.round(steps * stepLenght / 100) * 100;


    return {
        hasMistake: false,
        type: null, //Меньше минимального
        formated: formated
    }

}

export function checkSleepGoal(sleep) {

    if (!sleep) {
        return {
            hasMistake: true,
            type: 0,
            formated: DEFAULT_GOAL_SLEEP
        }
    }

    const formated = roundToNearStep(sleep, 15);

    if (formated < MIN_SLEEP) {
        return {
            hasMistake: true,
            type: 1,
            formated: MIN_SLEEP
        }
    }

    if (formated > MAX_SLEEP) {
        return {
            hasMistake: true,
            type: 2,
            formated: MAX_SLEEP
        }
    }


    return {
        hasMistake: false,
        type: null, //Меньше минимального
        formated: formated
    }

}

export function checkWeightGoal(weight) {
    if (!weight) {
        return {
            hasMistake: true,
            type: 0, //Отсутствует
            formated: +DEFAULT_WEIGHT
        }
    }


    return {
        hasMistake: false,
        type: null, //Меньше минимального
        formated: weight
    }
}

export function checkWaterGoal(water, userWeight) {
    //30 мл * 1 кг тела

    const weight = Math.round(+userWeight);

    const formated = roundToNearStep(water, 50);//Округлили до ближайшего полтинника
    const DEFAULT = roundToNearStep(weight * 30, 50)

    if (!water) {
        return {
            hasMistake: true,
            type: 0, //Отсутствует
            formated: DEFAULT
        }
    }

    if (water < MIN_WATER) {
        return {
            hasMistake: true,
            type: 1, //Меньше минимального
            formated: MIN_WATER
        }
    }

    if (water > MAX_WATER) {
        return {
            hasMistake: true,
            type: 2, //Меньше минимального
            formated: MAX_WATER
        }
    }

    return {
        hasMistake: false,
        type: null, //Меньше минимального
        formated: formated
    }
}
