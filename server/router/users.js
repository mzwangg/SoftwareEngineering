// router/users.js

const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();

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
    const { account, password, role } = req.body;
    const sql = 'insert into users set ?';
    db.query(sql, {
            account,
            password,
            role
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
    const { account, password, role } = req.body;
    const sql = 'UPDATE users SET password=?, role=? WHERE account=?';
    db.query(sql, [password, role, account], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        } else {
            res.json({ message: 'User updated successfully', id: result.insertId });
        }
    });
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

module.exports = router;
