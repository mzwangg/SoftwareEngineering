import instance from "../http/index.js"

// 获取天气数据
export const getWeatherData = () => {
    return instance({
        url: "/api/weather",
        method: "GET"
    })
}

// 获取7日天气数据
export const get7DaysWeatherData = (targetDate) => {
    return instance({
        url: "/api/7daysWeather",
        method: "GET",
        params: { targetDate }
    })
}