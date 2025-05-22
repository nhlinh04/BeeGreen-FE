import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createNewCategory } from '../../../../redux/action/categoryAction'; // Bạn có thể đổi tên hàm action cho đúng mục đích
import { createNewExpiryConfig } from '../../../../redux/action/NearExpiryAction';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';

function ModelCreate() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = yup.object().shape({
        daysBeforeExpiry: yup.number()
            .required('Số ngày còn lại là bắt buộc')
            .min(1, 'Phải lớn hơn hoặc bằng 1'),
        discountPercent: yup.number()
            .required('Giá trị giảm là bắt buộc')
            .min(0, 'Giảm giá không được nhỏ hơn 0%')
            .max(100, 'Giảm giá không được vượt quá 100%'),
    });

    const handleSubmitCreate = async (values, { resetForm }) => {
        try {
            dispatch(createNewExpiryConfig(values)); // Đổi tên hàm nếu cần thiết
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi thêm cấu hình. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Thêm cấu hình giảm giá
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm cấu hình giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            daysBeforeExpiry: '',
                            discountPercent: '',
                            status: 'ACTIVE'
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitCreate}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>
                                        <span className="text-danger">*</span> Số ngày còn lại đến hạn:
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="daysBeforeExpiry"
                                        value={values.daysBeforeExpiry}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.daysBeforeExpiry && !!errors.daysBeforeExpiry}
                                    />
                                    {touched.daysBeforeExpiry && errors.daysBeforeExpiry && (
                                        <div className="text-danger">{errors.daysBeforeExpiry}</div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>
                                        <span className="text-danger">*</span> Giá trị giảm giá (%):
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="discountPercent"
                                        value={values.discountPercent}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.discountPercent && !!errors.discountPercent}
                                    />
                                    {touched.discountPercent && errors.discountPercent && (
                                        <div className="text-danger">{errors.discountPercent}</div>
                                    )}
                                </Form.Group>

                                <Modal.Footer className="mt-4">
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

export default ModelCreate;
