<template>
    <div>
        <div class="header">
            <div class="serchBlock">
                <input type="text" placeholder="搜索用户">
                <button @click="startSearch()" style="margin-left: 20px;">搜索</button>
            </div>
            <div>
                <button @click="addDialogVisible = true">添加用户</button>
                <button @click="showImportDialog = true">导入数据</button>
                <button @click="showExportDialog = true">导出数据</button>
            </div>
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
        <Pagination :total="totalUsers" :pageSize="pageSize" @pageChange="handlePageChange" class="pagination " />

        <!-- 增加用户对话框 -->
        <el-dialog v-model="addDialogVisible" title="增加用户" width="30%">
            <el-form :model="addForm" label-width="20%">
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

        <!-- 导入数据对话框 -->
        <el-dialog title="导入数据" v-model="showImportDialog" width="30%">
            <el-form>
                <el-form-item label="选择文件">
                    <el-upload ref="upload" action="" :http-request="handleFileUpload" :auto-upload="false"
                        accept=".csv,.xlsx,.txt">
                        <el-button type="primary" class="left-align">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-select v-model="importDataType" placeholder="请选择数据类型">
                        <el-option label="用户数据" value="type1"></el-option>
                        <el-option label="鱼类数据" value="type2"></el-option>
                        <el-option label="水文数据" value="type3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showImportDialog = false">取消</el-button>
                <el-button type="primary" @click="handleImport">导入</el-button>
            </div>
        </el-dialog>

        <!-- 导出数据对话框 -->
        <el-dialog title="导出数据" v-model="showExportDialog" width="30%">
            <el-form>
                <el-form-item label="数据类型">
                    <el-select v-model="exportDataType" placeholder="请选择数据类型">
                        <el-option label="用户数据" value="type1"></el-option>
                        <el-option label="鱼类数据" value="type2"></el-option>
                        <el-option label="水文数据" value="type3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称">
                    <el-input v-model="exportFileName" placeholder="输入文件名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showExportDialog = false">取消</el-button>
                <el-button type="primary" @click="handleExport">导出</el-button>
            </div>
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
            addDialogVisible: false,
            showImportDialog: false,
            showExportDialog: false,
            importDataType: '',
            exportDataType: '',
            exportFileName: ''
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
        addUser() {
            // 编辑用户逻辑
            console.log('Added user:', this.addForm);
            this.addDialogVisible = false;
        },
        handleFileUpload(file) {
            // 处理文件上传
            console.log('Uploaded file:', file.file)
        },
        handleImport() {
            // 处理导入逻辑
            console.log('Importing file with type:', this.importDataType)
            this.showImportDialog = false
        },
        handleExport() {
            if (!this.exportFileName) {
                this.$message.error('请提供文件名称');
                return;
            }

            // 模拟导出数据
            const data = { name: '示例数据', value: 12345 };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = this.exportFileName + '.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            this.showExportDialog = false;
        }
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

.pagination {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px 0;
}
</style>