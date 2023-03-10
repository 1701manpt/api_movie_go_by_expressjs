const Threater = require('~/models/threater')
const Seat = require('~/models/seat')
const ShowTime = require('~/models/show-time')
const Employee = require('~/models/employee')
const Customer = require('~/models/customer')
const { hashPassword } = require('~/utils/password')

const insertAccountDefault = async () => {
    const password = await hashPassword('0000')
    await Employee.create({
        full_name: 'Nhân viên 123',
        address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
        phone_number: '0337948940',
        email: 'thaiphuongnam1071@gmail.com',
        account: 'employee123',
        password,
        status_id: 2,
        role_id: 1,
    })
    await Customer.create({
        full_name: 'Khách hàng 123',
        address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
        phone_number: '0337948940',
        email: 'thaiphuongnam1071@gmail.com',
        account: 'customer123',
        password,
    })
}

const insertDefault = async () => {
    const threaters = [1, 2, 3, 4, 5]
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    threaters.forEach(async e => {
        await Threater.create({
            name: `Rạp ${e}`,
        })
    })

    threaters.forEach(threater => {
        rows.forEach(row => {
            numbers.forEach(async number => {
                await Seat.create({
                    threater_id: threater,
                    text: row,
                    number,
                })
            })
        })
    })

    await ShowTime.create({
        threater_id: 1,
        movie_id: 1,
        date_time: Date.now(),
        price: 150000,
    })

    // await Order.create({
    //     customer_id: 1,
    //     status_id: 4,
    // })

    // await Ticket.create({
    //     order_id: 1,
    //     seat_id: 1,
    //     show_time_id: 1,
    // })
}

const insert = () => {
    insertAccountDefault()
    insertDefault()
}

module.exports = insert
