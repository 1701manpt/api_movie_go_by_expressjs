const Threater = require('~/models/threater')
const Seat = require('~/models/seat')
const Movie = require('~/models/movie')
const Ticket = require('~/models/ticket')
const Order = require('~/models/order')
const ShowTime = require('~/models/show-time')
const UserStatus = require('~/models/user-status')
const OrderStatus = require('~/models/order-status')
const Role = require('~/models/role')
const Employee = require('~/models/employee')
const Customer = require('~/models/customer')
const { hashPassword } = require('~/utils/password')

const insertOrderStatus = () => {
    const orderStatusArray = [
        {
            id: 1,
            name: 'Chờ xác nhận',
        },
        {
            id: 2,
            name: 'Chờ lấy hàng',
        },
        {
            id: 3,
            name: 'Đang giao hàng',
        },
        {
            id: 4,
            name: 'Đã nhận',
        },
        {
            id: 5,
            name: 'Đã hủy',
        },
        {
            id: 6,
            name: 'Trả hàng',
        },
    ]

    orderStatusArray.forEach(async e => {
        await OrderStatus.create(e)
    })
}

const insertAccountStatus = () => {
    const accountStatusArray = [
        {
            id: 1,
            name: 'Chưa xác thực',
        },
        {
            id: 2,
            name: 'Đã xác thực',
        },
        {
            id: 3,
            name: 'Tạm xóa',
        },
        {
            id: 4,
            name: 'Khóa',
        },
    ]

    accountStatusArray.forEach(async e => {
        await UserStatus.create(e)
    })
}

const insertRole = () => {
    const roleArray = [
        {
            id: 1,
            name: 'Administrator',
        },
    ]

    roleArray.forEach(async e => {
        await Role.create(e)
    })
}

const insertAccountDefault = async () => {
    const password = await hashPassword('0000')
    await Employee.create({
        full_name: 'Nhân viên 123',
        address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
        phone: '0337948940',
        email: 'thaiphuongnam1071@gmail.com',
        account: 'employee123',
        password,
        status_id: 2,
        role_id: 1,
    })
    await Customer.create({
        full_name: 'Khách hàng 123',
        address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
        phone: '0337948940',
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
                    number: number,
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
}

const insert = () => {
    insertAccountStatus()
    insertRole()
    insertOrderStatus()
    insertAccountDefault()
    insertDefault()
}

module.exports = insert
