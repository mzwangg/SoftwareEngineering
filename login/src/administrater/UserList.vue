<template>
    <div>
        <div class="header">
            <div class="serchBlock">
                <input type="text" placeholder="搜索用户">
                <button onclick="showFilter()" style="margin-left: 20px;">筛选</button>
                <button onclick="startSearch()" style="margin-left: 20px;">搜索</button>
            </div>
            <button onclick="showAddDialog()">添加用户</button>
        </div>

        <table class="user-table">
            <thead>
                <th style="width: 25%;">账号</th>
                <th style="width: 25%;">密码</th>
                <th style="width: 25%;">权限</th>
                <th style="width: 25%;">操作</th>
            </thead>
            <tbody>
                <UserItem v-for="user in displayedUsers" :key="user.id" :user="user" />
            </tbody>
        </table>
        <Pagination :total="totalUsers" :pageSize="pageSize" @pageChange="handlePageChange" class="pagination "/>

        <!-- 增加用户对话框 -->
        <el-dialog v-model="addDialogVisible" title="增加用户">
            <el-form :model="addForm" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="addForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="addForm.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="addForm.role" placeholder="请选择">
                        <el-option label="User" value="User"></el-option>
                        <el-option label="Admin" value="Admin"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false" style="margin:0 20%;">取消</el-button>
                <el-button type="primary" @click="addUser" style="margin:0 20%;">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import UserItem from './UserItem.vue';
import Pagination from './Pagination.vue';

export default {
    components: {
        UserItem,
        Pagination
    },
    data() {
        return {
            users: [
                { id: 1, account: 'user1', password: '******', role: 'Admin' },
                { id: 2, account: 'user2', password: '******', role: 'User' },
                { id: 3, account: 'user3', password: '******', role: 'User' },
                { id: 4, account: 'user4', password: '******', role: 'User' },
                { id: 5, account: 'user5', password: '******', role: 'User' },
                { id: 6, account: 'user6', password: '******', role: 'User' },
                { id: 7, account: 'user7', password: '******', role: 'User' },
                { id: 8, account: 'user8', password: '******', role: 'User' },
                { id: 9, account: 'user9', password: '******', role: 'User' },
                { id: 10, account: 'user10', password: '******', role: 'User' },
                { id: 11, account: 'user11', password: '******', role: 'User' },
                { id: 12, account: 'user12', password: '******', role: 'User' },
                // 其他示例用户数据...
            ],
            currentPage: 1,
            pageSize: 8,
            addForm: {
                account: '',
                password: '',
                role: ''
            },
        };
    },
    computed: {
        totalUsers() {
            return this.users.length;
        },
        displayedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.users.slice(startIndex, endIndex);
        }
    },
    methods: {
        handlePageChange(page) {
            this.currentPage = page;
        },
        showAddDialog() {
            this.addDialogVisible = true;
        },
        addUser() {
            // 编辑用户逻辑
            console.log('Added user:', this.addForm);
            this.addDialogVisible = false;
        },
    }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
}

.header button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #157cf1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.header button:hover {
  background-color: #1a8bc2;
}

input[type="text"] {
  padding: 10px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007bff;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
}

.user-table th {
    padding: 10px;
    border-bottom: 1px solid rgba(7, 118, 181, .7);
    text-align: center;
    background-color: #157cf1;
    color: #fff;
}

.pagination {
    text-align: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #f2f2f2;
}

.pagination button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.dialog-footer {
    display: flex;
    justify-content: center;
}

.pagination{
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px 0;
}
</style>