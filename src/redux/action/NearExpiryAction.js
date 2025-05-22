import { toast } from 'react-toastify';
import { postCreateNewExpiryConfig } from '../../Service/ApiNearExpirationService';
import { Fetch_Posts_DiscountConfigNearExpiry_Request, Fetch_Posts_DiscountConfigNearExpiry_Success, Fetch_Posts_DiscountConfigNearExpiry_Error } from '../types/NearExpirationTypes';
import { findConfig, updateStatusConfig, getConfigById } from '../../Service/ApiNearExpirationService';
import { Fetch_Find_Config_Success } from '../types/NearExpirationTypes';

export const createNewExpiryConfig = (createNewExpiryConfig) => {
    return async (dispatch) => {
        try {
            //Đếm thời gian loading
            const response = await postCreateNewExpiryConfig(createNewExpiryConfig);
            if (response.status === 200) {
                dispatch(fetchAllConfig());
                toast.success("Thêm cấu hình mới thành công!");
            }
        } catch (error) {

            dispatch(fetchPostsError());
        }
    };
};

export const fetchAllConfig = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await findConfig();
            if (response.status === 200) {
                const data = response.data;
                dispatch(fetchPostsSuccess(data))
            } else {
                toast.error('Error')
                dispatch(fetchPostsError);
            }
        } catch (error) {
            dispatch(fetchPostsError)
        }
    }
}


export const updateStatusConfigById = (idConfig, aBoolean) => {
    return async (dispatch) => {
        try {
            const response = await updateStatusConfig(idConfig, aBoolean);
            if (response.status === 200) {
                dispatch(fetchAllConfig());
                toast.success("Cập nhật cấu hình mục thành công!");
            }
        } catch (error) {

            dispatch(fetchPostsError());
        }
    };
};

export const updateExpiryConfig = (idConfig, updateExpiryConfig) => {
    return async (dispatch) => {
        try {
            const response = await updateExpiryConfig(idConfig, updateExpiryConfig);
            if (response.status === 200) {
                dispatch(fetchAllConfig());
                toast.success("Cập nhật cấu hình mục thành công!");
            }
        } catch (error) {

            dispatch(fetchPostsError());
        }
    };
}

export const findConfigById = (idConfig) => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await getConfigById(idConfig);
            if (response.status === 200) {
                const data = response.data;
                dispatch(FetchFindConfigRequest(data));
            } else {
                toast.error('Error fetching products');
                dispatch(fetchPostsError());
            }
        } catch (error) {
            toast.error('Network Error');
            dispatch(fetchPostsError());
        }
    }
}

export const FetchFindConfigRequest = (payload) => {
    return {
        type: Fetch_Find_Config_Success,
        payload
    }
}

export const fetchPostsRequest = () => {
    return {
        type: Fetch_Posts_DiscountConfigNearExpiry_Request
    }
}

export const fetchPostsSuccess = (payload) => {
    return {
        type: Fetch_Posts_DiscountConfigNearExpiry_Success,
        payload
    }
}

export const fetchPostsError = () => {
    return {
        type: Fetch_Posts_DiscountConfigNearExpiry_Error
    }
}
