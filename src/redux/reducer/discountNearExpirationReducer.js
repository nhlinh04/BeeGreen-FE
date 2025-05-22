import {
    Fetch_Posts_DiscountConfigNearExpiry_Request,
    Fetch_Posts_DiscountConfigNearExpiry_Success,
    Fetch_Posts_DiscountConfigNearExpiry_Error,
} from '../types/NearExpirationTypes';

const INITIAL_STATE = {
    listConfig: [],
    loading: false,
    error: null,
};

const discountNearExpirationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_FIND_CONFIG_SUCCESS':
            return {
                ...state,
                configDetail: action.payload, // ⬅️ Lưu vào đây
                loading: false,
            };
        case Fetch_Posts_DiscountConfigNearExpiry_Request:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case Fetch_Posts_DiscountConfigNearExpiry_Success:
            return {
                ...state,
                listConfig: action.payload,
                loading: false,
            };

        case Fetch_Posts_DiscountConfigNearExpiry_Error:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default discountNearExpirationReducer;
