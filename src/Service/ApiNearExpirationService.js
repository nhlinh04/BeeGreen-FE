import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

export const postCreateNewExpiryConfig = async (newExpiryConfig) => {
    return await authorizeAxiosInstance.post('/discount-near-expiration/create', newExpiryConfig);
};


export const findConfig = async () => {
    const response = await authorizeAxiosInstance.get('/discount-near-expiration/all')
    return response
};


export const updateStatusConfig = (idConfig, aBoolean) => {
    return authorizeAxiosInstance.put(`/discount-near-expiration/update-status?id=${idConfig}&aBoolean=${aBoolean}`);
};

export const updateDiscountExpiryConfig = (idConfig, updateExpiryConfig) => {
    return authorizeAxiosInstance.put(`/discount-near-expiration/update/${idConfig}`, updateExpiryConfig);
};


export const getConfigById = (idConfig) => {
    return authorizeAxiosInstance.get(`/discount-near-expiration/${idConfig}`);
};