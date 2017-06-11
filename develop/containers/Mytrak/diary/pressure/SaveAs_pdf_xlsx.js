import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {Download_Icon} from 'components/icons/interface_icons';
import table2excel from 'table2excel';
import table2pdf from 'table-export/dist/tableExport.js';
import {IconMenu, MenuItem} from 'lib/menu';
import {dateToUrl, getTimeAtString, getSmileFilling } from 'utils'

class SaveAs_PDF_XLSX extends Component {


    static propTypes = {}

    saveAs = (workBook) => (e) => {

        const inspectDay = dateToUrl(this.props.date).slice(0, 10) // "2017-02-14"

        const arrDataPressure = this.props.pressureArr.filter((day)=> {
                return day.date.slice(0, 10) == inspectDay
        })

        const name = this.props.name
        const surname = this.props.surname
        const birthday = this.props.birthday
        const height = this.props.height
        const weight = this.props.weight
        const diaryDate = new Date(this.props.date).toLocaleString("ru", {
                month: 'long',
                day: 'numeric'
            }) + ' ' + new Date(this.props.date).getFullYear()

        if (workBook == 'pdf') {

            let table = document.createElement('table');
            table.setAttribute('id', 'table2pdf')
            table.setAttribute('width', '1100px')
            let thead = document.createElement('thead');
            thead.setAttribute('class', 'tBodyPdf')
            let tbody = document.createElement('tbody');
            tbody.setAttribute('class', 'tBodyPdf')
            let oneOtrack = '<tr><td>ONETRAK</td></tr><tr><td>一一一一一</td></tr>'
            thead.innerHTML += oneOtrack
            thead.innerHTML += `<tr class="trHeight"><td class="tdWidth">Фамилия</td><td>${surname}</td></tr><tr class="trHeight"><td class="tdWidth">Имя</td><td >${name}</td></tr><tr class="trHeight"><td class="tdWidth">Дата рождения</td><td >${birthday.split("-").reverse().join(".") + "г"}</td></tr><tr class="trHeight"><td class="tdWidth">Рост</td><td >${height} м.</td></tr><tr class="trHeight"><td class="tdWidth">Вес</td><td>${weight} кг.</td></tr><tr><td>一一一一一</td></tr><tr><td>Данные за:</td><td>${diaryDate}</td></tr><tr><td>一一一一一</td></tr>`
            let tbodyInnerHTML = '<tr class="trHeight"><td class="tdWidth">Время</td><td class="tdWidth">Давление</td><td class="tdWidth">Пульс</td><td class="tdWidth">Самочувствие</td><td class="fromPDFNote">Заметки</td></tr><tr class="trHeight"></tr>'
            arrDataPressure[0].indexs.forEach((dataIndexes)=> {
                tbodyInnerHTML += `<tr class="trHeight"><td width="150px" class="tdWidth">${getTimeAtString(dataIndexes.metric_time)}</td><td width="150px" class="tdWidth">${dataIndexes.upper_level}/${dataIndexes.lower_level}</td><td width="100px" class="tdWidth">${dataIndexes.pulse}</td><td width="150px" class="tdWidth">${getSmileFilling(dataIndexes.mood_id)}</td><td width="550px" class="fromPDFNote">${dataIndexes.note}</td></tr>`
            })

            tbody.innerHTML += tbodyInnerHTML

            table.appendChild(thead)
            table.appendChild(tbody)

            let fromPDFWrap = document.getElementById('fromPDF')
            fromPDFWrap.appendChild(table)

            table2pdf('table2pdf', `ONETRAK_Давление ${new Date().toTimeString()}`, 'pdf')

            setTimeout(()=> {
                fromPDFWrap.innerHTML = ''
            }, 0)
        } else {
            let arr = []
            let table = document.createElement('table');
            let tbody = `<tr><td colspan="23"></td></tr><tr><th colspan="2">Время</th><th colspan="2">Давление</th><th colspan="2">Пульс</th><th colspan="2">Самочувствие</th><th colspan="15">Заметки</th></tr>`
            table.setAttribute('data-excel-name', "Книга_ONETRAK_Давление")
            table.setAttribute('width', '160px')

            let table2excel = new Table2Excel();

            arrDataPressure[0].indexs.forEach((dataIndexes)=> {
                tbody += `<tr rowspan="2"><td colspan="2">${getTimeAtString(dataIndexes.metric_time)}</td><td colspan="2">${dataIndexes.upper_level}/${dataIndexes.lower_level}</td><td colspan="2">${dataIndexes.pulse} уд.мин</td><td colspan="2">${getSmileFilling(dataIndexes.mood_id)}</td><td colspan="15">${dataIndexes.note}</td></tr>`
            })
            let excelTable = `<thead><tr><th colspan="2">Фамилия</th><td colspan="21">${surname}</td></tr><tr><th colspan="2">Имя</th><td colspan="21">${name}</td></tr><tr><th colspan="2">Дата рождения</th><td colspan="21">${birthday.split('-').reverse().join('.') + 'г'}</td></tr><tr><th colspan="2">Рост</th><td colspan="21">${height} м.</td></tr><tr><th colspan="2">Вес</th><td colspan="21">${weight} кг.</td></tr><tr><td colspan="23"></td></tr><tr><td colspan="2">Данные за:</td><td colspan="21">${diaryDate}</td></tr></thead><tbody>${tbody}</tbody>`
            table.innerHTML += excelTable
            arr.push(table)

            table2excel.export(arr, `ONETRAK_Давление ${new Date().toTimeString()}`);
        }
    }

    render() {
        return (
            <IconMenu icon={<div className="dayPressure--menu__Download_Icon"><Download_Icon/></div>}
                      position={this.props.position?this.props.position: 'topRight'  }
                      className__Icon="DownloadMenuWrap" menuRipple>
                <MenuItem onClick={this.saveAs('pdf')} value='' caption='Сохранить в формате .pdf'/>
                <MenuItem onClick={this.saveAs('excel')} value='' caption='Сохранить в формате .excel'/>
            </IconMenu>
        )
    }
}

export default connect(state => ({
    name: state.profile.get('first_name'),
    surname: state.profile.get('last_name'),
    birthday: state.profile.get('birthday'),
    height: state.profile.get('height'),
    weight: state.profile.get('weight'),
    pressureArr: state.pressure.get('data').toJS(),
    date: state.others.get('date')
}))(SaveAs_PDF_XLSX)
