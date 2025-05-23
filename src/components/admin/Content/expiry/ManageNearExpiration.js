import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { fetchAllCategory, fetchSearchCategory } from '../../../../redux/action/categoryAction';
import ModelCreate from "./ModelCreate";
import ConfigTable from "./ConfigTable";
import AuthGuard from "../../../auth/AuthGuard";
import RoleBasedGuard from "../../../auth/RoleBasedGuard";
const ManageNearExpiration = () => {
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("");
    const [debouncedSearchName] = useDebounce(searchName, 1000); // Sử dụng useDebounce với delay 1000ms
    useEffect(() => {
        if (debouncedSearchName) {
            dispatch(fetchSearchCategory(debouncedSearchName));
        } else {
            dispatch(fetchAllCategory());
        }
    }, [debouncedSearchName, dispatch]);
    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
                <div className="manage-cart-container">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <h3>Quản lý giảm giá sản phẩm theo hạn sử dụng</h3>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <div className="cart-content">
                                        <div className='shoe-content-hender'>
                                            <div className='shoe-search-add row'>

                                                <div className='shoe-add mb-3 col-2'>
                                                    <ModelCreate />
                                                </div>
                                                <div className='shoe-content-body mt-3'>
                                                    <ConfigTable />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </RoleBasedGuard>
        </AuthGuard>
    )
}
export default ManageNearExpiration;