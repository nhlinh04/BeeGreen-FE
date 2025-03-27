import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategory } from '../../../../../../redux/action/categoryAction';
import ListImageProduct from '../../../../../../image/ListImageProduct';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const InfoProduct = ({ product }) => {
    const dispatch = useDispatch();
    const categorys = useSelector((state) => state.category.listCategory);

    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);



    return (
        <Container fluid>
            <Form.Group className="m-3">
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    value={product.name}
                    disabled
                />
            </Form.Group>
            <Row>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số lượng sản phẩm ..."
                            name="quantity"
                            value={product.quantity}
                            disabled
                        />
                    </Form.Group>
                </Col>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Giá sản phẩm:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập giá sản phẩm ..."
                            name="pricePerBaseUnit"
                            value={product.pricePerBaseUnit}
                            disabled
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="m-3">
                    <Form.Group>
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Select
                            name="idCategory"
                            value={product.idCategory}
                            disabled
                        >
                            <option value="">Chọn danh mục</option>
                            {categorys?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="m-3">
                    <Form.Group >
                        <Form.Label>Đơn vị gốc sản phẩm:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập đơn vị gốc sản phẩm ..."
                            name="baseUnit"
                            value={product.baseUnit}
                            disabled
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col className="m-3">
                    <Form.Label>Mô tả sản phẩm:</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={product.description}
                        readOnly={true} // Chỉ hiển thị, không chỉnh sửa
                        modules={{ toolbar: false }} // Ẩn thanh công cụ
                        style={{ minHeight: "100px", maxHeight: "none", backgroundColor: "#f8f9fa", overflow: "hidden" }}
                    />
                </Col>
            </Row>
            <Row>
                <Form.Group className="m-3">
                    <input
                        type="file"
                        id="uploadListFiles"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                    />
                </Form.Group>
            </Row>

            <Row
                className="preview-image justify-content-center text-center p-3"
                style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "LightGray",
                    minHeight: "100px"
                }}
            >
                <Col
                    xs={12}
                    md={8} // Responsive: thu nhỏ trên màn hình nhỏ
                    className="d-flex justify-content-center align-items-center"
                >
                    <ListImageProduct
                        id={product?.id}
                        maxWidth="100%" // Chiếm toàn bộ chiều rộng của Col
                        maxHeight="1000px" // Giới hạn chiều cao tối đa
                        containerClassName="product-image-container"
                        imageClassName="product-image"
                        center={true} // Căn giữa
                    />
                </Col>

            </Row>

        </Container >
    );
};

export default InfoProduct;
