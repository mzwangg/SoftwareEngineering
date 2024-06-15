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
        role
    } = userData
    return instance({
        url: "/api/users",
        method: "POST",
        data:{
            account,
            password,
            role
        }
    });
}

export const updateUser = (userData) => {
    const {
        account,
        password,
        role
    } = userData
    return instance({
        url: `/api/users`,
        method: "PUT",
        data: {
            account,
            password,
            role
        }
    });
};

export const deleteUser = (account) => {

    return instance({
        url: `/api/users/${account}`,
        method: "DELETE",
    });
};