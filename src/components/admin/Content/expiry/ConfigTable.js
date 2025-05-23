import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { fetchAllConfig, updateStatusConfigById } from '../../../../redux/action/NearExpiryAction';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaPenToSquare } from "react-icons/fa6";
import ModelEdit from './ModelEdit';
const ConfigTable = () => {
    const dispatch = useDispatch();
    const configs = useSelector((state) => state.config.listConfig);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchAllConfig());
    }, [dispatch]);


    const handleUpdateStatusConfig = async (idConfig, isChecked) => {
        dispatch(updateStatusConfigById(idConfig, isChecked))
    };

    const sortedConfigs = [...configs].sort((a, b) => a.daysBeforeExpiry - b.daysBeforeExpiry);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedConfigs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedConfigs.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    // Xác định các trang được hiển thị dựa trên currentPage
    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            // Nếu tổng số trang <= 3, hiển thị tất cả
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            // Nếu đang ở trang đầu tiên
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            // Nếu đang ở trang cuối cùng
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            // Nếu đang ở giữa
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Số ngày trước hết hạn</th>
                        <th>Phần trăm giảm</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={`table-user-${index}`}>
                                <td>{index + 1 + (currentPage - 1) * 5}</td>
                                <td>{item.daysBeforeExpiry}</td>
                                <td>{item.discountPercent}</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id={`flexSwitchCheckChecked-${item.id}`}
                                            checked={item.status === 'ACTIVE'}
                                            onChange={(e) => handleUpdateStatusConfig(item.id, e.target.checked)}  // Truyền trạng thái checked
                                        />
                                    </div>
                                </td>
                                <td>
                                    <ModelEdit config={item} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

                    {getPaginationItems().map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handleClickPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </>
    );
};

export default ConfigTable;
