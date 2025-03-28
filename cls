[1mdiff --git a/src/components/admin/Content/discount/sale/ModelCreatePromotion.js b/src/components/admin/Content/discount/sale/ModelCreatePromotion.js[m
[1mindex 58f9b18..ae1c78f 100644[m
[1m--- a/src/components/admin/Content/discount/sale/ModelCreatePromotion.js[m
[1m+++ b/src/components/admin/Content/discount/sale/ModelCreatePromotion.js[m
[36m@@ -53,6 +53,12 @@[m [mexport default function ModelCreatePromotion() {[m
 [m
     const handleSubmitCreate = async (values, { resetForm }) => {[m
         try {[m
[32m+[m[32m            if (!selectedProductIds || selectedProductIds.length === 0) {[m
[32m+[m[32m                toast.error("Cần chọn sản phẩm sale!");[m
[32m+[m[32m                return;[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            console.log("selectedProductIds", selectedProductIds)[m
             const promotionRequest = {[m
                 ...values,[m
                 startAt: new Date(values.startAt).toISOString(),[m
[1mdiff --git a/src/components/admin/Content/discount/voucher/ModelCreateVoucher.js b/src/components/admin/Content/discount/voucher/ModelCreateVoucher.js[m
[1mindex af68daf..777a1be 100644[m
[1m--- a/src/components/admin/Content/discount/voucher/ModelCreateVoucher.js[m
[1m+++ b/src/components/admin/Content/discount/voucher/ModelCreateVoucher.js[m
[36m@@ -312,7 +312,7 @@[m [mfunction ModelCreateVoucher() {[m
               const emailContent = generateEmailContent({[m
                 companyName: "GreenBee",[m
                 companyPhone: "0909 123 456",[m
[31m-                companyEmail: "linhnhph33830@fpt.edu.vn",[m
[32m+[m[32m                companyEmail: "greenbee@gmail.com",[m
                 customerName: customer?.name || "thân mến",[m
                 voucherCode: voucherDetails.codeVoucher,[m
                 discountName: voucherDetails.name,[m
[36m@@ -320,7 +320,7 @@[m [mfunction ModelCreateVoucher() {[m
                 minOrderValue: voucherDetails.minBillValue,[m
                 expirationDate: voucherDetails.endAt,[m
                 startDate: voucherDetails.startAt,[m
[31m-                websiteUrl: "http://localhost:3000/",[m
[32m+[m[32m                websiteUrl: "https://GreenBee.com",[m
                 image:[m
                   "https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png",[m
               });[m
[1mdiff --git a/src/components/admin/Content/product/products/TableProduct.js b/src/components/admin/Content/product/products/TableProduct.js[m
[1mindex 88d1fb2..ef03591 100644[m
[1m--- a/src/components/admin/Content/product/products/TableProduct.js[m
[1m+++ b/src/components/admin/Content/product/products/TableProduct.js[m
[36m@@ -55,6 +55,11 @@[m [mconst TableShoe = ({ currentPage, setCurrentPage }) => {[m
 [m
         return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);[m
     };[m
[32m+[m[32m    const formatCurrency = (value) => {[m
[32m+[m[32m        if (!value) return '0';[m
[32m+[m[32m        const roundedValue = Math.round(value) || 0;[m
[32m+[m[32m        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");[m
[32m+[m[32m    };[m
     return ([m
         <>[m
             <Table striped bordered hover>[m
[36m@@ -64,6 +69,7 @@[m [mconst TableShoe = ({ currentPage, setCurrentPage }) => {[m
                         <th className='text-center'>Tên sản phẩm</th>[m
                         <th className='text-center'>Số lượng</th>[m
                         <th className='text-center'>Đơn vị gốc</th>[m
[32m+[m[32m                        <th className='text-center'>Giá</th>[m
                         <th className='text-center'>Danh mục</th>[m
                         <th className='text-center'>Ảnh</th>[m
                         <th className='text-center'>Trạng thái</th>[m
[36m@@ -78,6 +84,7 @@[m [mconst TableShoe = ({ currentPage, setCurrentPage }) => {[m
                                 <td className='text-center align-middle'>{item.name}</td>[m
                                 <td className='text-center align-middle'>{item.quantity} {item.baseUnit}</td>[m
                                 <td className='text-center align-middle'>{item.baseUnit}</td>[m
[32m+[m[32m                                <td className='text-center align-middle'>{formatCurrency(item.pricePerBaseUnit)} VND</td>[m
                                 <td className='text-center align-middle'>{item.nameCategory}</td>[m
                                 <td className="d-flex justify-content-center align-items-center">[m
                                     <ListImageProduct[m
[1mdiff --git a/src/components/page/policy/Policy.js b/src/components/page/policy/Policy.js[m
[1mindex e751d5f..bfb23b7 100644[m
[1m--- a/src/components/page/policy/Policy.js[m
[1m+++ b/src/components/page/policy/Policy.js[m
[36m@@ -29,7 +29,7 @@[m [mconst PolicyPage = () => {[m
             <p>[m
                 Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ:[m
                 <strong>[m
[31m-                    namntph33821@gmail.com</strong>.[m
[32m+[m[32m                    greenbee@gmail.com</strong>.[m
             </p>[m
         </div>[m
     );[m
[1mdiff --git a/src/components/page/product/productDetail/ProductDetail.js b/src/components/page/product/productDetail/ProductDetail.js[m
[1mindex e33b9c0..8a3bcec 100644[m
[1m--- a/src/components/page/product/productDetail/ProductDetail.js[m
[1m+++ b/src/components/page/product/productDetail/ProductDetail.js[m
[36m@@ -231,7 +231,7 @@[m [mfunction ProductDetail() {[m
                   />[m
                   <p className="mb-0">[m
                     {selectedProductUnit && product.quantity[m
[31m-                      ? `Còn ${Math.floor(product.quantity / selectedProductUnit.conversionFactor)} sản phẩm`[m
[32m+[m[32m                      ? `Còn ${Math.floor(product.quantity / selectedProductUnit.conversionFactor)} sản phẩm (${selectedProductUnit.unitName})`[m
                       : 'Hết hàng'}[m
                   </p>[m
                 </div>[m
[1mdiff --git a/src/redux/action/PayBillOrderAction.js b/src/redux/action/PayBillOrderAction.js[m
[1mindex 42b9a24..bb52de2 100644[m
[1m--- a/src/redux/action/PayBillOrderAction.js[m
[1m+++ b/src/redux/action/PayBillOrderAction.js[m
[36m@@ -11,9 +11,6 @@[m [mexport const fetchAllPayBillOrder = (codeBill) => {[m
                 const data = response.data;[m
                 dispatch(fetchPostsPayBillOrderSuccess(data))[m
              [m
[31m-            } else {[m
[31m-                toast.error('Error')[m
[31m-                dispatch(fetchPostsPayBillOrderError());[m
             }[m
         } catch (error) {[m
             dispatch(fetchPostsPayBillOrderError())[m
[36m@@ -30,35 +27,6 @@[m [mexport const createNewPayBillOrder = (codeBill, createPayBillOrder) => {[m
                 toast.success("Thêm thanh toán mới thành công!");[m
             }[m
         } catch (error) {[m
[31m-            console.error("Lỗi khi thêm thanh toán mới:", error);[m
[31m-[m
[31m-            if (error.response) {[m
[31m-                const statusCode = error.response.status;[m
[31m-                const errorData = error.response.data;[m
[31m-[m
[31m-                if (statusCode === 400) {[m
[31m-                    // Xử lý lỗi validation (400 Bad Request)[m
[31m-                    if (Array.isArray(errorData)) {[m
[31m-                        errorData.forEach(err => {[m
[31m-                            toast.error(err); // Hiển thị từng lỗi trong mảng[m
[31m-                        });[m
[31m-                    } else {[m
[31m-                        toast.error("Đã xảy ra lỗi xác thực. Vui lòng kiểm tra lại.");[m
[31m-                    }[m
[31m-                } else if (statusCode === 409) {[m
[31m-                    const { mess } = errorData;[m
[31m-                    toast.error(mess);