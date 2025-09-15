import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PatientList from '../pages/PatientList';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/patients" replace />} />
                <Route path="patients" element={<PatientList />} />
            </Route>
        </Routes>
    );
}
