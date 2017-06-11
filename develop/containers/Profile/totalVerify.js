import {
    checkName,
    checkPassword,
    checkBirthday,
    checkHeight,
    checkWeight,
    checkEmail,
    checkPhone,
    checkGender,
    checkGlobalGoal,
    checkStepsGoal,
    checkDistGoal,
    checkSleepGoal,
    checkWeightGoal,
    checkWaterGoal
} from "./verifications";

export function accountVerify(props){
    const { passwordBlockActive, first_name,  middle_name, last_name, email,
        oldPas, newPas, newPasRepeat, phone_number} = props;

    const firstName = checkName(first_name, true);
    const lastName = checkName(last_name, true);
    const middleName = checkName(middle_name);
    const eMail = checkEmail(email, true);
    const phone_num = checkPhone(phone_number);

    let hasMistake = firstName.hasMistake || lastName.hasMistake || middleName.hasMistake || eMail.hasMistake || phone_num.hasMistake ;

    let verify = { hasMistake, firstName, lastName, middleName, eMail, phone_num };

    if(passwordBlockActive) {
        const old_pas = checkPassword(oldPas, true, 'old');
        const new_pas = checkPassword(newPas, true, 'new');
        const new_pas_repeat = checkPassword(newPasRepeat, true, 'new', newPas);

        verify.hasMistake = verify.hasMistake || old_pas.hasMistake ||  new_pas.hasMistake ||  new_pas_repeat.hasMistake

        Object.assign(verify, {old_pas, new_pas, new_pas_repeat})
    }


    return verify

}

export function medcartVerify(g, b, h, w){
    const gender = checkGender(g);
    const birthday = checkBirthday(b);
    const height = checkHeight(h);
    const weight = checkWeight(w);

    const hasMistake = gender.hasMistake || birthday.hasMistake || height.hasMistake || weight.hasMistake ;

    return {hasMistake, gender, birthday, height, weight }
}

export function goalsVerify(opt){
    let {global, steps, sleep, weight, water, height, userWeight, gender} = opt;

    global = checkGlobalGoal(global);
    steps = checkStepsGoal(steps);
    sleep = checkSleepGoal(sleep);
    water = checkWaterGoal(water, userWeight);
    let weightGoal = checkWeightGoal(weight);

    let dist = checkDistGoal(steps.formated, height, gender);

    const hasMistake = global.hasMistake || steps.hasMistake || dist.hasMistake || sleep.hasMistake || weightGoal.hasMistake || water.hasMistake ;

    return {hasMistake, global, steps, dist, sleep, weightGoal, water }
}

