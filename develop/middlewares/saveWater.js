/*
//TODO this is not REDUX WAY, this is simple middleware, who just send info, without send action


export default function (opt) {
    const {meal_time, consumed, isRemoving, model} = opt;


    //TODO это что то типа jquery
    // model.set('isLoading', true)

    console.log(meal_time, consumed, isRemoving)

    const url = isRemoving ? '/mytrak/api/v1/consumed_food/delete_water' : '/mytrak/api/v1/consumed_food/add_water';
    const method = isRemoving ? 'DELETE' : 'POST'


    //return

    fetch(url, {
        method: method,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'food_count': consumed,
            'meal_time': meal_time,
            'datetime_ms_id': Date.now(),
            'date': meal_time
        })
    }).then(function (response) {
        //console.log('DEV', meal_time)

            //TODO это что то типа jquery
        // model.set('isLoading', false)
        console.log('--четОтправилиВода')

        if (response.status !== 200) {
            try {
                throw new TryCatchError(response && response.statusText, {url})
            } catch (err) {

                //TODO send action!
                // sendCrashReport('WaterPage_Fetch', err)
                console.log('--error', err)

            }
        } else {
            return response
        }
    })
}*/
