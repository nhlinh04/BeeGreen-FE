import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsSection.scss"; // Import CSS cho phần tin tức

const newsArticles = [
  {
    id: 1,
    title: "Lợi ích của việc ăn rau xanh mỗi ngày",
    description: "Rau giúp tăng cường hệ miễn dịch, tốt cho tiêu hóa, hỗ trợ giảm cân...",
    content: "Rau xanh chứa nhiều chất xơ, vitamin và khoáng chất quan trọng giúp cải thiện hệ tiêu hóa, giảm nguy cơ mắc bệnh tim mạch và ung thư...",
    image: "./rau-xanh.jpg",
    link: "/loi-ich-cua-rau-xanh",
  },
  {
    id: 2,
    title: "Những loại rau tốt nhất cho sức khỏe",
    description: "Cải bó xôi, bông cải xanh, cà rốt... giúp phòng chống bệnh tật hiệu quả.",
    content: "Các loại rau như cải bó xôi, bông cải xanh chứa nhiều chất chống oxy hóa giúp tăng cường sức khỏe và kéo dài tuổi thọ...",
    image: "./rau-tot.jpg",
    link: "/nhung-loai-rau-tot-nhat",
  },
  {
    id: 3,
    title: "Nghiên cứu khoa học về lợi ích của rau xanh",
    description: "WHO cảnh báo rằng thiếu rau trong chế độ ăn là nguyên nhân gây ung thư tiêu hóa.",
    content: "Theo WHO, thiếu rau trong chế độ ăn có thể làm tăng nguy cơ mắc bệnh tiểu đường, béo phì và ung thư tiêu hóa...",
    image: "./khoa-hoc.png",
    link: "/nghien-cuu-khoa-hoc",
  },
];

const NewsSection = () => {
  const location = useLocation(); // Lấy URL hiện tại

  // Tìm bài viết tương ứng với URL
  const article = newsArticles.find((article) => article.link === location.pathname);

  return (
    <div className="news-section">
      {article ? (
        <div className="news-detail">
          <h1>{article.title}</h1>
          <img src={article.image} alt={article.title} className="news-image" />
          <p className="news-description">{article.description}</p>
          <p className="news-content">{article.content}</p>
        </div>
      ) : (
        <p className="not-found">Không tìm thấy bài viết!</p>
      )}
    </div>
  );
};

export default NewsSection;
