const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();
const bcrypt = require('bcrypt');

// 获取一个水质数据
router.get('/waterdata', (req, res) => {
    const sql = "SELECT * FROM waterqualitydata WHERE 'pH(无量纲)' IS NOT NULL AND '溶氧量(mg/L)' IS NOT NULL AND '高锰酸盐指数（mg/L）' IS NOT NULL AND '氨氮（mg/L）' IS NOT NULL AND '总磷（mg/L）' IS NOT NULL ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results); // 将数据作为 JSON 响应返回给前端
        }
    });
});

// 获取雷达图所需水质数据
router.get('/morewaterdata', (req, res) => {
    const sql = "SELECT `水温（℃）`, `pH(无量纲)`, `溶氧量(mg/L)`, `电导率（μS/cm）`, `浊度（NTU）`, `高锰酸盐指数（mg/L）`, `氨氮（mg/L）`, `总磷（mg/L）` FROM waterqualitydata WHERE `水温（℃）` IS NOT NULL AND `水温（℃）` BETWEEN 10 AND 30 AND `pH(无量纲)` IS NOT NULL AND `pH(无量纲)` BETWEEN 6 AND 9 AND `溶氧量(mg/L)` IS NOT NULL AND `溶氧量(mg/L)` BETWEEN 5 AND 14 AND `电导率（μS/cm）` IS NOT NULL AND `电导率（μS/cm）` BETWEEN 50 AND 500 AND `浊度（NTU）` IS NOT NULL AND `浊度（NTU）` BETWEEN 0 AND 10 AND `高锰酸盐指数（mg/L）` IS NOT NULL AND `高锰酸盐指数（mg/L）` BETWEEN 0.2 AND 1 AND `氨氮（mg/L）` IS NOT NULL AND `氨氮（mg/L）` BETWEEN 0 AND 0.1 AND `总磷（mg/L）` IS NOT NULL AND `总磷（mg/L）` BETWEEN 0.01 AND 0.1 ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results); // 将数据作为 JSON 响应返回给前端
        }
    });
});


module.exports = router;