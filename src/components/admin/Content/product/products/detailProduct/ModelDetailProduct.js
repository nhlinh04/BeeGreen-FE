import { useState, useEffect } from 'react';
import './ModelDetailProduct.scss';
import InfoProduct from './InfoProduct';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { findProductByIdProduct } from '../../../../../../redux/action/productAction'
import { useSearchParams } from 'react-router-dom';
import AuthGuard from "../../../../../auth/AuthGuard";
import RoleBasedGuard from "../../../../../auth/RoleBasedGuard";
import ModelDetailUntis from "./ModelDetailUntis";
import TableBatches from "./TableBatches";
const ModelDetailProduct = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const idProduct = searchParams.get('idProduct');

    const product = useSelector((state) => state.product.product);
    useEffect(() => {
        if (idProduct) {
            getData(idProduct);
        }

    }, [dispatch, idProduct]);
    const getData = (idProduct) => {
        if (idProduct) {
            dispatch(findProductByIdProduct(idProduct));
        }
    }

    return (
        <AuthGuard>
            <RoleBasedGuard accessibleRoles={["ADMIN"]}>
                <div className="model-create-product container-fluid" >
                    <div className="model-create-product-info p-3 m-3">
                        <h4 className="text-center p-3">Thông tin sản phẩm</h4>
                        <InfoProduct product={product} />
                    </div>
                    <div className="model-create-product-sizecolor p-3 m-3">
                        <h4 className="text-center p-3">Thông tin đơn vị quy đổi</h4>
                        <ModelDetailUntis idProduct={idProduct} />
                    </div>
                    <div className="model-create-product-sizecolor p-3 m-3">
                        <TableBatches product={product} />
                    </div>
                </div>
            </RoleBasedGuard>
        </AuthGuard >
    );
}

export default ModelDetailProduct;