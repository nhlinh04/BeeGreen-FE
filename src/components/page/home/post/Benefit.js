import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GreenBeePage() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <article>
          <h1 className="text-success fw-bold text-center">
            🌿 Tại Sao Bạn Cần Ăn Rau Xanh Mỗi Ngày?
          </h1>
          <p className="text-muted text-center">
            📅 Ngày đăng: 28/03/2025 | 👀 Lượt xem: 125,846
          </p>

          <div className="text-center">
            <img
              src="./rau-xanh.jpg"
              alt="Lợi ích của rau xanh"
              className="img-fluid rounded shadow my-4"
            />
          </div>

          <h2 className="text-success fw-semibold">🥦 Tại Sao Nên Ăn Rau?</h2>
          <p>
            Rau xanh không chỉ là nguồn thực phẩm lành mạnh mà còn là một phần
            thiết yếu giúp duy trì sức khỏe. Theo nghiên cứu của{" "}
            <strong>Tổ chức Y tế Thế giới (WHO)</strong>, ăn rau thường xuyên
            giúp giảm <strong>31% nguy cơ mắc bệnh tim</strong> và{" "}
            <strong>25% nguy cơ ung thư tiêu hóa</strong>. Ngoài ra, rau xanh
            cung cấp chất xơ giúp cải thiện hệ tiêu hóa, tăng cường miễn dịch và
            duy trì cân nặng lý tưởng.
          </p>

          <h2 className="text-success fw-semibold">
            🔬 Các Chất Dinh Dưỡng Trong Rau & Cơ Chế Hấp Thụ
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>🟢 Chất xơ:</strong> Giúp tiêu hóa tốt hơn, ngăn ngừa táo
              bón.
            </li>
            <li className="list-group-item">
              <strong>🟡 Vitamin C:</strong> Tăng cường miễn dịch, làm đẹp da.
            </li>
            <li className="list-group-item">
              <strong>🔵 Vitamin K:</strong> Hỗ trợ đông máu và bảo vệ xương.
            </li>
            <li className="list-group-item">
              <strong>🟠 Beta-carotene:</strong> Chuyển hóa thành vitamin A, tốt
              cho mắt.
            </li>
            <li className="list-group-item">
              <strong>🟣 Chất chống oxy hóa:</strong> Ngăn chặn gốc tự do, làm
              chậm lão hóa.
            </li>
          </ul>
          <p className="mt-3">
            Các chất này được hấp thụ qua ruột non và vào máu, giúp nuôi dưỡng
            tế bào. Một số vitamin như <strong>A, D, E, K</strong>
            tan trong dầu, nên nếu ăn cùng dầu ô liu hoặc dầu thực vật sẽ giúp
            hấp thụ tốt hơn.
          </p>

          <h2 className="text-success fw-semibold">
            🍽️ Cách Ăn Rau Để Hấp Thụ Tốt Nhất
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              🥗 <strong>Ăn sống:</strong> Giữ nguyên vitamin và enzyme, tốt
              nhất với rau sạch.
            </li>
            <li className="list-group-item">
              🍲 <strong>Luộc/hấp nhẹ:</strong> Giữ được nhiều dinh dưỡng hơn so
              với chiên xào.
            </li>
            <li className="list-group-item">
              🛢️ <strong>Ăn kèm dầu lành mạnh:</strong> Giúp hấp thụ vitamin A,
              D, E, K.
            </li>
            <li className="list-group-item">
              🍵 <strong>Không nấu quá chín:</strong> Tránh mất vitamin B, C khi
              đun sôi lâu.
            </li>
          </ul>

          <h2 className="text-success fw-semibold">
            📏 Ăn Bao Nhiêu Rau Là Đủ?
          </h2>
          <table className="table table-bordered mt-3">
            <thead>
              <tr className="table-success">
                <th>Thể trạng</th>
                <th>Lượng rau/ngày</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Người trưởng thành</td>
                <td>400g - 600g</td>
              </tr>
              <tr>
                <td>Người tập luyện thể thao</td>
                <td>600g - 800g</td>
              </tr>
              <tr>
                <td>Người giảm cân</td>
                <td>500g - 700g</td>
              </tr>
              <tr>
                <td>Trẻ em (4-12 tuổi)</td>
                <td>200g - 400g</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-success fw-semibold">
            💡 Giải Pháp Để Ăn Nhiều Rau Hơn
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🥦 Thêm rau vào mỗi bữa ăn.</li>
            <li className="list-group-item">
              🥤 Uống sinh tố rau xanh (kết hợp trái cây để dễ uống).
            </li>
            <li className="list-group-item">
              🍛 Dùng rau trong món súp, canh, hoặc gỏi.
            </li>
            <li className="list-group-item">
              🍜 Nấu ăn với nhiều màu sắc để kích thích vị giác.
            </li>
          </ul>

          <h2 className="text-success fw-semibold mt-4">
            ❓ Câu Hỏi Thường Gặp
          </h2>
          <div className="accordion mt-3" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question1"
                >
                  👉 Rau xanh nào tốt nhất?
                </button>
              </h2>
              <div id="question1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Cải bó xôi, bông cải xanh, cải xoăn, rau dền là những loại
                  giàu dinh dưỡng nhất.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question2"
                >
                  👉 Nên ăn bao nhiêu rau mỗi ngày?
                </button>
              </h2>
              <div id="question2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Theo WHO, người trưởng thành nên ăn từ{" "}
                  <strong>400-600g</strong> rau xanh/ngày.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question3"
                >
                  👉 Rau xanh có giúp giảm cân không?
                </button>
              </h2>
              <div id="question3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Có! Rau ít calo, nhiều chất xơ giúp tạo cảm giác no lâu và hỗ
                  trợ giảm cân hiệu quả.
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-muted">
            <strong>Nguồn:</strong>{" "}
            <a
              href="https://www.who.int"
              target="_blank"
              className="text-primary"
            >
              WHO
            </a>
            ,{" "}
            <a
              href="https://www.health.harvard.edu"
              target="_blank"
              className="text-primary"
            >
              Harvard Health
            </a>
          </p>
        </article>
      </div>
    </div>
  );
}
