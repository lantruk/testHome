import React, {PropTypes, Component} from 'react';



export default (Decorator) => class NewFuncDecorated extends Component {

    options = () => {
        return {
            upper_level: this.props.propsState.upper_level,
            lower_level: this.props.propsState.lower_level,
            id: this.props.propsState.id,
            pulse: this.props.propsState.pulse,
            metric_time: this.props.propsState.isOpenAddPopUp ? this.props.propsState.timeNow : this.props.propsState.editDate,
            mood_id: this.props.propsState.mood_id,
            datetime_ms_id: this.props.propsState.datetime_ms_id,
            note: this.props.propsState.note,
            is_manually: this.props.propsState.isOpenAddPopUp ? true : this.props.propsState.is_manually
        }
    }

    sortTime(firstDate, nextDate) {
        return Date.parse(firstDate.metric_datetime || firstDate.metric_time) - Date.parse(nextDate.metric_datetime || nextDate.metric_time);
    }

    InspectionTimeInterval = () => {
        let inspectionPeriod = this.props.nowData ? this.props.nowData : []
        let beforeDatePeriod = this.props.beforeData? this.props.beforeData : []
        let afterDatePeriod = this.props.afterDate? this.props.afterDate : []

        let inspect = this.props.propsState.isOpenAddPopUp ? this.props.propsState.timeNow : this.props.propsState.editDate

        if (this.props.propsState.isEditPopUp) {
            let notInspectThisDay = inspectionPeriod.filter((index)=> {
                return this.props.propsState.datetime_ms_id != index.datetime_ms_id
            })
            inspectionPeriod = notInspectThisDay
        }

        return (
            inspectionPeriod.some((itemModelPressure)=> {
                return !(new Date(itemModelPressure.metric_time).getTime() <= new Date(inspect).getTime() - 600000 || new Date(itemModelPressure.metric_time).getTime() >= new Date(inspect).getTime() + 600000)
            }) || beforeDatePeriod.some((itemModelPressure)=> {
                return !(new Date(itemModelPressure.metric_time).getTime() <= new Date(inspect).getTime() - 600000 || new Date(itemModelPressure.metric_time).getTime() >= new Date(inspect).getTime() + 600000)
            }) || afterDatePeriod.some((itemModelPressure)=> {
                return !(new Date(itemModelPressure.metric_time).getTime() <= new Date(inspect).getTime() - 600000 || new Date(itemModelPressure.metric_time).getTime() >= new Date(inspect).getTime() + 600000)
            })
        )
    }

    InspectionDayBefore = () => {
        let InspectDay = this.props.propsState.isOpenAddPopUp ? this.props.propsState.timeNow : this.props.propsState.editDate
    
        if (new Date(InspectDay).getHours() < 7) {
            // включаем popUp уведомления о сохранении в предыдущий день
            return true
        } else {
            return false
        }
    }

    
    drowNewData = () => {

        let options = this.options()
        let oldResponse = this.props.nowData

        if (this.props.propsState.isOpenAddPopUp) {
            let newResponse = oldResponse.filter(()=>true)
            oldResponse = newResponse
            oldResponse.push(options)
        }
        if (this.props.propsState.isEditPopUp) {
            let newResponse = oldResponse.filter((index)=> {
                return index.datetime_ms_id != options.datetime_ms_id
            })
            oldResponse = newResponse

            if (new Date(options.metric_time).getDate() == this.props.diaryDate.getDate()) {
                if (new Date(options.metric_time).getHours() < 7) {
                    this.props.isInformDay()
                } else oldResponse.push(options)
            } else {
                if (new Date(options.metric_time).getHours() < 7) {
                    oldResponse.push(options)
                } else {
                    this.InspectionTimeInterval()
                }
            }
        }

        //после каждого изменения формируем новый Pressure_collection для графика
        let newPressure_collection = oldResponse.map((item)=> {
            return {
                diasPressure: item.lower_level,
                metric_datetime: item.metric_time,
                pulse: item.pulse,
                sistPressure: item.upper_level,
                note: item.note
            }
        })
        
        //добавление в модель только введенных показателей (для графика и для списка давлений)
       // this.props.dataModel.set({'nowData': oldResponse.sort(this.sortTime)})
       // this.props.dataModel.set({'pressure_collection': newPressure_collection.sort(this.sortTime)})

        //после измений в PopUp отрисовуем новый график из модели
        //this.props.chart.draw_columns()

    }


    drowAfterDelete = (data) => {
      /*  let oldResponse = this.props.dataModel.get('nowData')

        let newResponse = oldResponse.filter((index)=> {
            return index.datetime_ms_id != data.datetime_ms_id
        })
        let newPressure_collection = newResponse.map((item)=> {
            return {
                diasPressure: item.lower_level,
                metric_datetime: item.metric_time,
                pulse: item.pulse,
                sistPressure: item.upper_level,
                note: item.note
            }
        })

        this.props.dataModel.set({'nowData': newResponse.sort(this.sortTime)})
        this.props.dataModel.set({'pressure_collection': newPressure_collection.sort(this.sortTime)})*/

    }

    render() {
        return (
            <Decorator {...this.props} InspectionTimeInterval={this.InspectionTimeInterval}
                                       InspectionDayBefore={this.InspectionDayBefore}
                                       drowNewData={this.drowNewData}
                                       options={this.options}
                                       drowAfterDelete={this.drowAfterDelete}
            />

        )
    }
}


