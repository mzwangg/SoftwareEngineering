import instance from "../http/index.js"

// 获取用户数据
export const getUsers = () => {
    return instance({
        url: "/api/users",
        method: "GET"
    })
}

// 添加用户数据
export const addUser = (userData) => {
    const {
        account,
        password,
        identity
    } = userData
    return instance({
        url: "/api/users",
        method: "POST",
        data:{
            account,
            password,
            identity
        }
    });
}

export const updateUser = (userData) => {
    const {
        account,
        password,
        identity
    } = userData
    return instance({
        url: `/api/users`,
        method: "PUT",
        data: {
            account,
            password,
            identity
        }
    });
};

export const deleteUser = (account) => {

    return instance({
        url: `/api/users/${account}`,
        method: "DELETE",
    });
};

export const uploadfile = (formData) => {

    return instance({
        url: `/api/upload`,
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data" // 设置请求头为 multipart/form-data
        }
    });
};

export const exportfile = () => {
    return instance({
        url: "/api/export",
        method: "GET"
    })
}