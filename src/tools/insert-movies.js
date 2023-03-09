const Movie = require('~/models/movie')
const convertXlsxToJson = require('~/utils/convert-xlsx-to-json')

const insert = async () => {
    const moviesJson = convertXlsxToJson('movies.xlsx')
    moviesJson.forEach(async movie => {
        await Movie.create(movie)
    })
}

module.exports = insert