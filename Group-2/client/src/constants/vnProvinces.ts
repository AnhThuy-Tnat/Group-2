export interface Province {
  name: string;
  districts: string[];
}

export const vnProvinces: Province[] = [
  {
    name: "Hà Nội",
    districts: [
      "Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Tây Hồ", "Quận Long Biên", "Quận Cầu Giấy",
      "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Hoàng Mai", "Quận Thanh Xuân",
      "Huyện Sóc Sơn", "Huyện Đông Anh", "Huyện Gia Lâm", "Quận Nam Từ Liêm",
      "Huyện Thanh Trì", "Quận Bắc Từ Liêm", "Huyện Mê Linh", "Quận Hà Đông",
      "Thị xã Sơn Tây", "Huyện Ba Vì", "Huyện Phúc Thọ", "Huyện Đan Phượng",
      "Huyện Hoài Đức", "Huyện Quốc Oai", "Huyện Thạch Thất", "Huyện Chương Mỹ",
      "Huyện Thanh Oai", "Huyện Thường Tín", "Huyện Phú Xuyên", "Huyện Ứng Hòa",
      "Huyện Mỹ Đức"
    ]
  },
  {
    name: "TP. Hồ Chí Minh",
    districts: [
      "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8",
      "Quận 9", "Quận 10", "Quận 11", "Quận 12", "Quận Thủ Đức", "Quận Gò Vấp",
      "Quận Bình Thạnh", "Quận Tân Bình", "Quận Tân Phú", "Quận Phú Nhuận",
      "Quận 2", "Quận Bình Tân", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Bình Chánh",
      "Huyện Nhà Bè", "Huyện Cần Giờ"
    ]
  },
  {
    name: "Đà Nẵng",
    districts: [
      "Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn",
      "Quận Liên Chiểu", "Quận Cẩm Lệ", "Huyện Hòa Vang", "Huyện Hoàng Sa"
    ]
  },
  {
    name: "Hải Phòng",
    districts: [
      "Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân", "Quận Hải An",
      "Quận Kiến An", "Quận Đồ Sơn", "Quận Dương Kinh", "Huyện Thuỷ Nguyên",
      "Huyện An Dương", "Huyện An Lão", "Huyện Kiến Thuỵ", "Huyện Tiên Lãng",
      "Huyện Vĩnh Bảo", "Huyện Cát Hải", "Huyện Bạch Long Vĩ"
    ]
  },
  {
    name: "Cần Thơ",
    districts: [
      "Quận Ninh Kiều", "Quận Ô Môn", "Quận Bình Thuỷ", "Quận Cái Răng",
      "Quận Thốt Nốt", "Huyện Vĩnh Thạnh", "Huyện Cờ Đỏ", "Huyện Phong Điền",
      "Huyện Thới Lai"
    ]
  },
  {
    name: "An Giang",
    districts: [
      "Thành phố Long Xuyên", "Thành phố Châu Đốc", "Thị xã Tân Châu",
      "Huyện An Phú", "Huyện Châu Phú", "Huyện Châu Thành", "Huyện Chợ Mới",
      "Huyện Phú Tân", "Huyện Thoại Sơn", "Huyện Tri Tôn", "Huyện Tịnh Biên"
    ]
  },
  {
    name: "Bà Rịa - Vũng Tàu",
    districts: [
      "Thành phố Vũng Tàu", "Thành phố Bà Rịa", "Huyện Châu Đức", "Huyện Côn Đảo",
      "Huyện Đất Đỏ", "Huyện Long Điền", "Huyện Tân Thành", "Huyện Xuyên Mộc"
    ]
  },
  {
    name: "Bạc Liêu",
    districts: [
      "Thành phố Bạc Liêu", "Huyện Đông Hải", "Huyện Giá Rai", "Huyện Hòa Bình",
      "Huyện Hồng Dân", "Huyện Phước Long", "Huyện Vĩnh Lợi"
    ]
  },
  {
    name: "Bắc Giang",
    districts: [
      "Thành phố Bắc Giang", "Huyện Hiệp Hòa", "Huyện Lạng Giang", "Huyện Lục Nam",
      "Huyện Lục Ngạn", "Huyện Sơn Động", "Huyện Tân Yên", "Huyện Việt Yên",
      "Huyện Yên Dũng", "Huyện Yên Thế"
    ]
  },
  {
    name: "Bắc Kạn",
    districts: [
      "Thành phố Bắc Kạn", "Huyện Ba Bể", "Huyện Bạch Thông", "Huyện Chợ Đồn",
      "Huyện Chợ Mới", "Huyện Na Rì", "Huyện Ngân Sơn", "Huyện Pác Nặm"
    ]
  },
  {
    name: "Bắc Ninh",
    districts: [
      "Thành phố Bắc Ninh", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ",
      "Huyện Tiên Du", "Huyện Yên Phong", "Huyện Yên Dũng"
    ]
  },
  {
    name: "Bến Tre",
    districts: [
      "Thành phố Bến Tre", "Huyện Ba Tri", "Huyện Bình Đại", "Huyện Châu Thành",
      "Huyện Chợ Lách", "Huyện Giồng Trôm", "Huyện Mỏ Cày Bắc", "Huyện Mỏ Cày Nam",
      "Huyện Thạnh Phú"
    ]
  },
  {
    name: "Bình Dương",
    districts: [
      "Thành phố Thủ Dầu Một", "Thị xã Bến Cát", "Thị xã Dĩ An", "Thị xã Tân Uyên",
      "Huyện Bàu Bàng", "Huyện Dầu Tiếng", "Huyện Phú Giáo", "Huyện Tân Phước"
    ]
  },
  {
    name: "Bình Phước",
    districts: [
      "Thành phố Đồng Xoài", "Thị xã Bình Long", "Thị xã Phước Long", "Huyện Bù Đăng",
      "Huyện Bù Đốp", "Huyện Bù Gia Mập", "Huyện Chơn Thành", "Huyện Đồng Phú",
      "Huyện Hớn Quản", "Huyện Lộc Ninh"
    ]
  },
  {
    name: "Bình Thuận",
    districts: [
      "Thành phố Phan Thiết", "Thị xã La Gi", "Huyện Bắc Bình", "Huyện Đức Linh",
      "Huyện Hàm Tân", "Huyện Hàm Thuận Bắc", "Huyện Hàm Thuận Nam", "Huyện Phú Quí",
      "Huyện Tánh Linh", "Huyện Tuy Phong"
    ]
  },
  {
    name: "Cà Mau",
    districts: [
      "Thành phố Cà Mau", "Huyện Cái Nước", "Huyện Đầm Dơi", "Huyện Ngọc Hiển",
      "Huyện Năm Căn", "Huyện Phú Tân", "Huyện Thới Bình", "Huyện Trần Văn Thời",
      "Huyện U Minh"
    ]
  },
  {
    name: "Cao Bằng",
    districts: [
      "Thành phố Cao Bằng", "Huyện Bảo Lạc", "Huyện Bảo Lâm", "Huyện Hạ Lang",
      "Huyện Hà Quảng", "Huyện Hoà An", "Huyện Nguyên Bình", "Huyện Phục Hoà",
      "Huyện Quảng Uyên", "Huyện Thạch An", "Huyện Trà Lĩnh", "Huyện Trùng Khánh"
    ]
  },
  {
    name: "Đắk Lắk",
    districts: [
      "Thành phố Buôn Ma Thuột", "Thị xã Buôn Hồ", "Huyện Buôn Đôn", "Huyện Cư Kuin",
      "Huyện Cư M'gar", "Huyện Ea H'leo", "Huyện Ea Kar", "Huyện Ea Súp",
      "Huyện Krông Ana", "Huyện Krông Bông", "Huyện Krông Búk", "Huyện Krông Năng",
      "Huyện Krông Pắk", "Huyện Lắk", "Huyện M'Đrắk"
    ]
  },
  {
    name: "Đắk Nông",
    districts: [
      "Thành phố Gia Nghĩa", "Huyện Cư Jút", "Huyện Đắk Glong", "Huyện Đắk Mil",
      "Huyện Đắk R'Lấp", "Huyện Đắk Song", "Huyện Krông Nô", "Huyện Tuy Đức"
    ]
  },
  {
    name: "Điện Biên",
    districts: [
      "Thành phố Điện Biên Phủ", "Thị xã Mường Lay", "Huyện Điện Biên", "Huyện Điện Biên Đông",
      "Huyện Mường Ảng", "Huyện Mường Chà", "Huyện Mường Nhé", "Huyện Nậm Pồ",
      "Huyện Tủa Chùa", "Huyện Tuần Giáo"
    ]
  },
  {
    name: "Đồng Nai",
    districts: [
      "Thành phố Biên Hòa", "Thị xã Long Khánh", "Huyện Cẩm Mỹ", "Huyện Định Quán",
      "Huyện Long Thành", "Huyện Nhơn Trạch", "Huyện Tân Phú", "Huyện Thống Nhất",
      "Huyện Trảng Bom", "Huyện Vĩnh Cửu", "Huyện Xuân Lộc"
    ]
  },
  {
    name: "Đồng Tháp",
    districts: [
      "Thành phố Cao Lãnh", "Thành phố Sa Đéc", "Thị xã Hồng Ngự", "Huyện Cao Lãnh",
      "Huyện Châu Thành", "Huyện Hồng Ngự", "Huyện Lai Vung", "Huyện Lấp Vò",
      "Huyện Tam Nông", "Huyện Tân Hồng", "Huyện Thanh Bình", "Huyện Tháp Mười"
    ]
  },
  {
    name: "Gia Lai",
    districts: [
      "Thành phố Pleiku", "Thị xã An Khê", "Thị xã Ayun Pa", "Huyện Chư Păh",
      "Huyện Chư Prông", "Huyện Chư Pưh", "Huyện Chư Sê", "Huyện Đăk Đoa",
      "Huyện Đăk Pơ", "Huyện Đức Cơ", "Huyện Ia Grai", "Huyện Ia Pa",
      "Huyện KBang", "Huyện Kông Chro", "Huyện Krông Pa", "Huyện Mang Yang",
      "Huyện Phú Thiện"
    ]
  },
  {
    name: "Hà Giang",
    districts: [
      "Thành phố Hà Giang", "Huyện Bắc Mê", "Huyện Bắc Quang", "Huyện Đồng Văn",
      "Huyện Hoàng Su Phì", "Huyện Mèo Vạc", "Huyện Mù Cang Chải", "Huyện Quản Bạ",
      "Huyện Quang Bình", "Huyện Vị Xuyên", "Huyện Xín Mần", "Huyện Yên Minh"
    ]
  },
  {
    name: "Hà Nam",
    districts: [
      "Thành phố Phủ Lý", "Huyện Bình Lục", "Huyện Duy Tiên", "Huyện Kim Bảng",
      "Huyện Lý Nhân", "Huyện Thanh Liêm"
    ]
  },
  {
    name: "Hà Tĩnh",
    districts: [
      "Thành phố Hà Tĩnh", "Thị xã Hồng Lĩnh", "Huyện Cẩm Xuyên", "Huyện Can Lộc",
      "Huyện Đức Thọ", "Huyện Hương Khê", "Huyện Hương Sơn", "Huyện Kỳ Anh",
      "Huyện Lộc Hà", "Huyện Nghi Xuân", "Huyện Thạch Hà", "Huyện Vũ Quang"
    ]
  },
  {
    name: "Hải Dương",
    districts: [
      "Thành phố Hải Dương", "Thị xã Chí Linh", "Huyện Bình Giang", "Huyện Cẩm Giàng",
      "Huyện Gia Lộc", "Huyện Kim Thành", "Huyện Kinh Môn", "Huyện Nam Sách",
      "Huyện Ninh Giang", "Huyện Thanh Hà", "Huyện Thanh Miện", "Huyện Tứ Kỳ"
    ]
  },
  {
    name: "Hậu Giang",
    districts: [
      "Thành phố Vị Thanh", "Thị xã Ngã Bảy", "Huyện Châu Thành", "Huyện Châu Thành A",
      "Huyện Long Mỹ", "Huyện Phụng Hiệp", "Huyện Vị Thủy"
    ]
  },
  {
    name: "Hòa Bình",
    districts: [
      "Thành phố Hòa Bình", "Huyện Cao Phong", "Huyện Đà Bắc", "Huyện Kim Bôi",
      "Huyện Lạc Sơn", "Huyện Lạc Thủy", "Huyện Lương Sơn", "Huyện Mai Châu",
      "Huyện Tân Lạc", "Huyện Yên Thủy"
    ]
  },
  {
    name: "Hưng Yên",
    districts: [
      "Thành phố Hưng Yên", "Huyện Ân Thi", "Huyện Khoái Châu", "Huyện Kim Động",
      "Huyện Mỹ Hào", "Huyện Phù Cừ", "Huyện Tiên Lữ", "Huyện Văn Giang",
      "Huyện Văn Lâm", "Huyện Yên Mỹ"
    ]
  },
  {
    name: "Khánh Hòa",
    districts: [
      "Thành phố Nha Trang", "Thành phố Cam Ranh", "Thị xã Ninh Hòa", "Huyện Cam Lâm",
      "Huyện Diên Khánh", "Huyện Khánh Sơn", "Huyện Khánh Vĩnh", "Huyện Trường Sa",
      "Huyện Vạn Ninh"
    ]
  },
  {
    name: "Kiên Giang",
    districts: [
      "Thành phố Rạch Giá", "Thị xã Hà Tiên", "Huyện An Biên", "Huyện An Minh",
      "Huyện Châu Thành", "Huyện Giồng Riềng", "Huyện Gò Quao", "Huyện Hòn Đất",
      "Huyện Kiên Hải", "Huyện Kiên Lương", "Huyện Phú Quốc", "Huyện Tân Hiệp",
      "Huyện U Minh Thượng", "Huyện Vĩnh Thuận"
    ]
  },
  {
    name: "Kon Tum",
    districts: [
      "Thành phố Kon Tum", "Huyện Đắk Glei", "Huyện Đắk Hà", "Huyện Đắk Tô",
      "Huyện Ia H'Drai", "Huyện Kon Plông", "Huyện Kon Rẫy", "Huyện Ngọc Hồi",
      "Huyện Sa Thầy", "Huyện Tu Mơ Rông"
    ]
  },
  {
    name: "Lai Châu",
    districts: [
      "Thành phố Lai Châu", "Huyện Mường Tè", "Huyện Nậm Nhùn", "Huyện Phong Thổ",
      "Huyện Sìn Hồ", "Huyện Tam Đường", "Huyện Tân Uyên", "Huyện Than Uyên"
    ]
  },
  {
    name: "Lâm Đồng",
    districts: [
      "Thành phố Đà Lạt", "Thành phố Bảo Lộc", "Huyện Bảo Lâm", "Huyện Cát Tiên",
      "Huyện Đạ Huoai", "Huyện Đạ Tẻh", "Huyện Đam Rông", "Huyện Di Linh",
      "Huyện Đơn Dương", "Huyện Đức Trọng", "Huyện Lạc Dương", "Huyện Lâm Hà"
    ]
  },
  {
    name: "Lạng Sơn",
    districts: [
      "Thành phố Lạng Sơn", "Huyện Bắc Sơn", "Huyện Bình Gia", "Huyện Cao Lộc",
      "Huyện Chi Lăng", "Huyện Đình Lập", "Huyện Hữu Lũng", "Huyện Lộc Bình",
      "Huyện Tràng Định", "Huyện Văn Lãng", "Huyện Văn Quan"
    ]
  },
  {
    name: "Lào Cai",
    districts: [
      "Thành phố Lào Cai", "Huyện Bắc Hà", "Huyện Bảo Thắng", "Huyện Bảo Yên",
      "Huyện Bát Xát", "Huyện Mường Khương", "Huyện Sa Pa", "Huyện Si Ma Cai",
      "Huyện Văn Bàn"
    ]
  },
  {
    name: "Long An",
    districts: [
      "Thành phố Tân An", "Thị xã Kiến Tường", "Huyện Bến Lức", "Huyện Cần Đước",
      "Huyện Cần Giuộc", "Huyện Châu Thành", "Huyện Đức Hòa", "Huyện Đức Huệ",
      "Huyện Mộc Hóa", "Huyện Tân Hưng", "Huyện Tân Thạnh", "Huyện Tân Trụ",
      "Huyện Thạnh Hóa", "Huyện Thủ Thừa", "Huyện Vĩnh Hưng"
    ]
  },
  {
    name: "Nam Định",
    districts: [
      "Thành phố Nam Định", "Huyện Giao Thủy", "Huyện Hải Hậu", "Huyện Mỹ Lộc",
      "Huyện Nam Trực", "Huyện Nghĩa Hưng", "Huyện Trực Ninh", "Huyện Vụ Bản",
      "Huyện Xuân Trường", "Huyện Ý Yên"
    ]
  },
  {
    name: "Nghệ An",
    districts: [
      "Thành phố Vinh", "Thị xã Cửa Lò", "Thị xã Hoàng Mai", "Thị xã Thái Hoà",
      "Huyện Anh Sơn", "Huyện Con Cuông", "Huyện Diễn Châu", "Huyện Đô Lương",
      "Huyện Hưng Nguyên", "Huyện Kỳ Sơn", "Huyện Nam Đàn", "Huyện Nghi Lộc",
      "Huyện Nghĩa Đàn", "Huyện Quế Phong", "Huyện Quỳ Châu", "Huyện Quỳ Hợp",
      "Huyện Quỳnh Lưu", "Huyện Tân Kỳ", "Huyện Thanh Chương", "Huyện Tương Dương",
      "Huyện Yên Thành"
    ]
  },
  {
    name: "Ninh Bình",
    districts: [
      "Thành phố Ninh Bình", "Thị xã Tam Điệp", "Huyện Gia Viễn", "Huyện Hoa Lư",
      "Huyện Kim Sơn", "Huyện Nho Quan", "Huyện Yên Khánh", "Huyện Yên Mô"
    ]
  },
  {
    name: "Ninh Thuận",
    districts: [
      "Thành phố Phan Rang-Tháp Chàm", "Huyện Bác Ái", "Huyện Ninh Hải", "Huyện Ninh Phước",
      "Huyện Ninh Sơn", "Huyện Thuận Bắc", "Huyện Thuận Nam"
    ]
  },
  {
    name: "Phú Thọ",
    districts: [
      "Thành phố Việt Trì", "Thị xã Phú Thọ", "Huyện Cẩm Khê", "Huyện Đoan Hùng",
      "Huyện Hạ Hoà", "Huyện Lâm Thao", "Huyện Phù Ninh", "Huyện Tam Nông",
      "Huyện Tân Sơn", "Huyện Thanh Ba", "Huyện Thanh Sơn", "Huyện Thanh Thuỷ",
      "Huyện Yên Lập"
    ]
  },
  {
    name: "Phú Yên",
    districts: [
      "Thành phố Tuy Hoà", "Thị xã Sông Cầu", "Huyện Đông Hoà", "Huyện Phú Hoà",
      "Huyện Sơn Hòa", "Huyện Sông Hinh", "Huyện Tây Hoà", "Huyện Tuy An"
    ]
  },
  {
    name: "Quảng Bình",
    districts: [
      "Thành phố Đồng Hới", "Thị xã Ba Đồn", "Huyện Bố Trạch", "Huyện Lệ Thủy",
      "Huyện Minh Hóa", "Huyện Quảng Ninh", "Huyện Quảng Trạch", "Huyện Tuyên Hóa"
    ]
  },
  {
    name: "Quảng Nam",
    districts: [
      "Thành phố Hội An", "Thành phố Tam Kỳ", "Huyện Bắc Trà My", "Huyện Đại Lộc",
      "Huyện Điện Bàn", "Huyện Đông Giang", "Huyện Duy Xuyên", "Huyện Hiệp Đức",
      "Huyện Nam Giang", "Huyện Nam Trà My", "Huyện Núi Thành", "Huyện Phú Ninh",
      "Huyện Phước Sơn", "Huyện Quế Sơn", "Huyện Tây Giang", "Huyện Thăng Bình",
      "Huyện Tiên Phước"
    ]
  },
  {
    name: "Quảng Ngãi",
    districts: [
      "Thành phố Quảng Ngãi", "Huyện Ba Tơ", "Huyện Bình Sơn", "Huyện Đức Phổ",
      "Huyện Lý Sơn", "Huyện Minh Long", "Huyện Mộ Đức", "Huyện Nghĩa Hành",
      "Huyện Sơn Hà", "Huyện Sơn Tịnh", "Huyện Sơn Tây", "Huyện Tây Trà",
      "Huyện Trà Bồng", "Huyện Tư Nghĩa"
    ]
  },
  {
    name: "Quảng Ninh",
    districts: [
      "Thành phố Hạ Long", "Thành phố Móng Cái", "Thành phố Uông Bí", "Thị xã Quảng Yên",
      "Huyện Ba Chẽ", "Huyện Bình Liêu", "Huyện Cô Tô", "Huyện Đầm Hà",
      "Huyện Đông Triều", "Huyện Hải Hà", "Huyện Hoành Bồ", "Huyện Tiên Yên",
      "Huyện Vân Đồn"
    ]
  },
  {
    name: "Quảng Trị",
    districts: [
      "Thành phố Đông Hà", "Thị xã Quảng Trị", "Huyện Cam Lộ", "Huyện Cồn Cỏ",
      "Huyện Đa Krông", "Huyện Gio Linh", "Huyện Hải Lăng", "Huyện Hướng Hóa",
      "Huyện Triệu Phong", "Huyện Vĩnh Linh"
    ]
  },
  {
    name: "Sóc Trăng",
    districts: [
      "Thành phố Sóc Trăng", "Huyện Châu Thành", "Huyện Cù Lao Dung", "Huyện Kế Sách",
      "Huyện Long Phú", "Huyện Mỹ Tú", "Huyện Mỹ Xuyên", "Huyện Ngã Năm",
      "Huyện Thạnh Trị", "Huyện Trần Đề", "Huyện Vĩnh Châu"
    ]
  },
  {
    name: "Sơn La",
    districts: [
      "Thành phố Sơn La", "Huyện Bắc Yên", "Huyện Mai Sơn", "Huyện Mộc Châu",
      "Huyện Mường La", "Huyện Phù Yên", "Huyện Quỳnh Nhai", "Huyện Sông Mã",
      "Huyện Sốp Cộp", "Huyện Thuận Châu", "Huyện Vân Hồ", "Huyện Yên Châu"
    ]
  },
  {
    name: "Tây Ninh",
    districts: [
      "Thành phố Tây Ninh", "Huyện Bến Cầu", "Huyện Châu Thành", "Huyện Dương Minh Châu",
      "Huyện Gò Dầu", "Huyện Hòa Thành", "Huyện Tân Biên", "Huyện Tân Châu",
      "Huyện Trảng Bàng"
    ]
  },
  {
    name: "Thái Bình",
    districts: [
      "Thành phố Thái Bình", "Huyện Đông Hưng", "Huyện Hưng Hà", "Huyện Kiến Xương",
      "Huyện Quỳnh Phụ", "Huyện Thái Thụy", "Huyện Tiền Hải", "Huyện Vũ Thư"
    ]
  },
  {
    name: "Thái Nguyên",
    districts: [
      "Thành phố Thái Nguyên", "Thị xã Sông Công", "Huyện Đại Từ", "Huyện Định Hóa",
      "Huyện Đồng Hỷ", "Huyện Phú Bình", "Huyện Phú Lương", "Huyện Võ Nhai"
    ]
  },
  {
    name: "Thanh Hóa",
    districts: [
      "Thành phố Thanh Hóa", "Thị xã Bỉm Sơn", "Thị xã Sầm Sơn", "Huyện Bá Thước",
      "Huyện Cẩm Thủy", "Huyện Đông Sơn", "Huyện Hà Trung", "Huyện Hậu Lộc",
      "Huyện Hoằng Hóa", "Huyện Lang Chánh", "Huyện Mường Lát", "Huyện Nga Sơn",
      "Huyện Ngọc Lặc", "Huyện Như Thanh", "Huyện Như Xuân", "Huyện Nông Cống",
      "Huyện Quan Hóa", "Huyện Quan Sơn", "Huyện Quảng Xương", "Huyện Thạch Thành",
      "Huyện Thiệu Hóa", "Huyện Thọ Xuân", "Huyện Thường Xuân", "Huyện Triệu Sơn",
      "Huyện Vĩnh Lộc", "Huyện Yên Định"
    ]
  },
  {
    name: "Thừa Thiên Huế",
    districts: [
      "Thành phố Huế", "Thị xã Hương Thủy", "Thị xã Hương Trà", "Huyện A Lưới",
      "Huyện Nam Đông", "Huyện Phong Điền", "Huyện Phú Lộc", "Huyện Phú Vang",
      "Huyện Quảng Điền"
    ]
  },
  {
    name: "Tiền Giang",
    districts: [
      "Thành phố Mỹ Tho", "Thị xã Gò Công", "Huyện Cái Bè", "Huyện Châu Thành",
      "Huyện Chợ Gạo", "Huyện Gò Công Đông", "Huyện Gò Công Tây", "Huyện Tân Phước",
      "Huyện Tân Phú Đông"
    ]
  },
  {
    name: "Trà Vinh",
    districts: [
      "Thành phố Trà Vinh", "Huyện Càng Long", "Huyện Cầu Kè", "Huyện Cầu Ngang",
      "Huyện Châu Thành", "Huyện Duyên Hải", "Huyện Tiểu Cần", "Huyện Trà Cú"
    ]
  },
  {
    name: "Tuyên Quang",
    districts: [
      "Thành phố Tuyên Quang", "Huyện Chiêm Hóa", "Huyện Hàm Yên", "Huyện Lâm Bình",
      "Huyện Na Hang", "Huyện Sơn Dương", "Huyện Yên Sơn"
    ]
  },
  {
    name: "Vĩnh Long",
    districts: [
      "Thành phố Vĩnh Long", "Huyện Bình Minh", "Huyện Bình Tân", "Huyện Long Hồ",
      "Huyện Mang Thít", "Huyện Tam Bình", "Huyện Trà Ôn", "Huyện Vũng Liêm"
    ]
  },
  {
    name: "Vĩnh Phúc",
    districts: [
      "Thành phố Vĩnh Yên", "Thị xã Phúc Yên", "Huyện Bình Xuyên", "Huyện Lập Thạch",
      "Huyện Sông Lô", "Huyện Tam Dương", "Huyện Tam Đảo", "Huyện Vĩnh Tường",
      "Huyện Yên Lạc"
    ]
  },
  {
    name: "Yên Bái",
    districts: [
      "Thành phố Yên Bái", "Thị xã Nghĩa Lộ", "Huyện Lục Yên", "Huyện Mù Cang Chải",
      "Huyện Trạm Tấu", "Huyện Trấn Yên", "Huyện Văn Chấn", "Huyện Văn Yên",
      "Huyện Yên Bình"
    ]
  }
];
