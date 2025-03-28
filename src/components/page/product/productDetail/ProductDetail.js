import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BsCheck } from "react-icons/bs";
import ListImageProduct from "../../../../image/ListImageProduct";
import { findProduct } from "../../../../redux/action/productAction";
import { addProductToCart } from "../../../../Service/ApiCartSevice";
import { getAccountLogin } from "../../../../Service/ApiAccountService";
import { initialize } from "../../../../redux/action/authAction";
import { addToCartLocal } from "../../../managerCartLocal/CartManager";
import { findProductResponseByIdAndType } from "../../../../Service/ApiProductUnitsService";
import "./ProductDetail.scss";
import SuggestPage from "./SuggestPage";


function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get("idProduct");
  const product = useSelector((state) => state.product.product || {});
  const [productUnits, setProductUnits] = useState([]);
  const [selectedProductUnit, setSelectedProductUnit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product and product units
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          dispatch(findProduct(idProduct)),
          findProductUnits(),
        ]);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, idProduct]);

  const findProductUnits = async () => {
    try {
      const response = await findProductResponseByIdAndType(idProduct, true);
      if (response && response.status === 200) {
        setProductUnits(response.data || []);
        if (response.data && response.data.length > 0) {
          setSelectedProductUnit(response.data[0]); // Chọn unit đầu tiên mặc định
        }
      } else {
        toast.error("Lỗi khi tải danh sách đơn vị sản phẩm");
      }
    } catch (error) {
      toast.error(error.message || "Lỗi khi tải danh sách đơn vị sản phẩm");
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    const roundedValue = Math.round(value || 0);
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle selecting a product unit
  const handleSelectedProductUnit = (unit) => {
    setSelectedProductUnit(unit);
    setQuantity(1); // Reset số lượng khi chọn unit mới
  };

  // Calculate max quantity based on conversion factor (làm tròn xuống)
  const getMaxQuantity = () => {
    if (!selectedProductUnit || !product.quantity) return 1;
    return Math.floor(product.quantity / selectedProductUnit.conversionFactor); // Làm tròn xuống
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    const maxQuantity = getMaxQuantity();
    if (value < 1) {
      setQuantity(1);
    } else if (value > maxQuantity) {
      setQuantity(maxQuantity);
    } else {
      setQuantity(value);
    }
  };

  const addProductToCartOfAccount = async (orderDetails, user) => {
    try {
      let response = await addProductToCart(orderDetails, user.id);
      if (response.status === 200) {
        navigate(`/cart`);
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addProductToCartLocal = async (orderDetails, quantityProduct) => {
    addToCartLocal(orderDetails, quantityProduct);
    navigate(`/cart`);
  };
  const handleAddProductToCart = async () => {
    try {
      let orderDetails = {
        idProduct: Number(idProduct),
        quantity: quantity * selectedProductUnit.conversionFactor,
      };
      const token = localStorage.getItem("accessToken");
      if (!token) {
        addProductToCartLocal(orderDetails, product?.quantity || 1);
        dispatch(initialize({ isAuthenticated: false, user: null }));
      } else {
        try {
          let users = await getAccountLogin();
          if (users.status === 200) {
            const data = users.data;
            await addProductToCartOfAccount(orderDetails, data);
            dispatch(initialize({ isAuthenticated: true, data }));
          } else {
            dispatch(initialize({ isAuthenticated: false, user: null }));
          }
        } catch (error) {
          dispatch(initialize({ isAuthenticated: false, user: null }));
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle pay now
  const handlePayNow = async () => {
    let products = {
      idProduct: Number(idProduct),
      quantity: quantity * selectedProductUnit.conversionFactor,
    };
    navigate(`/Payment`, {
      state: {
        listProducts: [products],
        method: false,
      },
    });
  };

  return (
    <div id="product-detail" className="inner p-5 bg-white container-fluid">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid p-5">
          <div className="row">
            <div className="col-md-6" style={{ overflow: "hidden" }}>
              <ListImageProduct id={idProduct} />
            </div>

            <div className="product-detail__information col-md-6">
              <h1 className="product-detail__name">
                {product.nameProduct || "N/A"}
              </h1>
              <p className="product-detail__category">
                Danh mục: {product.nameCategory || "N/A"}
              </p>

              {/* Product pricing */}
              <div className="product-detail__price">
                {selectedProductUnit ? (
                  product.priceBase === product.priceSale ? (
                    <h2 className="product-price">
                      {formatCurrency(
                        product.priceBase * selectedProductUnit.conversionFactor
                      )}{" "}
                      VND
                    </h2>
                  ) : (
                    <>
                      <h2 className="product-sale-price text-danger">
                        {formatCurrency(
                          product.priceSale *
                            selectedProductUnit.conversionFactor
                        )}{" "}
                        VND
                      </h2>
                      <h2 className="product-original-price text-decoration-line-through">
                        {formatCurrency(
                          product.priceBase *
                            selectedProductUnit.conversionFactor
                        )}{" "}
                        VND
                      </h2>
                    </>
                  )
                ) : (
                  <h2 className="product-price">
                    {formatCurrency(product.priceBase)} VND
                  </h2>
                )}
              </div>

              {/* Product units selection */}
              <div className="product-detail__select-watch">
                <h3>Chọn loại:</h3>
                <ul className="list-unstyled d-flex flex-wrap gap-2">
                  {productUnits.length > 0 ? (
                    productUnits.map((unit) => (
                      <li key={unit.id}>
                        <button
                          type="button"
                          className={`btn position-relative ${
                            selectedProductUnit?.id === unit.id
                              ? "btn-primary"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => handleSelectedProductUnit(unit)}
                          disabled={
                            unit.status !== "ACTIVE" ||
                            product.quantity < unit.conversionFactor
                          }
                        >
                          {unit.unitName}
                          {selectedProductUnit?.id === unit.id && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              <BsCheck size={14} />
                            </span>
                          )}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>Không có loại sản phẩm nào</li>
                  )}
                </ul>
              </div>

              {/* Quantity selection */}
              <div className="product-detail__select-watch select-number mt-3">
                <h3>Số lượng:</h3>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max={getMaxQuantity()}
                    value={quantity}
                    onChange={handleQuantityChange}
                    onKeyDown={(e) => {
                      if (e.key === "." || e.key === "," || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    className="form-control w-25"
                    disabled={
                      !selectedProductUnit ||
                      product.quantity < selectedProductUnit.conversionFactor
                    }
                  />
                  <p className="mb-0">
                    {selectedProductUnit && product.quantity
                      ? `Còn ${Math.floor(
                          product.quantity /
                            selectedProductUnit.conversionFactor
                        )} sản phẩm (${selectedProductUnit.unitName})`
                      : "Hết hàng"}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="product-detail-button mt-4 d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-success flex-fill"
                  disabled={
                    !selectedProductUnit ||
                    quantity < 1 ||
                    product.quantity < selectedProductUnit.conversionFactor
                  }
                  onClick={handleAddProductToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="btn btn-primary flex-fill"
                  disabled={
                    !selectedProductUnit ||
                    quantity < 1 ||
                    product.quantity < selectedProductUnit.conversionFactor
                  }
                  onClick={handlePayNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
            {/* Product description */}
            <div className="product-detail__description mt-4">
              <h3>
                {product.nameProduct || "Sản phẩm"} – Tinh túy từ thiên nhiên
              </h3>

              <p>
              🔹Xuất xứ: Việt nam
              </p>
              <p>
              🔹Nhà cung cấp: GreenEco
              </p>
              <br/>
              <p>
                {product.nameProduct || "Sản phẩm"} không chỉ đơn thuần là một
                loại thực phẩm, mà còn là biểu tượng của sức khỏe và sự tươi
                ngon. Được tuyển chọn từ những nguồn nông sản chất lượng cao,{" "}
                {product.nameProduct || "sản phẩm"} mang đến giá trị dinh dưỡng
                tuyệt vời cho mọi bữa ăn.
              </p>

              <h4>
                💚 Vì sao {product.nameProduct || "sản phẩm"} là sự lựa chọn
                hoàn hảo?
              </h4>
              <ul>
                <li>
                  ✅ Tươi ngon tự nhiên: Giữ trọn hương vị và dưỡng chất tinh
                  khiết từ thiên nhiên.
                </li>
                <li>
                  ✅ Giàu vitamin & khoáng chất: Cung cấp dinh dưỡng thiết yếu
                  giúp cơ thể khỏe mạnh.
                </li>
                <li>
                  ✅ Không hóa chất độc hại: Được trồng và thu hoạch theo quy
                  trình an toàn, đảm bảo sức khỏe.
                </li>
                <li>
                  ✅ Dễ dàng chế biến: Phù hợp với nhiều món ăn ngon từ salad,
                  xào, luộc đến làm nước ép.
                </li>
              </ul>

              <p>
                Cho dù bạn đang tìm kiếm một nguồn thực phẩm sạch hay muốn bổ
                sung dinh dưỡng cho gia đình,{" "}
                {product.nameProduct || "sản phẩm"} chính là sự lựa chọn không
                thể bỏ qua.
              </p>

              <h4>🥗 Gợi ý sử dụng {product.nameProduct || "sản phẩm"}:</h4>
              <ul>
                <li>
                  🔹 Dùng tươi trong các món salad hoặc nước ép để giữ trọn
                  dưỡng chất.
                </li>
                <li>
                  🔹 Chế biến thành các món xào, luộc, hấp, giúp bữa ăn thêm
                  phong phú.
                </li>
                <li>
                  🔹 Kết hợp với các nguyên liệu khác để tạo nên công thức nấu
                  ăn tuyệt vời.
                </li>
              </ul>

              <p>
                <strong>
                  👉 Trải nghiệm ngay {product.nameProduct || "sản phẩm"} và tận
                  hưởng sự khác biệt!
                </strong>
              </p>
            </div>
            
          </div>
          
        </div>
      )}
      <SuggestPage/>
    </div>
  );
}

export default ProductDetail;
