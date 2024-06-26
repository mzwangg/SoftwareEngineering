const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();
const bcrypt = require('bcrypt');

// 获取鱼群重量
router.get('/fish/:species', (req, res) => {
    const species = req.params.species;
    const sql = "SELECT `Weight(g)` FROM fish WHERE Species = ?";
    db.query(sql, [species], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// 获取鱼群种类数量
router.get('/speciesnum', (req, res) => {
    const sql = 'SELECT COUNT(DISTINCT Species) AS speciesCount FROM fish';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// 获取鱼苗数量
router.get('/fry', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM fish WHERE (species = 'Bream' AND `Weight(g)` < 350) OR (species = 'Roach' AND `Weight(g)` < 100) OR (species = 'Whitefish' AND `Weight(g)` < 300) OR (species = 'Parkki' AND `Weight(g)` < 100) OR (species = 'Perch' AND `Weight(g)` < 150) OR (species = 'Pike' AND `Weight(g)` < 400) OR (species = 'Smelt' AND `Weight(g)` < 8)";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// 获取生长鱼数量
router.get('/grow', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM fish WHERE (species = 'Bream' AND `Weight(g)` >= 350 AND `Weight(g)` < 700) OR (species = 'Roach' AND `Weight(g)` >= 100 AND `Weight(g)` < 200) OR (species = 'Whitefish' AND `Weight(g)` >= 300 AND `Weight(g)` < 600) OR (species = 'Parkki' AND `Weight(g)` >= 100 AND `Weight(g)` < 200) OR (species = 'Perch' AND `Weight(g)` >= 150 AND `Weight(g)` < 500) OR (species = 'Pike' AND `Weight(g)` >= 400 AND `Weight(g)` < 900) OR (species = 'Smelt' AND `Weight(g)` >= 8 AND `Weight(g)` < 15)";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// 获取鱼群总数
router.get('/total', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM fish";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;