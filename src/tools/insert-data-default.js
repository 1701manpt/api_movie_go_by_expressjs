const Threater = require('~/models/threater')
const Seat = require('~/models/seat')
const Customer = require('~/models/customer')
const OrderStatus = require('~/models/order-status')
const UserStatus = require('~/models/user-status')
const Role = require('~/models/role')
const { hashPassword } = require('~/utils/password')
const Category = require('~/models/category')
const Product = require('~/models/product')
const Admin = require('~/models/admin')
const User = require('~/models/user')

const insertOrderStatuses = async () => {
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

    for (const orderStatus of orderStatusArray) {
        await OrderStatus.create(orderStatus)
    }
}

const insertAccountStatuses = async () => {
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

    for (const accountStatus of accountStatusArray) {
        await UserStatus.create(accountStatus)
    }
}

const insertAccounts = async () => {
    const password = await hashPassword('0000')
    await Admin.create(
        {
            full_name: 'Admin 123',
            address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
            phone_number: '0337948940',
            user: {
                email: 'thaiphuongnam1071@gmail.com',
                account: 'admin123',
                password,
                status_id: 2,
                role_id: 1,
            },
        },
        {
            include: {
                as: 'user',
                model: User,
            },
        },
    )
    await Customer.create(
        {
            full_name: 'Khách hàng 123',
            address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
            phone_number: '0337948940',
            user: {
                email: 'thaiphuongnam1071@gmail.com',
                account: 'customer123',
                password,
                status_id: 2,
                role_id: 2,
            },
        },
        {
            include: {
                as: 'user',
                model: User,
            },
        },
    )
    await Customer.create(
        {
            full_name: 'Khách hàng ABC',
            address: '291 An Dương Vương, Quận 6, Thành Phố Hồ Chí Minh',
            phone_number: '0337948940',
            user: {
                email: 'thaiphuongnam1071@gmail.com',
                account: 'customerabc',
                password,
                status_id: 2,
                role_id: 2,
            },
        },
        {
            include: {
                as: 'user',
                model: User,
            },
        },
    )
}

const insertThreatersAndSeats = async () => {
    const threaters = [1, 2, 3, 4, 5]
    const texts = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for (const threater of threaters) {
        await Threater.create({
            name: `Rạp ${threater}`,
        })

        for (const row of texts) {
            for (const column of numbers) {
                await Seat.create({
                    threater_id: threater,
                    text: row,
                    number: column,
                })
            }
        }
    }
}

const insertRoles = async () => {
    const roleArray = [
        {
            id: 1,
            name: 'Admin',
        },
        {
            id: 2,
            name: 'Customer',
        },
    ]

    for (const role of roleArray) {
        await Role.create(role)
    }
}

const insertCategoriesAndProducts = async () => {
    const categories = [
        {
            name: 'Nước uống đóng chai',
            products: [
                {
                    name: 'Sting',
                    price: 20000,
                },
                {
                    name: 'Trà xanh không độ',
                    price: 20000,
                },
                {
                    name: 'Trà ô lông',
                    price: 20000,
                },
                {
                    name: 'Number One',
                    price: 20000,
                },
                {
                    name: 'C2',
                    price: 20000,
                },
                {
                    name: 'Red Bull',
                    price: 20000,
                },
                {
                    name: 'Mirinda vị cam',
                    price: 20000,
                },
            ],
        },
        {
            name: 'Nước uống pha chế',
            products: [
                {
                    name: 'Trà sen vàng',
                    price: 25000,
                },
                {
                    name: 'Cà phê sữa',
                    price: 25000,
                },
                {
                    name: 'Cam vắt',
                    price: 25000,
                },
                {
                    name: 'Chanh muối',
                    price: 25000,
                },
                {
                    name: 'Trà gừng',
                    price: 25000,
                },
                {
                    name: 'Nước ép dâu',
                    price: 25000,
                },
            ],
        },
        {
            name: 'Thức ăn nhanh',
            products: [
                {
                    name: 'Đậu phộng rang bơ',
                    price: 50000,
                },
                {
                    name: 'Đậu nành rang bơ',
                    price: 50000,
                },
                {
                    name: 'Đậu hà lan',
                    price: 50000,
                },
                {
                    name: 'Bắp rang bơ',
                    price: 50000,
                },
                {
                    name: 'Kem vị dâu',
                    price: 10000,
                },
                {
                    name: 'Kem vị dứa',
                    price: 10000,
                },
            ],
        },
        {
            name: 'Món ăn no bụng',
            products: [
                {
                    name: 'Cơm chiên',
                    price: 50000,
                },
                {
                    name: 'Bún thịt',
                    price: 50000,
                },
                {
                    name: 'Phở bò',
                    price: 50000,
                },
                {
                    name: 'Bún đậu',
                    price: 50000,
                },
                {
                    name: 'Cơm nhà nấu',
                    price: 50000,
                },
            ],
        },
    ]
    for (const category of categories) {
        const newCategory = await Category.create({
            name: category.name,
        })

        for (const product of category.products) {
            await Product.create({
                category_id: newCategory.id,
                name: product.name,
                price: product.price,
            })
        }
    }
}

module.exports = {
    insertOrderStatuses,
    insertAccounts,
    insertThreatersAndSeats,
    insertAccountStatuses,
    insertRoles,
    insertCategoriesAndProducts,
}
