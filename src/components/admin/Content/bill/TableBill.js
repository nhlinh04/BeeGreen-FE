import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoEyeSharp } from "react-icons/io5";
import Pagination from "react-bootstrap/Pagination";
import PrintBillButton from "./PrintBillButton";
const NotFoundData = "/NotFoundData.png";

const TableBill = ({ bills, onPageChange, fetchData }) => {
  const { content, totalPages, number } = bills;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getShortCodeBill = (codeBill) => {
    return codeBill ? codeBill.split("-")[0] : "Lỗi";
  };

  const formatCurrency = (value) => {
    const roundedValue = Math.round(value);
    return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleViewDetail = (codeBill) => {
    navigate(`/admins/manage-bill-detail/${codeBill}`);
  };

  const handleReloadData = () => {
    if (fetchData) {
      fetchData(); // Reload data when PrintBillButton triggers
    }
  };

  const isPendingProcess = (createdAt) => {
    const now = new Date();

    // Mốc 15h hôm nay
    const todayCutoff = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      15,
      0,
      0
    );

    // Mốc 15h hôm qua
    const yesterdayCutoff = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      15,
      0,
      0
    );

    // Chuyển `createdAt` thành đối tượng Date để so sánh
    const createdDate = new Date(createdAt);

    // Nếu đơn hàng tạo TRƯỚC 15h hôm nay và SAU 15h hôm qua => "Chờ xử lý"
    return createdDate >= yesterdayCutoff && createdDate < todayCutoff;
  };

  // Kiểm tra trạng thái và xác định nếu hóa đơn cần hiển thị "Chờ xử lý"
  const isPendingStatus = (status, createdAt) => {
    const now = new Date();
    const todayCutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0);
    
    if (status === 'PENDING' || status === 'CONFIRMED') {
      if (new Date(createdAt) < todayCutoff) {
        return true; // Đơn trước 15h hôm nay sẽ có trạng thái Chờ xử lý
      }
    }
    return false;
  };

  // Sắp xếp lại danh sách đơn hàng, đảm bảo đơn "Chờ xử lý" luôn nằm trên đầu
  const sortedContent = [...(content || [])].sort((a, b) => {
    const aPending = isPendingProcess(a.createdAt);
    const bPending = isPendingProcess(b.createdAt);
    return bPending - aPending; // true sẽ là 1, false là 0
  });

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã hóa đơn</th>
            <th>Tên khách hàng</th>
            <th>Tên nhân viên</th>
            <th>Loại</th>
            <th>Ngày tạo</th>
            <th>Tiền giảm</th>
            <th>Tổng tiền</th>
            <th>Xử lý</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {content && content.length > 0 ? (
            sortedContent.map((item, index) => (
              <tr key={`table-bill-${index}`}>
                <td>{index + 1 + number * bills.size}</td>
                <td>{getShortCodeBill(item.codeBill)}</td>
                <td>{item.nameCustomer || "Khách lẻ"}</td>
                <td>{item.nameEmployees || ""}</td>
                <td>{item.type === 1 ? "Online" : "Tại quầy"}</td>
                <td>{item.createdAt ? formatDate(item.createdAt) : "Lỗi"}</td>
                <td>
                  {item.priceDiscount
                    ? formatCurrency(item.priceDiscount)
                    : "Không có"}
                </td>
                <td>
                  {item.totalAmount ? formatCurrency(item.totalAmount) : ""}
                </td>
                <td>
                  {isPendingStatus(item.status, item.createdAt) && (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Chờ xử lý
                    </span>
                  )}
                </td>

                <td>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="warning"
                      className="me-3"
                      onClick={() => handleViewDetail(item.codeBill)}
                    >
                      <IoEyeSharp />
                    </Button>
                    <PrintBillButton
                      codeBill={item.codeBill}
                      onReloadData={handleReloadData}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="preview-image justify-content-center text-center p-3"
              >
                <img
                  src={NotFoundData}
                  alt="Preview"
                  style={{ maxWidth: "10%" }}
                />
                <p className="p-3">Không có dữ liệu</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First
            onClick={() => onPageChange(0)}
            disabled={number === 0}
          />
          <Pagination.Prev
            onClick={() => onPageChange(Math.max(0, number - 1))}
            disabled={number === 0}
          />

          {[...Array(5).keys()].map((i) => {
            const startPage = Math.max(0, Math.min(number - 2, totalPages - 5));
            const page = startPage + i;
            if (page < totalPages) {
              return (
                <Pagination.Item
                  key={page}
                  active={page === number}
                  onClick={() => onPageChange(page)}
                >
                  {page + 1}
                </Pagination.Item>
              );
            }
            return null;
          })}

          <Pagination.Next
            onClick={() => onPageChange(Math.min(totalPages - 1, number + 1))}
            disabled={number === totalPages - 1}
          />
          <Pagination.Last
            onClick={() => onPageChange(totalPages - 1)}
            disabled={number === totalPages - 1}
          />
        </Pagination>
      </div>
    </>
  );
};

export default TableBill;

