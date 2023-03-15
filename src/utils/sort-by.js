const sortBy = array => {
    return (
        array?.split(',').map(e => {
            if (e.includes('-')) {
                return [e.slice(1), 'DESC']
            }
            return [e, 'ASC']
        }) || []
    )
}

module.exports = sortBy
