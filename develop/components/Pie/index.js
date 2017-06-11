import {PropTypes, Component} from 'react';
import Chart from 'chart.js';
import deepAssign from 'deep-assign';


class Pie extends Component {

    static propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        tooltipSign: PropTypes.string,
        data: PropTypes.shape({
            labels: PropTypes.array,
            datasets: PropTypes.arrayOf(PropTypes.shape({
                data: PropTypes.array.isRequired,
                backgroundColor: PropTypes.array.isRequired,
                hoverBackgroundColor: PropTypes.array.isRequired
            }).isRequired).isRequired
        }).isRequired,
        options: PropTypes.object
    }

    componentDidMount() {
        this.initializeChart()
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    componentWillReceiveProps(nextProps) {
        const isChangeData = this.props.data.datasets.some( (set, index) => {
            if(this.props.tooltipSign)

            if(!set.data.equals( nextProps.data.datasets[index].data )) return true
        });

        if (isChangeData) {
            this.chart.destroy()
            this.initializeChart(nextProps.data)
        }
    }

    initializeChart(data) {
        if (!data) data = this.props.data


        const ctx = this.refs.canvas.getContext("2d");

        let defaults = this.getOptions()
        const opt = deepAssign(defaults, this.props.options);

        this.chart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: opt
        })
    }

    getOptions() {
        const sign = this.props.tooltipSign || ''

        return {
            animation: {
                easing: 'easeOutQuad',
                duration: 1000
            },
            responsive: true,
            title: {
                display: false,
                padding: 0
            },
            legend: {
                display: false
            },
            tooltips: {
                mode: 'single',
                titleSpacing: 0,
                titleMarginBottom: 0,
                backgroundColor: 'rgba(255,255,255,1)',
                bodyFontFamily: 'Roboto-Light',
                bodyFontColor: 'black',
                bodyFontSize: 14,
                bodySpacing: 1,
                footerMarginTop: 10,
                callbacks: {
                    beforeLabel: (tooltipItem, data)=> {
                        return data.labels[tooltipItem.index]
                    },
                    label: (tooltipItem, data)=> {
                        //Если только один пункт значит нет данных
                        if (data.datasets[0].data.length == 1) return ''

                        return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' ' + sign
                    }
                }
            }
        }
    }


    render() {
        const {width, height} = this.props;

        return <canvas ref="canvas" width={width || '100%'} height={height || '100%'}></canvas>
    }
}


export default Pie