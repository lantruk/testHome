
const deviceMap = {
    1 : {
        name: 'ONETRAK Sport',
        className : 'devicePackaging--image__SPORT'
    },
    2 : {
        name: 'ONETRAK Life',
       className : 'devicePackaging--image__LIFE'
    },
    3 : {
        name: 'ONETRAK Life 01',
       className : 'devicePackaging--image__LIFE01'
    },
    4 : {
        name: 'ONETRAK Life 05',
       className : 'devicePackaging--image__LIFE05'
    },
    13 : {
        name: 'ONETRAK Тонометр',
       className : 'devicePackaging--image__Tonometr'
    },
    16 : {name: 'Москвёнок Лайф',
       className : 'devicePackaging--image__SHCOLNIC'
    },
    'ACTIVE': 'Активен',
    'BROKEN': 'Неактивен',
    'MOVED': 'Подарен',
    'LOST': 'Потерян'
}


export default deviceMap

export const STATUS_ACTIVE = 'ACTIVE'
export const STATUS_NOTACTIVE = 'BROKEN'
export const STATUS_LOST = 'LOST'
export const STATUS_GIVE = 'MOVED'