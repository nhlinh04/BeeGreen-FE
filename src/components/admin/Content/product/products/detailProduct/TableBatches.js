import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useDebounce } from 'use-debounce';
import { findBatchesByIdProduct } from '../../../../../../Service/ApiBatchesService';

const NotFoundData = '/NotFoundData.png';

const TableBatches = ({ product }) => {
    const [listBatches, setListBatches] = useState([]); // Initialize as empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState("");
    const [filterOption, setFilterOption] = useState("all"); // State for filter
    const [debouncedSearchName] = useDebounce(searchName, 1000);
    const itemsPerPage = 3;

    useEffect(() => {
        if (product?.id) {
            getBatches();
        }
    }, [product?.id]); // Add idProduct as dependency if it can change

    const getBatches = async () => {
        try {
            const request = await findBatchesByIdProduct(product.id);
            if (request.status === 200) {
                setListBatches(request.data || []); // Ensure we always set an array
            }
        } catch (error) {
            console.error("Lỗi dữ liệu lô!", error);
            setListBatches([]); // Set empty array on error
        }
    };

    // Filter batches based on search and filter option
    const filteredBatches = listBatches.filter(batch => {
        const isMatchingSearch = batch.code?.toLowerCase().includes(debouncedSearchName.toLowerCase()) ||
            batch.quantity?.toString().includes(debouncedSearchName);

        const now = new Date();
        const hsdDate = new Date(batch.hsd);
        const daysToExpire = Math.ceil((hsdDate - now) / (1000 * 60 * 60 * 24));

        if (filterOption === "expiredOrZero") {
            return isMatchingSearch && (batch.quantity === 0 || daysToExpire <= 0);
        } else if (filterOption === "expiringSoon") {
            return isMatchingSearch && daysToExpire > 0 && daysToExpire <= 3;
        }

        return isMatchingSearch; // Default: show all
    });

    const currentProduct = filteredBatches;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentProduct.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(currentProduct.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };

    return (
        <>
            <div className='search-product mb-3'>
                <label htmlFor="nameProduct" className="form-label">Danh sách lô sản phẩm</label>
                <input
                    type="text"
                    className="form-control"
                    id="nameProduct"
                    placeholder="Tìm kiếm theo mã lô hoặc số lượng..."
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                />
            </div>
            <div className='filter-product mb-3'>
                <label htmlFor="filterOption" className="form-label">Lọc sản phẩm</label>
                <select
                    id="filterOption"
                    className="form-select"
                    value={filterOption}
                    onChange={(event) => setFilterOption(event.target.value)}
                >
                    <option value="all">Tất cả</option>
                    <option value="expiredOrZero">Hết hàng và hết hạn sử dụng</option>
                    <option value="expiringSoon">HSD còn 3 ngày</option>
                </select>
            </div>
            <div className='table-product mb-3'>
                <Table bordered hover className='align-middle'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã lô</th>
                            <th>Số lượng {product.baseUnit}</th>
                            <th>Ngày sản xuất</th>
                            <th>Hạn sử dụng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item, index) => {
                                const now = new Date();
                                const hsdDate = new Date(item.hsd);
                                const daysToExpire = Math.ceil((hsdDate - now) / (1000 * 60 * 60 * 24));

                                return (
                                    <tr key={item.id} className={daysToExpire < 3 ? "table-danger" : ""}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{item.code || 'N/A'}</td>
                                        <td>{item.quantity || 0} {product.baseUnit}</td>
                                        <td>
                                            {
                                                new Date(item.nsx)
                                                    .toLocaleString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                                + " " +
                                                new Date(item.nsx)
                                                    .toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })
                                            }
                                        </td>
                                        <td>
                                            {
                                                new Date(item.hsd)
                                                    .toLocaleString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                                + " " +
                                                new Date(item.hsd)
                                                    .toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="preview-image justify-content-center text-center p-3">
                                    <img src={NotFoundData} alt="Preview" style={{ maxWidth: "10%" }} />
                                    <p className='p-3'>Không có dữ liệu</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {totalPages > 0 && (
                    <div className='d-flex justify-content-center'>
                        <Pagination>
                            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                            {getPaginationItems().map((page) => (
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handleClickPage(page)}
                                    disabled={page === currentPage}
                                >
                                    {page}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                )}
            </div>
        </>
    );
};

export default TableBatches;