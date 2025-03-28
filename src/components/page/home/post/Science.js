import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ScientificResearchOnGreens() {
  return (
    <div className="container mt-5">
      <style>
        {`
          .list-group-item.list-hover {
            transition: background-color 0.3s ease-in-out;
          }
          .list-group-item.list-hover:hover {
            background-color: #e9f5e9;
          }
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
          <h1 className="text-success fw-bold text-center mb-3">
            📖 Nghiên Cứu Khoa Học Về Lợi Ích Của Rau Xanh
          </h1>
          <p className="text-muted text-center">
            📅 Ngày đăng: 28/03/2025 | 👀 Lượt xem: 102,548
          </p>

          {/* GIỚI THIỆU */}
          <div className="row align-items-center mt-4">
            <div className="col-md-6">
              <h2 className="text-success fw-semibold">🌱 Rau Xanh Và Sức Khỏe</h2>
              <p>
                Các nghiên cứu khoa học đã chỉ ra rằng rau xanh đóng vai trò quan trọng trong việc duy trì sức khỏe 
                và phòng chống bệnh tật. Chúng giàu vitamin, khoáng chất, chất xơ và các chất chống oxy hóa, giúp 
                bảo vệ cơ thể khỏi bệnh mãn tính và cải thiện chức năng sinh lý.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="./rau-xanh-kh.jpg"
                alt="Nghiên cứu khoa học về rau xanh"
                className="img-fluid rounded shadow"
                style={{ width: "90%" }}
              />
            </div>
          </div>

          {/* CƠ CHẾ HOẠT ĐỘNG */}
          <h2 className="text-success fw-semibold mt-5">🔬 Cơ Chế Hoạt Động Của Rau Xanh</h2>
          <p>Rau xanh ảnh hưởng đến sức khỏe thông qua nhiều cơ chế khác nhau:</p>
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img
                src="https://giadinh.mediacdn.vn/296230595582509056/2024/7/17/20200506012704682187bong-cai-xanhmax-1800x1800-1721178231700-1721178233440654715961.jpg"
                alt="Cơ chế hoạt động của rau xanh"
                className="img-fluid rounded shadow my-3"
                style={{ maxWidth: "400px" }}
              />
            </div>
            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item list-hover">
                  🧬 <strong>Chống viêm:</strong> Flavonoid và carotenoid giúp giảm viêm và bảo vệ tế bào.
                </li>
                <li className="list-group-item list-hover">
                  ❤️ <strong>Bảo vệ tim mạch:</strong> Nitrate tự nhiên giúp giãn mạch máu, hạ huyết áp.
                </li>
                <li className="list-group-item list-hover">
                  🛡️ <strong>Củng cố hệ miễn dịch:</strong> Vitamin C và chất xơ giúp tăng sức đề kháng.
                </li>
                <li className="list-group-item list-hover">
                  🍏 <strong>Hỗ trợ tiêu hóa:</strong> Chất xơ giúp cân bằng vi khuẩn đường ruột.
                </li>
                <li className="list-group-item list-hover">
                  🧠 <strong>Cải thiện trí nhớ:</strong> Axit folic giúp tăng cường nhận thức.
                </li>
              </ul>
            </div>
          </div>

          {/* CÁC LOẠI RAU XANH */}
          <h2 className="text-success fw-semibold mt-5">🥦 Các Loại Rau Xanh Phổ Biến</h2>
          <div className="row">
            {[
              { name: "Cải bó xôi", benefit: "Giàu sắt, tốt cho hệ thần kinh." },
              { name: "Cải xoăn", benefit: "Chứa nhiều vitamin K, tốt cho xương." },
              { name: "Bông cải xanh", benefit: "Chứa sulforaphane, giúp phòng ung thư." },
              { name: "Rau diếp cá", benefit: "Có tác dụng kháng khuẩn, giải nhiệt." },
              { name: "Cần tây", benefit: "Giúp hạ huyết áp và tăng cường trao đổi chất." }
            ].map((veg, index) => (
              <div key={index} className="col-md-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success">{veg.name}</h5>
                    <p className="card-text">{veg.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NGHIÊN CỨU KHOA HỌC */}
          <h2 className="text-success fw-semibold mt-5">📊 Nghiên Cứu Khoa Học</h2>
          <div className="accordion mt-3" id="researchAccordion">
            {[
              {
                title: "🧠 Rau xanh giúp cải thiện trí nhớ?",
                content: "Nghiên cứu từ Đại học Rush cho thấy ăn rau xanh hàng ngày giúp làm chậm suy giảm trí nhớ."
              },
              {
                title: "❤️ Ăn nhiều rau giúp tim khỏe mạnh?",
                content: "Nghiên cứu từ Hiệp hội Tim mạch Hoa Kỳ (AHA) cho thấy rau xanh giúp giảm huyết áp và cholesterol."
              },
              {
                title: "🛡️ Rau xanh có giúp ngăn ngừa ung thư?",
                content: "Sulforaphane trong bông cải xanh giúp tiêu diệt tế bào ung thư, theo nghiên cứu từ Viện Ung thư Quốc gia Mỹ."
              }
            ].map((item, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#research${index}`}
                  >
                    {item.title}
                  </button>
                </h2>
                <div id={`research${index}`} className="accordion-collapse collapse">
                  <div className="accordion-body">{item.content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* KẾT LUẬN */}
          <h2 className="text-success fw-semibold mt-5">🔍 Kết Luận</h2>
          <p>
            Việc bổ sung rau xanh vào chế độ ăn uống hàng ngày mang lại nhiều lợi ích sức khỏe. Hãy duy trì thói quen ăn nhiều rau để có một cơ thể khỏe mạnh hơn!
          </p>

        </article>
      </div>
    </div>
  );
}
