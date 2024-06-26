import instance from "../http/index.js"

export const getweight = (species) => {
    return instance({
        url: `/api/fish/${species}`,
        method: "GET",
    });
};

export const getspeciesnum = () => {
    return instance({
        url: `/api/speciesnum`,
        method: "GET",
    });
};

export const getfry = () => {
    return instance({
        url: `/api/fry`,
        method: "GET",
    });
};

export const getgrow = () => {
    return instance({
        url: `/api/grow`,
        method: "GET",
    });
};

export const gettotal = () => {
    return instance({
        url: `/api/total`,
        method: "GET",
    });
};