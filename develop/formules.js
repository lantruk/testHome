//В ЭТОМ ФАЙЛЕ ОПИСУЕМ ОСНОВНЫЕ ФОРМУЛЫ РАСЧЕТА БИОМЕТРИК ПОЛЬЗОВАТЕЛЯ

/*****Формула получения длинны шага ***/
export function getStepLenght(height, gender){

    if (gender == 1) {
        return Math.round(height * 0.415) / 100
    } else if (gender == 2) {
        return Math.round(height * 0.413) / 100
    } else return 0

}
