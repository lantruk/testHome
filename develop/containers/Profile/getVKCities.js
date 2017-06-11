import fetchJsonp from 'fetch-jsonp'
import {sendCrashReport, my_informPopUp} from 'AC/others'
import {connect} from 'react-redux'

export const getCityIdFromName = (name, response) => {


    if (!name || !response) return null

    const index = response.findIndex(obj => {
        return name.toLowerCase().trim() === obj.title.toLowerCase().trim()
    })

    return index !== -1 ? response[index].id : null
}

export default function (query, country_id) {

    const _this = this;
    const start = Date.now();
    const url = "https://api.vk.com/method/database.getCities?v=5.5&country_id=" + country_id + "&need_all=0&lang=0&count=100&q=" + (query || '');
    let end;
    let data = ''


    fetchJsonp(url)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
        data = json

        _this.response = json.response.items

       var citys = json.response.items.map((item)=> {

            return item.title
        })

        //debugger
        _this.setState({
            cities: citys,
            originalCity: json.response.items,
            //city_id: city_id || null,
            isLoading: false
        })


    }).catch(function (ex) {
        sendCrashReport(ex) // не работает отправка об ошибке
    })

}
/**
 * Created by a.franchko on 22.07.2016.
 */
