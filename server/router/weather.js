const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();

// 获取天气数据
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

router.get('/7daysweather', (req, res) => {
    const { targetDate } = req.query;

    // Check if targetDate is provided
    if (!targetDate) {
        return res.status(400).json({ error: 'Target date is required' });
    }

    // Create Date objects from the targetDate string
    const baseDate = new Date(targetDate);
    if (isNaN(baseDate.getTime())) {
        return res.status(400).json({ error: 'Invalid target date format' });
    }

    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() - 3);

    const endDate = new Date(baseDate);
    endDate.setDate(baseDate.getDate() + 3);

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    const sql = `SELECT 日期 as date, 蒸发量 as evaporation, 降水量 as precipitation, 温度 as temperature FROM weather WHERE 日期 BETWEEN ? AND ?`;

    db.query(sql, [formattedStartDate, formattedEndDate], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No weather data found' });
        }

        res.status(200).json(results);
    });
});


module.exports = router;