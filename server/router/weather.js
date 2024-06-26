const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();

// 获取一个天气数据
router.get('/weather', (req, res) => {
    const sql = "SELECT MONTH(日期) AS month, AVG(温度) AS avg_temp, AVG(蒸发量) AS avg_evaporation, AVG(降水量) AS avg_precipitation FROM weather GROUP BY MONTH(日期); ";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No weather found' });
        }

        res.status(200).json(results);
    });
});



module.exports = router;