import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getAllPriceRangePromotion } from "../../../../Service/ApiProductService";
import ListImageProduct from "../../../../image/ListImageProduct";
import { toast } from "react-toastify";

const Suggest = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getAllPriceRangePromotion();
        if (response && response.status === 200) {
          setProducts(response.data);
        } else {
          toast.error("Lỗi khi tải danh sách sản phẩm");
        }
      } catch (error) {
        toast.error(error.message || "Lỗi khi tải danh sách sản phẩm");
      }
    };
    fetchAllProducts();
  }, []);

  const formatCurrency = (value) => {
    if (!value) return "0";
    return Math.round(value).toLocaleString("vi-VN");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev">{"<"}</button>,
    nextArrow: <button className="slick-next">{">"}</button>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="suggest-container">
      <h2 className="text-center fw-bold text-uppercase mb-4">
        Các sản phẩm khác
      </h2>
      <div className="slider-container bg-white">
        <Slider {...settings}>
          {products.map((product) => (
            <a
            key={product.idProduct}
            href={`/product-detail?idProduct=${product.idProduct}`}
            aria-label="View details"
            className="text-decoration-none"
          >
            <div className="product-slide card border-0 shadow-none bg-transparent">
              <div className="image-container">
                <ListImageProduct id={product?.idProduct} />
              </div>
              <div className="card-body text-center">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                >
                  <p className="product-name truncate-text">
                    {product.nameProduct}
                  </p>
                </OverlayTrigger>
                <div className="product-pricing">
                  {product.priceBase === product.priceSale ? (
                    <p className="product-price">
                      {formatCurrency(product.priceBase)} VND
                    </p>
                  ) : (
                    <div>
                      <p className="product-sale-price text-danger">
                        {formatCurrency(product.priceSale)} VND
                      </p>
                      <p className="product-original-price text-decoration-line-through">
                        {formatCurrency(product.priceBase)} VND
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
          
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Suggest;
