## Group 2

Project gồm 2 phần chính:
- Backend: Node.Js + ExpressJs + GraphQL + MongoDB
- Frontend: React + Vite + Ant design

# Phân công công việc
//TranThuy
- Xây dựng UI tổng thể, phát triển Patient List Page
- Tạo Drawer Form (Creat / Edit / View Patient)
- Tính năng CRUD 
- Tính năng Search + Filter
- kết nối API (Apollo Client)

//Tien
- Tạo database
- Xây dựng source Backend, config BE với Database.
- Tạo các API cần sử dụng.
- Hỗ trợ refactor code FE, set up Router 
- Debug, hỗ trợ debug.

# Hướng dẫn start local

1. Vào folder Group-2
2. Install package cho frontend và package
    npm run install-all
3. Thêm file môi trường .env cho từng folder client và backend
    .env (Client)
    VITE_BACKEND_URL=http://localhost:4000/graphql

    .env (Backend)
    PORT = 4000
    MONGO_URL = "mongodb+srv://hoangtiengl2003_db_user:09092003@group2.uqj1qun.mongodb.net/?retryWrites=true&w=majority&appName=Group2"

4. Ở folder Group-2
    npm run start:frontend (chạy frontend)
    npm run start:backend (chạy backend)
    npm run start:all (chạy cả hai)

# API
Hệ thống sử dụng 6 GraphQL operations (3 queries + 3 mutations) với 2 MongoDB collections (Patient, Physician) và Redux Toolkit cho state management, tạo thành một API hoàn chỉnh cho quản lý bệnh nhân và bác sĩ.
1. PATIENT API FUNCTIONS
    1.1. GET_PATIENTS
    - Mục đích: Lấy danh sách bệnh nhân
    - Input:
        FetchPatientsParams {
            page?: number;     // Số trang (default: 1)
            limit?: number;    // Số bản ghi mỗi trang (default: 10)
            filter?: string;   // Từ khóa tìm kiếm theo email (default: '')
        }
    - Output: 
        PatientPaginationResponse {
        data: Patient[];      // Array các bệnh nhân
        total: number;        // Tổng số bản ghi
        totalPages: number;   // Tổng số trang
        }

        Patient {
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

    1.2. GET_PATIENT
    - Mục đích: Lấy thông tin 1 bệnh nhân
    - Input: 
        id: string
    -Output: 
        Patient | null

    1.3. CREATE_PATIENT
    - Mục đích: Tạo bệnh nhân mới
    - Input: 
        PatientInput {
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
    -Output: 
        Patient  // Thông tin bệnh nhân vừa tạo 

    1.4. UPDATE_PATIENT
    - Mục đích: Cập nhật thông tin bệnh nhân
    - Input:
        interface UpdatePatientParams {
        id: string;           
        input: PatientInput;  
        }
    - Output:
        Patient // Thông tin bệnh nhân sau khi cập nhật

    1.5. DELETE_PATIENT
    - Mục đích: Xóa bệnh nhân
    - Input:
        id: string
    - Output:
        interface DeletePatientResponse {
            id: string;      
            success: boolean; 
        }

2. PHYSICIAN API FUNCTIONS
    2.1. GET_PHYSICIANS
    - Mục đích: Lấy danh sách bác sĩ
    - Input:
    - Output:
        interface PhysicianState {
            list: Physician[];
            loading: boolean;
            error: string | null;
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


API
FE gửi Mutation với input.

Resolver nhận → gọi patient.service.create(input).

Service:

Validate email format, trường bắt buộc.

Kiểm tra physician có tồn tại.

Lưu MongoDB (qua Model).

Trả về Patient đã lưu (có thể populate physician).

Apollo Server trả JSON cho FE.

Soft delete: deletePatient chỉ đổi status = "DELETED", không xóa bản ghi → dễ khôi phục, giữ lịch sử.


Redux
Redux Toolkit: giữ UI state (mở/đóng Drawer, filters, pagination, loading, error) và snapshot dữ liệu đã fetch (để render nhất quán, persist sau reload).
Component bấm Save → dispatch(updatePatient({ id, input })).

Thunk gọi apolloClient.mutate(...).

Thành công → cập nhật Redux state (thay phần tử trong data) → đóng Drawer → bắn message.success.

Thất bại → set error → message.error.