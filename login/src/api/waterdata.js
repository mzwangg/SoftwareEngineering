import instance from "../http/index.js"

// 获取用户数据
export const getwaterdata = () => {
    return instance({
        url: "/api/waterdata",
        method: "GET"
    })
}

// 获取雷达图所需水质数据
export const getMoreWaterData = () => {
    return instance({
        url: "/api/morewaterdata",
        method: "GET"
    })
}