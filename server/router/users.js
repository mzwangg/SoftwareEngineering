const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();
const bcrypt = require('bcrypt');

// 获取所有用户数据
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users'; // 根据你的数据库表名调整此查询
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// 添加用户数据
router.post('/users', (req, res) => {
    const { account, password, identity } = req.body;
    const jmpassword = bcrypt.hashSync(password, 10);
    const sql = 'insert into users set ?';
    db.query(sql, {
        account,
        password: jmpassword,
        identity
    }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add user' });
        } else {
            res.json({ message: 'User added successfully', id: result.insertId });
        }
    });
});

// 修改用户数据
router.put('/users', (req, res) => {
    const { account, password, identity } = req.body;
    if (password) {
        const jmpassword = bcrypt.hashSync(password, 10);
        const sql = 'UPDATE users SET password=?, identity=? WHERE account=?';
        db.query(sql, [jmpassword, identity, account], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to update user' });
            } else {
                res.json({ message: 'User updated successfully', id: result.insertId });
            }
        });
    } else {
        const sql = 'UPDATE users SET identity=? WHERE account=?';
        db.query(sql, [identity, account], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to update user' });
            } else {
                res.json({ message: 'User updated successfully', id: result.insertId });
            }
        });
    }
});

// 删除用户
router.delete('/users/:account', (req, res) => {
    const useraccount = req.params.account;
    const sql = 'DELETE FROM users WHERE account = ?';
    db.query(sql, [useraccount], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else {
            res.json({ message: 'User deleted successfully', id: result.insertId });
        }
    });
});

// router.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     const importDataType = req.body.type;

//     if (!file) {
//         return res.status(400).send('No file uploaded');
//     }

//     const filePath = path.join(__dirname, file.path);
//     const fileExt = path.extname(file.originalname).toLowerCase();

//     if (fileExt === '.csv') {
//         importCsvData(filePath, importDataType, res);
//     } else if (fileExt === '.xlsx') {
//         importExcelData(filePath, importDataType, res);
//     } else {
//         return res.status(400).send('Unsupported file type');
//     }
// });

// function importCsvData(filePath, importDataType, res) {
//     const results = [];
//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             storeDataInDatabase(results, importDataType, res);
//             fs.unlinkSync(filePath); // 删除临时文件
//         });
// }

// function importExcelData(filePath, importDataType, res) {
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);
//     storeDataInDatabase(jsonData, importDataType, res);
//     fs.unlinkSync(filePath); // 删除临时文件
// }

// function storeDataInDatabase(data, importDataType, res) {
//     let tableName;
//     let fields = [];
//     let values = [];

//     // 根据不同的数据类型选择不同的数据库表
//     if (importDataType === 'type1') {
//         tableName = 'users';
//     } else if (importDataType === 'type2') {
//         tableName = 'fish';
//     } else if (importDataType === 'type3') {
//         tableName = 'waterqualitydata';
//     } else {
//         return res.status(400).send('Invalid data type');
//     }

//     // 获取字段名
//     fields = Object.keys(data[0]);

//     // 生成插入语句
//     const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES ?`;

//     // 生成值
//     values = data.map(item => fields.map(field => item[field]));

//     db.query(sql, [values], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Failed to import data');
//         }
//         res.send('Data imported successfully');
//     });
// }

router.get('/export', (req, res) => {
    const exportDataType = req.query.type; // 获取导出数据类型参数

    // 根据导出数据类型选择数据库表
    let tableName;
    if (exportDataType === 'type1') {
        tableName = 'users';
    } else if (exportDataType === 'type2') {
        tableName = 'fish';
    } else if (exportDataType === 'type3') {
        tableName = 'waterqualitydata';
    } else {
        return res.status(400).send('Invalid export data type');
    }

    // 查询数据库中的数据
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to export data');
        }

        // 导出数据为 JSON 格式
        res.json(results);
    });
});

module.exports = router;
