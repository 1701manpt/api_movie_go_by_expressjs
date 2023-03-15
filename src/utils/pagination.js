const snakeCase = require('~/utils/snake-case')

class Pagination {
    constructor({ perPage = 5, page = 1 }) {
        this.perPage = perPage
        this.page = page
        this.count = 0
    }

    setCount(count) {
        this.count = count
    }

    getLimit() {
        return Number(this.perPage)
    }

    getOffset() {
        return Number(this.page * this.perPage - this.perPage)
    }

    getInfor() {
        const page = this.page
        const perPage = this.perPage
        const totalPage = Math.ceil(this.count / this.perPage)
        const totalRecord = this.count
        return snakeCase({ page, perPage, totalPage, totalRecord })
    }
}

module.exports = Pagination
