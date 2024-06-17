import instance from "../http/index.js"

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

export const downloadfile = (exportFormData) => {
    const {
        exportDataType,
        exportFileName
    } = exportFormData
    return instance({
        url: `/api/download`,
        method: "POST",
        data: {
            exportDataType,
            exportFileName
        }
    });
}