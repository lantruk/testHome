import {
    LOAD_PROFILE_DATA,
    START,
    SUCCESS,
    PROFILE_VERIFICATION,
    ACCOUNT,
    MEDCART,
    GOALS,
    STOP_LOADER,
    START_LOADER,
    ERROR_POP_UP_FROM_SERVER
} from '../constants.js'
import {merge, fromJS, Map} from 'immutable'
import {checkAndSetDefaultPhotos, ageFromBirthdate} from '../utils.js'
import {accountVerify, medcartVerify, goalsVerify} from '../containers/Profile/totalVerify.js'

//profile key in store
const defaultState = fromJS({
    isLoading: false,
    access: null,
    avatar_url: null,
    background_image_url: null,
    birthday: null,
    bmr_id: null,
    city: null,
    country: null,
    date_joined: null,
    email: null,
    first_name: null,
    gender: null,
    height: null,
    heights: null,
    last_login: null,
    last_name: null,
    middle_name: null,
    name: null,
    phone_number: null,
    social_accounts: null,
    weight: null,
    weights: null,
    user_goals: null,
    profileVerify: {}
})

export default (state = defaultState, action) => {
    const {type, response} = action

    switch (type) {
        case LOAD_PROFILE_DATA + START:
            return state//.set('isLoading', true);

        case LOAD_PROFILE_DATA + SUCCESS:
        {
            const {
                access, avatar_url, background_image_url, birthday, bmr_id, city, country, date_joined, email, user_goals,
                first_name, gender, height, heights, last_login, last_name, middle_name, name, phone_number, social_accounts, weight, weights
            } = response.result.dataset;

            //Если почта была сгенерена сервером при регистрации по соц сетям удалим почту и попадем на зполнение данных
            const checkedEmail = email.indexOf('@empty.one-trak.ru') !== -1 ? '' : email;
            //ПРоверяем фотки
            const {checkedAva, checkedBack} = checkAndSetDefaultPhotos(avatar_url, background_image_url, gender)
            //Добавляем возраст
            const age = ageFromBirthdate(birthday)


            //Новый объект с глубокой имутабельной структурой
            const newState = fromJS({
                isLoading: true,
                email: checkedEmail,
                user_goals,
                access,
                avatar_url: checkedAva,
                background_image_url: checkedBack,
                age,
                birthday,
                bmr_id,
                city,
                country,
                date_joined,
                first_name,
                gender,
                height,
                heights,
                last_login,
                last_name,
                middle_name,
                name,
                phone_number,
                social_accounts,
                weight, weights
            })

            //Возвращаем смерженные старый и новый profile
            return state.merge(newState)
        }
        case PROFILE_VERIFICATION:
        {

            const {first_name, last_name, middle_name, email, phone_number, gender, birthday, height, weight, user_goals} = state.toJS()

            const account = accountVerify({
                passwordBlockActive: false,
                first_name,
                last_name,
                middle_name,
                email,
                phone_number
            });
            const medcart = medcartVerify(gender, birthday, height, weight);


            let global, steps, sleep, water, weightGoal;

            user_goals.forEach((goal)=> {

                switch (goal.goals_type_id) {
                    case -1:
                        global = goal.goal
                        break;
                    case 1:
                        steps = goal.goal
                        break;
                    case 2:
                        sleep = goal.goal
                        break;
                    case 4:
                        water = goal.goal
                        break;
                    case 5:
                        weightGoal = goal.goal
                        break;
                }
            })

            const goal = goalsVerify({
                global,
                steps,
                sleep,
                weight: weightGoal,
                water,
                height,
                userWeight: weight,
                gender
            });


            return state.set('profileVerify', fromJS({
                //isMistake: true,
                isMistake: account.hasMistake || medcart.hasMistake || goal.hasMistake,
                rout: account.hasMistake ? ACCOUNT : medcart.hasMistake ? MEDCART : goal.hasMistake ? GOALS : null,
                account: account,
                medcart: medcart,
                goal: goal
            }))
        }



    }

    return state
}
