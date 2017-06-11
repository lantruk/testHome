/*
export default function (dateObj, kind_profile) {
    
    let str;
    const date = utils.dateToUrl(dateObj); //2015-07-30T08:00+03:00

    if (kind_profile === 'my_profile') {
        str = 'api/v1/user_statistic/' + _.escape(date)

    } else if (kind_profile === 'user_profile') {
        str = 'api/v1/friends_statistic/' + _.escape(date) + '?user_id=' + this.profile.get('user_id')
    }


    this.dashboardData.set({
        isLoading: true,
        fetch: fetch(str, {credentials: 'include'})
    })

    // setTimeout(()=> {
    this.dashboardData.get('fetch').then((response) => {
            if (response.status !== 200) {
                throw new TryCatchError(response && response.responseText, {str})
            }

            return response.json()
        }, (xhr) => {
            try {
                throw new TryCatchError(xhr && xhr.responseText, {str})
            } catch (err) {
                utils.sendCrashReport('Dasboard get_data_from_server', err)
            }
        })
        .then((response)=> {
            this.dashboardData.set({
                isLoading: false,
                fetch: undefined,
                responseData: response.result
            })
        })
    //  }, 2000)
}
*/
