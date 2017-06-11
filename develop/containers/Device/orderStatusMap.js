const orderStatusMap = new Map([
    [10, 'Ожидание оплаты'],
    [20, 'Оплачено'],
    [30, 'Апгрейд выполнен']
]);

export const paymentTypes = {
    AC: 'Банковской картой онлайн',
    PC: 'Яндекс.Деньги'
}


export default orderStatusMap
