import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

export const createBatches = async (batchesRequest) => {
    const response = await authorizeAxiosInstance.post("/batches/create", batchesRequest);
    return response;
};

export const findBatchesByIdProduct = async (idProduct) => {
    const response = await authorizeAxiosInstance.get(`/batches/findBatchesByIdProduct?idProduct=${encodeURIComponent(idProduct)}`);
    return response;
};