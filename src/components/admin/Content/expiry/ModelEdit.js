import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpiryConfig, findConfigById } from '../../../../redux/action/NearExpiryAction';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Formik } from 'formik';
import { FaPenToSquare } from 'react-icons/fa6';

function ModelEdit({ config }) {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [initialValues, setInitialValues] = useState({
        daysBeforeExpiry: config.daysBeforeExpiry,
        discountPercent: config.discountPercent,
        status: config.status
    });


    const handleClose = () => setShow(false);


    const handleShow = async () => {

        setShow(true);
    };


    const validationSchema = yup.object().shape({
        daysBeforeExpiry: yup.number()
            .required('Số ngày còn lại là bắt buộc')
            .min(1, 'Phải lớn hơn hoặc bằng 1'),
        discountPercent: yup.number()
            .required('Giá trị giảm là bắt buộc')
            .min(0, 'Giảm giá không được nhỏ hơn 0%')
            .max(100, 'Giảm giá không được vượt quá 100%'),
    });

    const handleSubmitEdit = async (values, { resetForm }) => {
        try {
            dispatch(updateExpiryConfig(config.id, values)); // Bạn cần viết action này
            toast.success("Cập nhật thành công!");
            handleClose();
            resetForm();
        } catch (error) {
            toast.error("Lỗi khi cập nhật cấu hình. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <FaPenToSquare />
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa cấu hình giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitEdit}
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
                                        Cập nhật
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

export default ModelEdit;
