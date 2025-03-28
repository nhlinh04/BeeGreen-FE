import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BestVegetablesPage() {
  return (
    <div className="container mt-5">
      <style>
        {`
          /* Hiệu ứng hover cho danh sách */
          .list-group-item.list-hover {
            transition: background-color 0.3s ease-in-out;
          }
          .list-group-item.list-hover:hover {
            background-color: #e9f5e9;
          }

          /* Accordion mở rộng mềm mại */
          .accordion-button {
            transition: all 0.3s ease-in-out;
          }
          .accordion-body {
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>

      <div className="card shadow-lg p-4">
        <article>
          {/* TIÊU ĐỀ */}
          <h1 className="text-success fw-bold text-center">
            🥦 Những Loại Rau Củ Tốt Nhất Cho Sức Khỏe
          </h1>
          <p className="text-muted text-center">📅 Ngày đăng: 28/03/2025 | 👀 Lượt xem: 105,321</p>

          {/* ẢNH MINH HỌA */}
          <div className="text-center">
            <img
              src="./rau-tot.jpg"
              alt="Những loại rau củ tốt nhất"
              className="img-fluid rounded shadow my-4"
              style={{ maxWidth: "900px" }}
            />
          </div>

          {/* GIỚI THIỆU */}
          <h2 className="text-success fw-semibold mt-4">🥗 Tại Sao Nên Ăn Rau Củ Mỗi Ngày?</h2>
          <p className="text-justify">
            Rau củ là một phần không thể thiếu trong chế độ ăn uống hàng ngày, giúp bổ sung vitamin, khoáng chất, chất xơ, và các hợp chất chống oxy hóa. 
            Chúng không chỉ hỗ trợ tiêu hóa, tăng cường hệ miễn dịch mà còn giúp phòng ngừa các bệnh mãn tính như tiểu đường, tim mạch và ung thư.
          </p>

          {/* DANH SÁCH CÁC LOẠI RAU CỦ */}
          <h2 className="text-success fw-semibold mt-4">🥇 Top Những Loại Rau Củ Tốt Nhất</h2>
          <div className="bg-light p-3 rounded shadow-sm">
            <ul className="list-group">
              {[
                { icon: "🥬", name: "Cải bẹ xanh", benefit: "Giàu vitamin K, tốt cho máu và xương khớp." },
                { icon: "🥬", name: "Cải xoăn con", benefit: "Chứa vitamin C, A, giúp tăng cường miễn dịch." },
                { icon: "🥦", name: "Bông cải xanh", benefit: "Giàu sulforaphane, giúp phòng ngừa ung thư." },
                { icon: "🌿", name: "Măng tây", benefit: "Cung cấp folate và vitamin B, hỗ trợ tim mạch." },
                { icon: "🌱", name: "Cải xoong", benefit: "Chứa nhiều chất chống oxy hóa, tốt cho da và tim mạch." },
              ].map((item, index) => (
                <li key={index} className="list-group-item list-hover">
                  <strong>{item.icon} {item.name}:</strong> {item.benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* CÁCH CHẾ BIẾN GIỮ DƯỠNG CHẤT */}
          <h2 className="text-success fw-semibold mt-4">🍳 Cách Chế Biến Giữ Lại Dinh Dưỡng</h2>
          <ul className="list-group">
            <li className="list-group-item list-hover">✅ Hấp hoặc luộc nhẹ để giữ lại vitamin.</li>
            <li className="list-group-item list-hover">✅ Ăn sống hoặc làm salad để bảo toàn enzyme tự nhiên.</li>
            <li className="list-group-item list-hover">✅ Dùng dầu ô liu khi xào để hấp thụ tốt vitamin tan trong dầu.</li>
          </ul>

          {/* LƯU Ý KHI ĂN RAU */}
          <h2 className="text-success fw-semibold mt-4">⚠️ Những Lưu Ý Khi Ăn Rau</h2>
          <ul className="list-group">
            <li className="list-group-item list-hover">🥗 Chọn rau sạch, tránh dư lượng thuốc trừ sâu.</li>
            <li className="list-group-item list-hover">💦 Rửa sạch rau dưới nước chảy và ngâm nước muối loãng.</li>
            <li className="list-group-item list-hover">🔥 Không nấu quá lâu để bảo toàn dưỡng chất.</li>
          </ul>

          {/* CÂU HỎI THƯỜNG GẶP */}
          <h2 className="text-success fw-semibold mt-4">❓ Câu Hỏi Thường Gặp</h2>
          <div className="accordion mt-3" id="faqAccordion">
            {[
              {
                question: "👉 Loại rau nào chứa nhiều chất chống oxy hóa nhất?",
                answer: "Cải xoong, bông cải xanh và rau chân vịt chứa nhiều chất chống oxy hóa nhất, giúp bảo vệ tế bào khỏi lão hóa.",
                id: "question1"
              },
              {
                question: "👉 Ăn rau sống hay nấu chín tốt hơn?",
                answer: "Một số loại rau như rau mầm, cải xoong tốt nhất khi ăn sống. Tuy nhiên, bông cải xanh và cà rốt hấp nhẹ sẽ giúp hấp thụ dưỡng chất tốt hơn.",
                id: "question2"
              }
            ].map((item, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${item.id}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div id={item.id} className="accordion-collapse collapse">
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>

          {/* NGUỒN THAM KHẢO */}
          <p className="mt-4 text-center text-muted">
            <strong>Nguồn:</strong>{" "}
            <a href="https://www.who.int" target="_blank" className="text-primary">WHO</a>,{" "}
            <a href="https://www.health.harvard.edu" target="_blank" className="text-primary">Harvard Health</a>
          </p>
        </article>
      </div>
    </div>
  );
}
 