import {MIN_STEPS, MAX_STEPS, MIN_WEIGHT, MAX_WEIGHT, MIN_HEIGHT, MAX_HEIGHT, MIN_WATER, MAX_WATER, MIN_SLEEP, MAX_SLEEP, MIN_YEAR,
    MIN_BIRHDAY, DEFAULT_GENDER, DEFAULT_BIRHDAY, DEFAULT_WEIGHT, 
    DEFAULT_HEIGHT, DEFAULT_GLOBAL_GOAL, DEFAULT_GOAL_STEPS, DEFAULT_GOAL_SLEEP} from './verifications';
import {getSourceForSelectType, formatTime,  lang} from '../../utils'


//PROFILE
export const ACCOUNT_MONTHS = lang.full_months.ru.map((month, i)=> {
    return {
        value: i,
        label: month
    }
})

export const ACCOUNT_YEARS = (()=>{
    let years = [];
    const dateNow = new Date();
    const minYear = MIN_YEAR;
    const maxYear = dateNow.getFullYear() - 5;

    for(let i = 0; i <= maxYear - minYear; i++){
        years.push({
            value: minYear + i,
            label: '' + (minYear + i)
        })
    }

    return years
})()



export const ACCOUNT_HEIGHTS = getSourceForSelectType(MIN_HEIGHT,MAX_HEIGHT,1);
export const ACCOUNT_INT_WEIGHTS = getSourceForSelectType(MIN_WEIGHT,MAX_WEIGHT,1);
export const ACCOUNT_PART_WEIGHTS = getSourceForSelectType(0,9);


export const GOAL_STEPS = getSourceForSelectType(MIN_STEPS,MAX_STEPS, 100);
export const GOAL_DISTANCES = (stepLenght)=>{
    //ДИСТАНЦИЯ ЗАВИСИТ ОТ ШАГОВ
    //ПОэтому для каждого чела свой верхний максимум для дистанции от длины шага

    //Так как значения хранятся в метрах а выводятся в км то составим вручную
    const maxDist = MAX_STEPS * stepLenght ;

    let source = [];

    //И начинать нужно соответственно с нижнего значения шагов
    let distMin = Math.round(MIN_STEPS * stepLenght / 100) * 100;

    for(let i = distMin; i <= maxDist; i=i+100){
        source.push({
            value: i,  //Значения в метрах
            label: Math.smartRound(i/1000, 1)  //Визуально в км
        })
    }

    return source
}
export const GOAL_SLEEPS = (()=>{

    let source = [];

    for(let i = MIN_SLEEP; i <= MAX_SLEEP; i = i + 15){
        source.push({
            value: i,  //Значение в инпутах
            label: formatTime(i)  //Визуально в 00:00
        })
    }

    return source
})()
export const GOAL_WEIGHTS = ACCOUNT_INT_WEIGHTS
export const GOAL_WATERS = (()=>{

    const MIN_SLEEP = 1*60;
    const MAX_SLEEP = 12*60;


    let source = [];

    for(let i = MIN_WATER; i <= MAX_WATER; i = i + 50){
        source.push({
            value: i,
            label: i/1000
        })
    }

    return source
})()
