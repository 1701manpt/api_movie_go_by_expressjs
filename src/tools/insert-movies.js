const Movie = require('~/models/movie')
const convertXlsxToJson = require('~/utils/convert-xlsx-to-json')

const insertMovies = async () => {
    const moviesJson = convertXlsxToJson('movies.xlsx')
    for (const movie of moviesJson) {
        await Movie.create(movie)
    }
}

module.exports = insertMovies
