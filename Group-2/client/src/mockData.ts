// Định nghĩa kiểu dữ liệu cho một bệnh nhân
export interface Patient {
  key: string; // Ant Design Table cần một 'key' duy nhất cho mỗi dòng
  id: string;  // Mã BN
  name: string; // Tên bệnh nhân
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dob: string; // YYYY-MM-DD
  physician: string; // ID
  addressInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

// Hàm tạo mã BN ngẫu nhiên (ví dụ: 00030, 00027)
const generatePatientId = () =>
  `000${Math.floor(Math.random() * 900) + 100}`.slice(-5);

// Danh sách dữ liệu mẫu (25 bệnh nhân)
export const initialPatients: Patient[] = Array.from({ length: 25 }, (_, i) => ({
  key: (i + 1).toString(),
  id: generatePatientId(),
  name: `Bệnh nhân số ${i + 1}`,
  email: `patient${i + 1}@example.com`,
  phone: `0900${(10000 + i).toString().slice(-4)}`,
  gender: i % 2 === 0 ? 'Male' : 'Female',
  dob: `199${i % 10}-0${(i % 9) + 1}-15`,
  physician: `DR${100 + i}`,
  addressInfo: {
    address: `Số ${i + 1} Đường ABC`,
    city: 'Hồ Chí Minh',
    state: 'HCM',
    country: 'Việt Nam',
  },
}));
