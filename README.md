# Group 2

Project gồm 2 phần chính:
- Backend: Node.Js + ExpressJs + GraphQL + MongoDB
- Frontend: React + Vite + Ant design

# Phân công công việc
## Thùy
- Xây dựng UI tổng thể, phát triển Patient List Page
- Tạo Drawer Form (Creat / Edit / View Patient)
- Tính năng CRUD 
- Tính năng Search
- kết nối API (Apollo Client)

## Tiến
- Tạo database
- Xây dựng source Backend, config BE với Database.
- Tạo các API cần sử dụng.
- Hỗ trợ refactor code FE, set up Router 
- Hỗ trợ debug frontend.

# Hướng dẫn chạy dự án local

## 1. Truy cập vào thư mục dự án

```bash
cd Group-2
```

## 2. Cài đặt các package

Cài đặt đồng thời cả frontend và backend:

```bash
npm run install-all
```

## 3. Thiết lập file môi trường `.env`

### Client (`/client/.env`)

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
```

### Backend (`/backend/.env`)

```env
PORT=4000
MONGO_URL="mongodb+srv://hoangtiengl2003_db_user:09092003@group2.uqj1qun.mongodb.net/?retryWrites=true&w=majority&appName=Group2"
```


## 4. Chạy dự án

### Frontend

```bash
npm run start:frontend
```

Frontend sẽ chạy trên URL mặc định: [http://localhost:5173](http://localhost:5173)

### Backend

```bash
npm run start:backend
```

Backend sẽ chạy trên URL mặc định: [http://localhost:4000/graphql](http://localhost:4000/graphql)


# API

Hệ thống sử dụng **6 GraphQL operations** (3 queries + 3 mutations) với 2 MongoDB collections (`Patient`, `Physician`) và **Redux Toolkit** cho state management, tạo thành một API hoàn chỉnh để quản lý bệnh nhân và bác sĩ.

## 1. Patient API Functions

### 1.1. GET\_PATIENTS

* **Mục đích:** Lấy danh sách bệnh nhân
* **Input:**

```ts
interface FetchPatientsParams {
    page?: number;     // Số trang (default: 1)
    limit?: number;    // Số bản ghi mỗi trang (default: 10)
    filter?: string;   // Từ khóa tìm kiếm theo email (default: '')
}
```

* **Output:**

```ts
interface PatientPaginationResponse {
    data: Patient[];      // Mảng các bệnh nhân
    total: number;        // Tổng số bản ghi
    totalPages: number;   // Tổng số trang
}

interface Patient {
    id: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    dob?: string;
    physician: {
        id: string;
        name: string;
        email: string;
    };
    addressInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
}
```

### 1.2. GET\_PATIENT

* **Mục đích:** Lấy thông tin một bệnh nhân
* **Input:**

```ts
id: string
```

* **Output:**

```ts
Patient | null
```

### 1.3. CREATE\_PATIENT

* **Mục đích:** Tạo bệnh nhân mới
* **Input:**

```ts
interface PatientInput {
    email: string;
    name: string;
    phone?: string;
    gender?: string;
    dob?: string;
    physician: string;
    addressInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
}
```

* **Output:**

```ts
Patient // Thông tin bệnh nhân vừa tạo
```

### 1.4. UPDATE\_PATIENT

* **Mục đích:** Cập nhật thông tin bệnh nhân
* **Input:**

```ts
interface UpdatePatientParams {
    id: string;
    input: PatientInput;
}
```

* **Output:**

```ts
Patient // Thông tin bệnh nhân sau khi cập nhật
```

### 1.5. DELETE\_PATIENT

* **Mục đích:** Xóa bệnh nhân
* **Input:**

```ts
id: string
```

* **Output:**

```ts
interface DeletePatientResponse {
    id: string;
    success: boolean;
}
```

## 2. Physician API Functions

### 2.1. GET\_PHYSICIANS

* **Mục đích:** Lấy danh sách bác sĩ
* **Input:** Không yêu cầu
* **Output:**

```ts
interface PhysiciansReponse {
    physicians: Physician[];
}

interface Physician {
    id: string;
    name: string;
    email: string;
    title: string;
    phone?: string;
    gender?: string;
    dob?: string;
}
```
