import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import ResultsPage from "@/pages/ResultsPage";
import ResultOverviewPage from "@/pages/ResultOverviewPage";
import ExamSubmittedPage from "./pages/ExamSubmittedPage";
import ExamCancelled from "./pages/ExamCancelled";
import AdminLogin from "./pages/AdminLogin";
import ProfilePage from "./pages/ProfilePage";
import GradesPage from "./pages/GradesPage";
import ScholarSphereDashboard from "./pages/scholarsphere/Dashboard";
import ScholarSphereSubjectDetails from "./pages/scholarsphere/SubjectDetails";
import ExamResultDetails from "./pages/ExamResultDetails";
import ForgotIdPage from "./pages/ForgotIdPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import ExamsPage from "./pages/admin/ExamsPage";
import AdminResultsPage from "./pages/admin/ResultsPage";
import ExamReleasePage from "./pages/admin/ExamReleasePage";
import ElyonPlusPage from "./pages/admin/ElyonPlusPage";
import ViolationsPage from "./pages/admin/ViolationsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import VersionManagementPage from "./pages/admin/VersionManagementPage";
import TeachersPage from "./pages/admin/TeachersPage";
import ProgrammesPage from "./pages/admin/ProgrammesPage";
import NotFound from "./pages/NotFound";
import WelcomeScreen from "./components/WelcomeScreen";

const queryClient = new QueryClient();
const history = createBrowserHistory();

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HistoryRouter history={history as any} {...routerConfig}>
              <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/login" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exam/:id" element={<Exam />} />
                <Route path="/exam/:examId/results/:resultId" element={<ExamResultDetails />} />
                <Route path="/exam-submitted" element={<ExamSubmittedPage />} />
                <Route path="/exam-cancelled" element={<ExamCancelled />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/results/overview" element={<ResultOverviewPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/grades" element={<GradesPage />} />
                <Route path="/scholarsphere" element={<ScholarSphereDashboard />} />
                <Route path="/subject-details" element={<ScholarSphereSubjectDetails />} />
                <Route path="/forgot-id" element={<ForgotIdPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin">
                  <Route path="login" element={<AdminLogin />} />
                  <Route element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="students" element={<StudentsPage />} />
                    <Route path="teachers" element={<TeachersPage />} />
                    <Route path="programmes" element={<ProgrammesPage />} />
                    <Route path="exams" element={<ExamsPage />} />
                    <Route path="results" element={<AdminResultsPage />} />
                    <Route path="exam-release" element={<ExamReleasePage />} />
                    <Route path="version-management" element={<VersionManagementPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="elyonplus" element={<ElyonPlusPage />} />
                    <Route path="violations" element={<ViolationsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HistoryRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;