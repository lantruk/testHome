import {
    LOAD_PROFILE_DATA,
    START,
    SUCCESS,
    FAIL,
    CHECK_FULL_FUNCTIONALITY,
    LOAD_DIARY_DATA,
    STOP_LOADER
} from '../constants.js'
//import setDevices from '../AC/devices.js'
import {getCrashReport} from '../utils.js'
//import {sendCrashReport} from '../AC/others'
import deepAsign from 'deep-assign'


/*
 * Данная middleware Отрабатывает get Запросы по одной схеме
 * Для этого нужно в AC передать уникальный ключь callApi со строкой
 * А также опционально настройки для Fetch и callback которому
 * передадутся store, next, response для возможности диспатчить asunc actions
 * Таким образом все асинхронные экшены (создаваемые thunk или next => next) кроме type + SUCCESS, type + FAIL
 * сосредоточенны в AC
 */
export default store => next => action => {
    const {type, callApi, onSuccess, method, date, options, ...rest} = action;


    
    next(action)

    if (callApi) {

        //Диспатчим экшн что такой то завпрос начался
        next({...rest, type: type + START, date});
        let response = {}

        if (type == 'LOAD_PROFILE_DATA') {
            response = profile
        }
        if (type == 'LOAD_DASHBOARDDIARY_DATA') {
            response = statistic
        }
        if (type == 'LOAD_CONSUMED_DATA') {
            response = consumed_fuud
        }
        if (type == 'LOAD_PRESSURE_DATA') {
            response = pressure
        }


            setTimeout(()=>{
                    next({type: type + SUCCESS, response, date, rest});
                    //Если есть callback, то в нем диспатчатся асинхронно экшны созданые в первоначальном экшне
                    //onSuccess && onSuccess(store, next, response)
            }, 1000)



    }
}

const profile = {
    "result": {
        "dataset": {
            "access": {
                "MEDICAL_CARD": {
                    "access_value": "ONLY_ACCEPT",
                    "group_ids": [1, 2, 3]
                },
                "METRICS": {"access_value": "ONLY_ACCEPT", "group_ids": [1, 2, 3]},
                "PROFILE": {"access_value": "ONLY_ACCEPT", "group_ids": [1, 2, 3]}
            },
            "art_pressure_viewed_popup": true,
            avatar_url
:
"https://onetrak.s3.eu-central-1.amazonaws.com/media/images/avatars/47226_kRyk3KAUQ0.png",
background_image_url
:
"https://onetrak.s3.eu-central-1.amazonaws.com/media/images/background/137_JaAPxEOUCI.png",
birthday
:
"1988-02-20",
            "bmr_id": "",
            "city": {"name": "Москва", "remixlang_id": 0, "vk_id": 1},
            "country": {"name": "Россия", "remixlang_id": 0, "vk_id": 1},
            "date_joined": "2016-11-10T07:24:45.186434+00:00",
            "devices": [{
                "available_upgrades": "",
                "battery": "",
                "device": "SPORT",
                "device_id": 11681,
                "device_type_id": 1,
                "functions": "<ul><li>•\tЧасы</li>\n    <li>•\tНапоминания</li>\n    <li>•\tУстановка целей</li>\n    <li>•\tМониторинг активности</li>\n    <li>•\tМониторинг сна</li>\n    <li>•\tРаспознавание бега</li>\n    <li>•\tУмный будильник</li>\n    <li>•\tВодный баланс</li>\n    <li>•\tРасчёт ИМТ</li>\n    <li>•\tСожжённые калории</li>\n    <li>•\tПотреблённые калории</li>\n    <li>•\tБаланс калорий</li>\n    <li>•\t16 млн блюд и продуктов</li>\n    <li>•\tПищевая ценность рациона</li>\n    <li>•\tСтатистика неделя/месяц</li>\n    <li>•\tВеб-приложение</li>\n    <li>•\tКастомизация статистики</li>\n    <li>•\tСтатистика друзей и близких</li>\n    <li>•\tБессрочное хранение данных</li>\n</ul>\n",
                "mac": "544A165ECE6F",
                "ota_version": "2.3.6",
                "phone_sync": "",
                "server_sync": "",
                "state": "ACTIVE"
            }],
            "email": "konstantin.rybalko@stardreams.co",
            "first_name": "Konstanti",
            "gender": 1,
            "height": "170.00",
            "heights": [{
                "changed": "2016-11-10T10:30:27+03:00",
                "date_from": "2016-11-10T10:30:27+03:00",
                "height": "170.00"
            }, {
                "changed": "2016-11-10T10:30:27.469506+03:00",
                "date_from": "2016-11-10T10:30:27.469481+03:00",
                "height": "170.00"
            }],
            "last_login": "2017-03-23T23:05:24.787966+00:00",
            "last_name": "Ribalk",
            "middle_name": "",
            "name": "Ribalk Konstanti",
            "payment_history": [],
            "phone_number": "",
            "social_accounts": [{
                "extra_data": {
                    "activity": "",
                    "city": 0,
                    "counters": {
                        "albums": 4,
                        "audios": 136,
                        "followers": 52,
                        "friends": 144,
                        "gifts": 5,
                        "groups": 23,
                        "notes": 0,
                        "online_friends": 14,
                        "photos": 222,
                        "user_videos": 7,
                        "videos": 19
                    },
                    "country": 2,
                    "education_form": "Очное отделение",
                    "education_status": "Студент (специалист)",
                    "email": "spets-traid@inbox.ru",
                    "faculty": 33626,
                    "faculty_name": "Экономической информатики",
                    "first_name": "Костя",
                    "graduation": 2010,
                    "has_mobile": 1,
                    "home_phone": "",
                    "last_name": "Рыбалко",
                    "last_seen": {"platform": 7, "time": 1481784892},
                    "nickname": "Insecticide",
                    "online": 0,
                    "photo": "https://pp.vk.me/c630924/v630924172/34411/IL-LlWNj4cs.jpg",
                    "photo_big": "https://pp.vk.me/c630924/v630924172/3440d/1irUqYcJSns.jpg",
                    "photo_medium": "https://pp.vk.me/c630924/v630924172/34410/gNl_KVFrve4.jpg",
                    "relation": 4,
                    "relation_partner": {"first_name": "Елизавета", "id": 16146051, "last_name": "Рыбалко"},
                    "screen_name": "id10834172",
                    "sex": 2,
                    "timezone": 3,
                    "uid": 10834172,
                    "universities": [{
                        "chair": 38522,
                        "chair_name": "Статистика",
                        "city": 0,
                        "country": 2,
                        "education_form": "Очное отделение",
                        "education_status": "Студент (специалист)",
                        "faculty": 33626,
                        "faculty_name": "Экономической информатики",
                        "graduation": 2010,
                        "id": 2326,
                        "name": "ХНЭУ (бывш. ХИЭИ)"
                    }],
                    "university": 2326,
                    "university_name": "ХНЭУ им. С. Кузнеца (бывш. ХИЭИ)"
                }, "id": 20693, "provider": "vk"
            }],
            "teams": [],
            "user_goals": [{"goal": 5100, "goals_type_id": 3}, {"goal": 480, "goals_type_id": 2}, {
                "goal": 7200,
                "goals_type_id": 1
            }, {"goal": 2000, "goals_type_id": 4}, {"goal": 68, "goals_type_id": 5}, {
                "goals_type_id": -2,
                "lower_level": 70,
                "upper_level": 110
            }, {"goal": 1, "goals_type_id": -1}],
            "weight": "70.00",
            "weights": [{
                "changed": "2016-11-10T10:30:27+03:00",
                "date_from": "2016-11-10T10:30:27+03:00",
                "weight": "70.00"
            }, {
                "changed": "2016-11-10T10:30:27.458415+03:00",
                "date_from": "2016-11-10T10:30:27.458392+03:00",
                "weight": "70.00"
            }]
        },
        "support_data": {
            "bmrs": [{
                "activity_description": "чаще, чем раз в неделю",
                "activity_type": "Очень высокий",
                "changed": "2014-09-18T11:08:23.854000+03:00",
                "coefficient": 1.9,
                "id": 5,
                "is_active": true
            }, {
                "activity_description": "6-7 раз в неделю",
                "activity_type": "Высокий",
                "changed": "2014-09-18T11:08:11.462000+03:00",
                "coefficient": 1.725,
                "id": 4,
                "is_active": true
            }, {
                "activity_description": "3-5 дней в неделю",
                "activity_type": "Средний",
                "changed": "2014-09-18T11:07:51.776000+03:00",
                "coefficient": 1.55,
                "id": 3,
                "is_active": true
            }, {
                "activity_description": "1-3 раза в неделю",
                "activity_type": "Низкий",
                "changed": "2014-09-18T11:07:34.501000+03:00",
                "coefficient": 1.375,
                "id": 2,
                "is_active": true
            }, {
                "activity_description": "нет физ. нагрузок",
                "activity_type": "Минимальный",
                "changed": "2014-09-18T11:07:17.622000+03:00",
                "coefficient": 1.2,
                "id": 1,
                "is_active": true
            }],
            "countries": [{
                "changed": "2016-12-28T18:47:34.790635+00:00",
                "id": 191,
                "is_active": true,
                "name": "Сейшелы",
                "vk_id": 175,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-03-09T08:57:58.860917+00:00",
                "id": 226,
                "is_active": true,
                "name": "Куба",
                "vk_id": 104,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-08-31T08:42:53.597567+00:00",
                "id": 1,
                "is_active": true,
                "name": "Россия",
                "vk_id": 1,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-16T20:29:34.155616+00:00",
                "id": 2,
                "is_active": true,
                "name": "Украина",
                "vk_id": 2,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-17T06:25:49.349881+00:00",
                "id": 3,
                "is_active": true,
                "name": "",
                "vk_id": 0,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-18T15:46:39.766424+00:00",
                "id": 4,
                "is_active": true,
                "name": "Азербайджан",
                "vk_id": 5,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-18T16:02:53.361583+00:00",
                "id": 5,
                "is_active": true,
                "name": "Алжир",
                "vk_id": 22,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-21T08:10:10.073885+00:00",
                "id": 6,
                "is_active": true,
                "name": "Американское Самоа",
                "vk_id": 23,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-21T12:56:54.572382+00:00",
                "id": 7,
                "is_active": true,
                "name": "Австрия",
                "vk_id": 20,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-03-25T15:07:27.511370+00:00",
                "id": 227,
                "is_active": true,
                "name": "Ливан",
                "vk_id": 109,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-29T08:20:11.410013+00:00",
                "id": 9,
                "is_active": true,
                "name": "Казахстан",
                "vk_id": 4,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-09-30T06:38:44.877439+00:00",
                "id": 10,
                "is_active": true,
                "name": "Албания",
                "vk_id": 21,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-12T14:48:25.221537+00:00",
                "id": 85,
                "is_active": true,
                "name": "Кыргызстан",
                "vk_id": 11,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-15T21:21:32.710883+00:00",
                "id": 86,
                "is_active": true,
                "name": "Грузия",
                "vk_id": 7,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-10-01T13:26:08.018003+00:00",
                "id": 17,
                "is_active": true,
                "name": "Латвия",
                "vk_id": 12,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-10-11T16:48:27.592272+00:00",
                "id": 18,
                "is_active": true,
                "name": "Беларусь",
                "vk_id": 3,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-10-20T10:51:34.122304+00:00",
                "id": 19,
                "is_active": true,
                "name": "Марокко",
                "vk_id": 123,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-10-22T17:31:42.374601+00:00",
                "id": 20,
                "is_active": true,
                "name": "Бермуды",
                "vk_id": 38,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-11-02T12:05:51.762228+00:00",
                "id": 21,
                "is_active": true,
                "name": "Бутан",
                "vk_id": 47,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2015-12-22T21:19:05.430149+00:00",
                "id": 22,
                "is_active": true,
                "name": "Норвегия",
                "vk_id": 144,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-01-02T09:35:15.352278+00:00",
                "id": 23,
                "is_active": true,
                "name": "Литва",
                "vk_id": 13,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-01-28T12:59:33.222058+00:00",
                "id": 24,
                "is_active": true,
                "name": "Узбекистан",
                "vk_id": 18,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-01-28T19:57:59.263346+00:00",
                "id": 25,
                "is_active": true,
                "name": "Германия",
                "vk_id": 65,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-01T12:27:01.860282+00:00",
                "id": 199,
                "is_active": true,
                "name": "Швеция",
                "vk_id": 218,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-11T09:48:37.164310+00:00",
                "id": 200,
                "is_active": true,
                "name": "Барбадос",
                "vk_id": 33,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-02-16T10:21:41.496180+00:00",
                "id": 29,
                "is_active": true,
                "name": "Египет",
                "vk_id": 76,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-02-18T08:03:32.113590+00:00",
                "id": 30,
                "is_active": true,
                "name": "Китай",
                "vk_id": 97,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-02-23T18:41:14.371945+00:00",
                "id": 31,
                "is_active": true,
                "name": "Питкерн",
                "vk_id": 159,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-03-09T20:34:20.512258+00:00",
                "id": 32,
                "is_active": true,
                "name": "Израиль",
                "vk_id": 8,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-03-24T09:18:21.343097+00:00",
                "id": 33,
                "is_active": true,
                "name": "Австралия",
                "vk_id": 19,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-04-06T11:22:52.950916+00:00",
                "id": 34,
                "is_active": true,
                "name": "Белиз",
                "vk_id": 35,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-04-06T13:35:06.496927+00:00",
                "id": 35,
                "is_active": true,
                "name": "Андорра",
                "vk_id": 26,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-04-11T17:32:06.262580+00:00",
                "id": 36,
                "is_active": true,
                "name": "Сальвадор",
                "vk_id": 166,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-04-13T19:22:29.849421+00:00",
                "id": 37,
                "is_active": true,
                "name": "Италия",
                "vk_id": 88,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-24T16:15:47.932922+00:00",
                "id": 201,
                "is_active": true,
                "name": "Тайвань",
                "vk_id": 192,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-25T13:05:07.675200+00:00",
                "id": 202,
                "is_active": true,
                "name": "Япония",
                "vk_id": 229,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-16T14:19:16.842416+00:00",
                "id": 8,
                "is_active": true,
                "name": "USA",
                "vk_id": 9,
                "vk_remix_lang__remixlang_id": 3
            }, {
                "changed": "2016-05-16T14:20:01.049696+00:00",
                "id": 94,
                "is_active": true,
                "name": "США",
                "vk_id": 9,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-16T18:28:14.917224+00:00",
                "id": 95,
                "is_active": true,
                "name": "Антигуа и Барбуда",
                "vk_id": 27,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-20T07:27:14.365520+00:00",
                "id": 96,
                "is_active": true,
                "name": "Монголия",
                "vk_id": 130,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-06-16T02:20:50.690953+00:00",
                "id": 97,
                "is_active": true,
                "name": "Сент-Пьер и Микелон",
                "vk_id": 180,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-06-18T14:57:08.168672+00:00",
                "id": 98,
                "is_active": true,
                "name": "Армения",
                "vk_id": 6,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-08-17T16:06:55.430490+00:00",
                "id": 99,
                "is_active": true,
                "name": "Ангола",
                "vk_id": 25,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-08-31T05:11:11.227699+00:00",
                "id": 100,
                "is_active": true,
                "name": "Объединенные Арабские Эмираты",
                "vk_id": 145,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-08-31T06:58:44.254574+00:00",
                "id": 101,
                "is_active": true,
                "name": "Молдова",
                "vk_id": 15,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-04T22:09:19.836821+00:00",
                "id": 102,
                "is_active": true,
                "name": "Колумбия",
                "vk_id": 98,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-09T19:29:12.879060+00:00",
                "id": 103,
                "is_active": true,
                "name": "Мозамбик",
                "vk_id": 128,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-11T18:54:33.318550+00:00",
                "id": 104,
                "is_active": true,
                "name": "Малайзия",
                "vk_id": 119,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-15T20:38:37.542872+00:00",
                "id": 105,
                "is_active": true,
                "name": "Испания",
                "vk_id": 87,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-16T14:17:29.911275+00:00",
                "id": 106,
                "is_active": true,
                "name": "Черногория",
                "vk_id": 230,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-22T11:35:04.964572+00:00",
                "id": 107,
                "is_active": true,
                "name": "Руанда",
                "vk_id": 164,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-23T14:24:34.864143+00:00",
                "id": 108,
                "is_active": true,
                "name": "Южная Корея",
                "vk_id": 226,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-26T17:58:54.370887+00:00",
                "id": 203,
                "is_active": true,
                "name": "Португалия",
                "vk_id": 161,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-26T13:22:12.053886+00:00",
                "id": 114,
                "is_active": true,
                "name": "Anguilla",
                "vk_id": 24,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-26T14:27:09.498285+00:00",
                "id": 115,
                "is_active": true,
                "name": "Ирландия",
                "vk_id": 85,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-27T13:35:18.318640+00:00",
                "id": 116,
                "is_active": true,
                "name": "Сирийская Арабская Республика",
                "vk_id": 183,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-30T05:53:43.120486+00:00",
                "id": 208,
                "is_active": true,
                "name": "Ватикан",
                "vk_id": 233,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-01-31T13:24:33.100886+00:00",
                "id": 209,
                "is_active": true,
                "name": "Сан-Марино",
                "vk_id": 168,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-29T11:03:12.303422+00:00",
                "id": 119,
                "is_active": true,
                "name": "Гвинея-Бисау",
                "vk_id": 64,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-09-29T14:15:52.910351+00:00",
                "id": 120,
                "is_active": true,
                "name": "Хорватия",
                "vk_id": 212,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-06T12:28:20.140219+00:00",
                "id": 121,
                "is_active": true,
                "name": "Гватемала",
                "vk_id": 62,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-06T12:56:34.570382+00:00",
                "id": 122,
                "is_active": true,
                "name": "Аруба",
                "vk_id": 29,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-02T13:46:41.682612+00:00",
                "id": 210,
                "is_active": true,
                "name": "Швейцария",
                "vk_id": 217,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-05-04T15:24:09.267531+00:00",
                "id": 72,
                "is_active": true,
                "name": "Эстония",
                "vk_id": 14,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-04T11:28:11.508402+00:00",
                "id": 213,
                "is_active": true,
                "name": "Кипр",
                "vk_id": 95,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-08T14:30:43.078087+00:00",
                "id": 129,
                "is_active": true,
                "name": "Финляндия",
                "vk_id": 207,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-11T09:10:31.195033+00:00",
                "id": 141,
                "is_active": true,
                "name": "Великобритания",
                "vk_id": 49,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-12T15:25:42.524477+00:00",
                "id": 151,
                "is_active": true,
                "name": "Таджикистан",
                "vk_id": 16,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-15T22:14:16.356016+00:00",
                "id": 161,
                "is_active": true,
                "name": "Франция",
                "vk_id": 209,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-16T10:13:36.196806+00:00",
                "id": 162,
                "is_active": true,
                "name": "Нидерланды",
                "vk_id": 139,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-16T13:38:40.697273+00:00",
                "id": 163,
                "is_active": true,
                "name": "Туркменистан",
                "vk_id": 17,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-17T15:27:20.900355+00:00",
                "id": 164,
                "is_active": true,
                "name": "Гонконг",
                "vk_id": 68,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-19T06:55:03.784786+00:00",
                "id": 165,
                "is_active": true,
                "name": "Бурунди",
                "vk_id": 46,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-19T07:05:45.995585+00:00",
                "id": 166,
                "is_active": true,
                "name": "Мальдивы",
                "vk_id": 121,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-19T08:25:50.324030+00:00",
                "id": 167,
                "is_active": true,
                "name": "Реюньон",
                "vk_id": 163,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-19T16:05:20.085604+00:00",
                "id": 168,
                "is_active": true,
                "name": "Польша",
                "vk_id": 160,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-19T20:44:43.027264+00:00",
                "id": 169,
                "is_active": true,
                "name": "Канада",
                "vk_id": 10,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-20T14:52:53.705631+00:00",
                "id": 170,
                "is_active": true,
                "name": "Нигер",
                "vk_id": 136,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-28T17:36:23.130612+00:00",
                "id": 173,
                "is_active": true,
                "name": "Чили",
                "vk_id": 216,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-30T07:34:43.828764+00:00",
                "id": 174,
                "is_active": true,
                "name": "Чехия",
                "vk_id": 215,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-10-31T10:19:46.108639+00:00",
                "id": 175,
                "is_active": true,
                "name": "Аргентина",
                "vk_id": 28,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-01T16:26:14.826200+00:00",
                "id": 176,
                "is_active": true,
                "name": "Греция",
                "vk_id": 71,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-03T13:47:28.966989+00:00",
                "id": 177,
                "is_active": true,
                "name": "Румыния",
                "vk_id": 165,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-08T21:14:12.371021+00:00",
                "id": 178,
                "is_active": true,
                "name": "Турция",
                "vk_id": 200,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-11T16:40:41.218543+00:00",
                "id": 179,
                "is_active": true,
                "name": "Иран",
                "vk_id": 84,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-24T20:05:06.101192+00:00",
                "id": 180,
                "is_active": true,
                "name": "Болгария",
                "vk_id": 39,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-27T11:32:42.782252+00:00",
                "id": 182,
                "is_active": true,
                "name": "Эквадор",
                "vk_id": 221,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-28T04:55:35.950755+00:00",
                "id": 183,
                "is_active": true,
                "name": "Сингапур",
                "vk_id": 182,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-11-29T13:25:06.726249+00:00",
                "id": 184,
                "is_active": true,
                "name": "Дания",
                "vk_id": 73,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-12-06T16:06:13.565603+00:00",
                "id": 186,
                "is_active": true,
                "name": "Таиланд",
                "vk_id": 191,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-12-15T12:49:37.449474+00:00",
                "id": 187,
                "is_active": true,
                "name": "Габон",
                "vk_id": 56,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2016-12-20T07:58:40.273271+00:00",
                "id": 189,
                "is_active": true,
                "name": "Гибралтар",
                "vk_id": 66,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-09T21:31:24.643030+00:00",
                "id": 222,
                "is_active": true,
                "name": "Джибути",
                "vk_id": 231,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-13T22:29:29.027016+00:00",
                "id": 223,
                "is_active": true,
                "name": "Венгрия",
                "vk_id": 50,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-14T20:31:55.389471+00:00",
                "id": 224,
                "is_active": true,
                "name": "Зимбабве",
                "vk_id": 79,
                "vk_remix_lang__remixlang_id": 0
            }, {
                "changed": "2017-02-24T15:39:12.504541+00:00",
                "id": 225,
                "is_active": true,
                "name": "Кабо-Верде",
                "vk_id": 90,
                "vk_remix_lang__remixlang_id": 0
            }],
            "device_prices": [{"device_type_id": 2, "unit_price": "4000.00"}, {
                "device_type_id": 3,
                "unit_price": "2000.00"
            }, {"device_type_id": 4, "unit_price": "3000.00"}, {
                "device_type_id": 1,
                "unit_price": "4500.00"
            }, {"device_type_id": 13, "unit_price": "4999.00"}],
            "device_types": [{"id": 1, "type": "SPORT"}, {"id": 2, "type": "LIFE"}, {"id": 4, "type": "LIFE05"}, {
                "id": 3,
                "type": "LIFE01"
            }, {"id": 5, "type": "SPORTPRO"}, {"id": 6, "type": "LIFEPRO"}, {"id": 7, "type": "LIFE2"}, {
                "id": 9,
                "type": "SPORT2"
            }, {"id": 8, "type": "MEDICPRO"}, {"id": 10, "type": "MEDIC"}, {"id": 11, "type": "FITNESS"}, {
                "id": 12,
                "type": "FITNESSPRO"
            }, {"id": 13, "type": "BP-U80EH-BT"}, {"id": 14, "type": "LIFE02S"}, {"id": 15, "type": "LIFE02G"}, {
                "id": 16,
                "type": "SHKOLNIK"
            }],
            "genders": [{"changed": null, "gender": "Female", "id": 2, "is_active": true}, {
                "changed": null,
                "gender": "Male",
                "id": 1,
                "is_active": true
            }, {"changed": null, "gender": "Unknown", "id": 0, "is_active": true}],
            "payment_types": [{"id": 5, "name": "Яндекс.Деньги"}, {"id": 6, "name": "Банковской картой онлайн"}]
        }
    }, "status": 200
}
const statistic = {
    "result": {
        "dataset": {
            "consumed_calories": [{
                "calc_calories": 0.0,
                "calcium_sum": 0.0,
                "carbohydrate_sum": 0.0,
                "cholesterol_sum": 0.0,
                "fat_sum": 0.0,
                "fiber_sum": 0.0,
                "iron_sum": 0.0,
                "meal_date": "2017-03-26T00:00:00+03:00",
                "monounsaturated_fat_sum": 0.0,
                "polyunsaturated_fat_sum": 0.0,
                "potassium_sum": 0.0,
                "protein_sum": 0.0,
                "saturated_fat_sum": 0.0,
                "sodium_sum": 10.0,
                "sugar_sum": 0.0,
                "vitamin_a_sum": 0.0,
                "vitamin_c_sum": 0.0
            }],
            "consumed_water": [{"calc_water": 500.45, "meal_datetime": "2017-03-26T00:00:00+03:00"}],
            "last_login": "2017-03-23T23:05:24.787966+00:00",
            "user_goals": [{
                "from_date": "2017-01-16",
                "goal": 2000,
                "goals_type_id": 4,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2017-01-16",
                "goal": 480,
                "goals_type_id": 2,
                "to_date": "1970-01-01"
            }, {"from_date": "2017-01-16", "goal": 68, "goals_type_id": 5, "to_date": "1970-01-01"}, {
                "from_date": "2017-01-16",
                "goal": 7200,
                "goals_type_id": 1,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2017-01-16",
                "goal": 5100,
                "goals_type_id": 3,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2016-11-10",
                "goal": 480,
                "goals_type_id": 2,
                "to_date": "2500-01-01"
            }, {"from_date": "2016-11-10", "goal": 70, "goals_type_id": 5, "to_date": null}, {
                "from_date": "2016-11-10",
                "goal": 2100,
                "goals_type_id": 4,
                "to_date": null
            }, {"from_date": "2016-11-10", "goal": 7100, "goals_type_id": 3, "to_date": null}, {
                "from_date": "2016-11-10",
                "goal": 10000,
                "goals_type_id": 1,
                "to_date": "2500-01-01"
            }, {
                "from_date": "2016-11-09",
                "goal": 480,
                "goals_type_id": 2,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2016-11-09",
                "goal": 10000,
                "goals_type_id": 1,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2016-11-09",
                "goal": 7100,
                "goals_type_id": 3,
                "to_date": "1970-01-01"
            }, {
                "from_date": "2016-11-09",
                "goal": 2100,
                "goals_type_id": 4,
                "to_date": "1970-01-01"
            }, {"from_date": "2016-11-09", "goal": 70, "goals_type_id": 5, "to_date": "1970-01-01"}],
            "user_metrics": [],
            "user_sleeps": []
        },
        "support_data": {
            "datetime_request": {
                "last day": "2017-03-25",
                "now_range": ["2017-03-26T00:00:00+00:00", "2017-03-26T23:59:59.999999+00:00"],
                "range day": ["2017-03-25", "2017-03-26T12:07:48.035021+00:00"],
                "request": null,
                "serialized": "2017-03-26T12:07:48.035021+00:00",
                "tz_seconds": 10800
            },
            "goals_types": [{"goals_type": "Дистанция", "id": 3}, {"goals_type": "Сон", "id": 2}, {
                "goals_type": "Шаги",
                "id": 1
            }, {"goals_type": "Вода", "id": 4}, {"goals_type": "Вес", "id": 5}, {"goals_type": "Пульс", "id": 6}]
        }
    }, "status": 200
}
const consumed_fuud = {
    "result": {
        "dataset": {
            "1": {"foods": []},
            "2": {"foods": []},
            "3": {"foods": []},
            "4": {"foods": []}
        },
        "support_data": {"burned_calories": 0.439999997615814, "water_ids": "[37959, 7705, 37922]", "water_sum": null}
    }, "status": 200
}
const pressure = {
    "result": {
        "dataset": [{
            "datetime_ms_id": 1490529590221,
            "id": 65084,
            "is_manually": true,
            "lower_level": 80,
            "metric_time": "2017-03-26T14:59:00+03:00",
            "mood_id": 3,
            "note": "",
            "pulse": 70,
            "upper_level": 120
        }]
    }, "status": 200
}