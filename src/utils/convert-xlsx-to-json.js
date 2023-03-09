const xlsx = require('xlsx');

const convert = (nameFile) => {
    const workbook = xlsx.readFile('src/data/sample/' + nameFile);
    const sheet_name_list = workbook.SheetNames;
    const json_data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    return json_data
}

module.exports = convert