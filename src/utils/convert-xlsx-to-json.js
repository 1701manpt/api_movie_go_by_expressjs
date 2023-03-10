const xlsx = require('xlsx')

const convert = nameFile => {
    const workbook = xlsx.readFile('src/data/sample/' + nameFile)
    const sheetNameList = workbook.SheetNames
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])

    return jsonData
}

module.exports = convert
