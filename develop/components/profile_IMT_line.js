function getXcoordForBMI(BMI) {

    //const BMI = this.props.BMI,
    const maxBMI = 45,
        minBMI = 10,
        _100 = 430;

    let x = 0, percernRel;



    percernRel = Math.smartRound((BMI - minBMI) * 100 / (maxBMI - minBMI), 2)
    x = percernRel * _100 / 100

    if (x < 10) {
        x = 10
    } else if (x > _100) {
        x = _100
    }

    return Math.smartRound(x, 2)

}


export default function IMT_line(props) {
    const BMI = props.BMI,
        xCoordBMI = getXcoordForBMI(BMI);

    const _16 = getXcoordForBMI(16);
    const _18_5 = getXcoordForBMI(18.5);
    const _25 = getXcoordForBMI(25);
    const _30 = getXcoordForBMI(30);
    const _35 = getXcoordForBMI(35);
    const _40 = getXcoordForBMI(40);


    return (
        <div className={"profileIMT_line" + (props.type == 'account' ? " __profileIMT_line_Account" : "")}>
            <svg viewBox="0 0 440 50" height="50px" width="440px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path id="popupWeight--gradient1" d="m0 0h1v4h-1v-4"/>
                    <linearGradient x1="14.7218113%" x2="96.6844711%" id="popupWeight--gradient0">
                        <stop stopColor="#a74336" offset="0%"/>
                        <stop stopColor="#d77922" offset="2.95900347%"/>
                        <stop stopColor="#fcd12b" offset="7.90789059%"/>
                        <stop stopColor="#257f0c" offset="35.8572226%"/>
                        <stop stopColor="#257f0c" offset="40.1689052%"/>
                        <stop stopColor="#fcd12b" offset="51.5485491%"/>
                        <stop stopColor="#9f3a3a" offset="100%"/>
                    </linearGradient>
                </defs>
                <g transform="translate(0 19)" fill="none" fillRule="evenodd">
                    <rect fill="url(#popupWeight--gradient0)" y="6" width="440" height="4" rx="2"/>
                    <g transform="translate(0 6)" fill="#fafafa">
                        <use transform={"translate(" + _16 + ")"} xlinkHref="#popupWeight--gradient1"/>
                        <use transform={"translate(" + _18_5 + ")"} xlinkHref="#popupWeight--gradient1"/>
                        <use transform={"translate(" + _25 + ")"} xlinkHref="#popupWeight--gradient1"/>
                        <use transform={"translate(" + _30 + ")"} xlinkHref="#popupWeight--gradient1"/>
                        <use transform={"translate(" + _35 + ")"} xlinkHref="#popupWeight--gradient1"/>
                        <use transform={"translate(" + _40+ ")"} xlinkHref="#popupWeight--gradient1"/>
                    </g>
                    <g transform="translate(0 15)" fontSize="12" fontFamily="Roboto" fill="#ced1d6">
                        <text textAnchor="middle">
                            <tspan x={_16} y="10">16</tspan>
                        </text>
                        <text textAnchor="middle">
                            <tspan x={_18_5} y="10">18,5</tspan>
                        </text>
                        <text textAnchor="middle">
                            <tspan x={_25} y="10">25</tspan>
                        </text>
                        <text textAnchor="middle">
                            <tspan x={_30} y="10">30</tspan>
                        </text>
                        <text textAnchor="middle">
                            <tspan x={_35} y="10">35</tspan>
                        </text>
                        <text textAnchor="middle">
                            <tspan x={_40} y="10">40</tspan>
                        </text>
                    </g>
                    <g transform={"translate("+ xCoordBMI +")"}>
                        <g transform="translate(-8.5 0)">
                            <path
                                d="M8.5,15 C4.358,15 1,11.642 1,7.5 C1,3.358 4.358,0 8.5,0 C12.642,0 16,3.358 16,7.5 C16,11.642 12.642,15 8.5,15"
                                fill="#f6b321"/>
                            <path
                                d="M8.5,11 C10.433,11 12,9.433 12,7.5 C12,5.567 10.433,4 8.5,4 C6.567,4 5,5.567 5,7.5 C5,9.433 6.567,11 8.5,11"
                                fill="#fafafa"/>
                        </g>
                        <text textAnchor="middle" transform="translate(0 -17)" fontSize="14" fontFamily="Roboto" fontWeight="bold" fill="#4e5768">
                            <tspan x="0" y="11">{BMI}</tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </div>
    )


}

IMT_line.propTypes = {
    BMI: React.PropTypes.number.isRequired
};
