import instance from "../http/index.js"

// 获取用户数据
export const getWeatherData = () => {
    return instance({
        url: "/api/weather",
        method: "GET"
    })
}

export const get7DaysWeatherData = (Date) => {
    return instance({
        url: "/api/7daysWeather",
        method: "GET",
        params: { Date }
    })
}