import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';
import swal from 'sweetalert';
import { createBatches } from '../../../../../Service/ApiBatchesService';
import { LuInbox } from "react-icons/lu";
import { fetchAllProductProductDetail } from '../../../../../redux/action/productAction';

function ModelBatches({ product }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        quantity: yup.string()
            .required('Số lượng là bắt buộc')
            .matches(/^[0-9.]+$/, 'Số lượng phải là số')
            .test('is-valid-range', 'Số lượng phải nhỏ hơn 100.000', (value) => {
                if (!value) return false;
                const num = Number(value.replace(/\./g, ''));
                return num <= 100000;
            }),
        nsx: yup.date()
            .required('Ngày sản xuất là bắt buộc')
            .test('is-past', 'Ngày sản xuất phải trước thời điểm hiện tại', function (value) {
                const now = new Date(); // Lấy thời gian hiện tại
                return new Date(value) < now; // Kiểm tra ngày sản xuất có trước thời điểm hiện tại không
            }),

        hsd: yup.date()
            .required('Hạn sử dụng là bắt buộc')
            .test('is-future', 'Hạn sử dụng phải sau thời điểm hiện tại', function (value) {
                const now = new Date(); // Lấy thời gian hiện tại
                return new Date(value) > now; // Kiểm tra hạn sử dụng có sau thời điểm hiện tại không
            })
            .test('is-greater', 'Hạn sử dụng phải sau ngày sản xuất', function (value) {
                const { nsx } = this.parent;  // Lấy giá trị của nsx từ formik
                return new Date(value) > new Date(nsx);  // So sánh hạn sử dụng với ngày sản xuất
            })
    });

    const initialValues = {
        quantity: '',
        nsx: '',
        hsd: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
        try {
            const batchesRequest = {
                idProduct: product.id,
                quantity: values.quantity,
                nsx: new Date(values.nsx).toISOString(),
                hsd: new Date(values.hsd).toISOString(),
            }

            const willCreate = await swal({
                title: 'Xác nhận',
                text: 'Bạn có chắc muốn thêm lô hàng mới?',
                icon: 'warning',
                buttons: ['Hủy', 'Đồng ý'],
                dangerMode: true,
            });

            if (willCreate) {
                try {
                    const response = await createBatches(batchesRequest);
                    if (response && response.status === 200) {
                        swal('Thành công', 'Lô hàng đã được thêm thành công!', 'success');
                        dispatch(fetchAllProductProductDetail());
                        resetForm();
                        handleClose();
                    } else {
                        swal('Thất bại', 'Không thể thêm lô hàng. Vui lòng thử lại.', 'error');
                    }
                } catch (error) {
                    swal('Thất bại', 'Không thể thêm lô hàng. Vui lòng thử lại.', 'error');
                }
            }
        } catch (error) {
            toast.error("Lỗi khi xử lý thêm lô. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow} className="mx-2">
                <LuInbox />
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nhập hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <div className='row mb-3'>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="quantity">
                                            <span className="text-danger">*</span> Số lượng nhập ({product.baseUnit}):
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            min="1"
                                            placeholder="Nhập số lượng ..."
                                            value={values.quantity}
                                            onChange={handleChange}
                                            isInvalid={touched.quantity && !!errors.quantity}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.quantity}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <Form.Label htmlFor="NSX"><span className="text-danger">*</span> Ngày sản xuất:</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="NSX"
                                            name="nsx"
                                            value={values.nsx}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.nsx && !!errors.nsx}
                                        />
                                        {touched.nsx && errors.nsx && <div className="text-danger">{errors.nsx}</div>}
                                    </div>
                                    <div className='col'>
                                        <Form.Label htmlFor="HSD"><span className="text-danger">*</span> Hạn sử dụng:</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="HSD"
                                            name="hsd"
                                            value={values.hsd}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.hsd && !!errors.hsd}
                                        />
                                        {touched.hsd && errors.hsd && <div className="text-danger">{errors.hsd}</div>}
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModelBatches;