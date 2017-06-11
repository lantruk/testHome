//В ЭТОМ ФАЙЛЕ ХРАНЯТСЯ ДЕФОЛТНЫЕ, МИНИМАЛЬНЫЕ-МАКСИМАЛЬНЫЕ ЗНАЧЕНИЯ ДЛЯ БИОМЕТРИК ПОЛЬЗОВАТЕЛЯ
import { getISODate } from './utils.js'

export const MIN_STEPS = 1000;//Шагов
export const MAX_STEPS = 50000;//Шагов
export const MIN_WEIGHT = 30;//Кило
export const MAX_WEIGHT = 200;//Кило
export const MIN_HEIGHT = 120;//СМ
export const MAX_HEIGHT = 225;//СМ
export const MIN_WATER = 1000;//мл
export const MAX_WATER = 5000;//мл
export const MIN_SLEEP = 60;//мин
export const MAX_SLEEP = 720;//мин
export const MIN_YEAR = (function(date){
    return date.getFullYear() - 100
})(new Date());
export const MIN_BIRHDAY = (function(date){
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
export const DEFAULT_GOAL_SLEEP = 480;


