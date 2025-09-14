import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import StatisticsPage from '../pages/statistics/StatisticsPage';
import PatientList from '../pages/patients/PatientList';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/patients" replace />} />
                <Route path="dashboard" element={<DashboardOverview />} />
                <Route path="patients" element={<PatientList />} />
                <Route path="statistics" element={<StatisticsPage />} />
            </Route>
        </Routes>
    );
}
