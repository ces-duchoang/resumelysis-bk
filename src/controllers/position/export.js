var Excel = require('exceljs');
const config = require('../../config');

async function excelOp(position) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile(config.UPLOAD_FOLDER + '/All.xlsx');
    let worksheet = workbook.getWorksheet('Sheet1');
    var header = worksheet.getRow(1);
    header.height = 50;
    header.getCell(1).value = {
        text: position.title,
        hyperlink: '/position/' + position._id,
        tooltip: '/position/' + position._id
    };
    position.ranked.forEach((resume, i) => {
        worksheet.getRow(i + 3).values = [
            resume.point,
            resume.name,
            resume.email,
            resume.phones[0] || '',
            resume.selected ? 'YES' : 'NO',
            {
                text: 'Link',
                hyperlink: '/resumes/' + resume._id,
                tooltip: '/resumes/' + resume._id
            }
        ];
        worksheet.getRow(i + 3).height = 20;
        worksheet.getRow(i + 3).getCell(5).alignment = {
            vertical: 'middle',
            horizontal: 'center'
        };
        worksheet.getRow(i + 3).getCell(6).alignment = {
            vertical: 'middle',
            horizontal: 'center'
        };
    });
    const filename =
        position.title.replace(/[^\w\s]/gi, '') + '-' + Date.now() + '.xlsx';
    workbook.xlsx.writeFile(config.UPLOAD_FOLDER + '/' + filename);
    return filename;
}

const { getPositionById } = require('../../objectservices/Position');
const {
    InternalServerError,
    Success,
    NotFound
} = require('../../helpers/ResponseHelper');

const exportExcel = async (req, res) => {
    try {
        const position = await getPositionById(req.params.positionId);
        if (!position) return NotFound(res);
        const result = await excelOp(
            getData(req.params.num, position.toJSON())
        );
        Success(res, { file: result });
    } catch (err) {
        InternalServerError(res);
    }
};

const getData = (num, data) => {
    const n = parseInt(num);
    if (n) {
        let count = 0;
        data.ranked = data.ranked.reduce((d, e, i) => {
            if (e.selected && count < n) {
                ++count;
                d.push(e);
            }
            return d;
        }, []);
        return data;
    } else {
        return data;
    }
};

module.exports = exportExcel;
