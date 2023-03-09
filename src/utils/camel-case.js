const toCamel = s =>
    s.replace(/([-_][a-z])/gi, $1 =>
        $1.toUpperCase().replace('-', '').replace('_', ''),
    )

const isArray = function (a) {
    return Array.isArray(a)
}

const isObject = function (o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

const camelCase = function (o) {
    if (isObject(o)) {
        const n = {}

        Object.keys(o).forEach(k => {
            n[toCamel(k)] = camelCase(o[k])
        })

        return n
    }
    if (isArray(o)) {
        return o.map(i => camelCase(i))
    }

    return o
}

module.exports = camelCase
