import { useState, useEffect } from 'react';
import { Search, Filter, Users, CheckCircle, XCircle, AlertCircle, TrendingUp, Lock, Unlock, UserCheck, UserX } from 'lucide-react';
import { supabase, queryWithRetry, bulkGrantExamAccess, bulkRevokeExamAccess, grantExamAccess, revokeExamAccess, fetchExamAccessRecords, fetchStudents } from '@/lib/supabase';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { exams } from '@/data/exams';

interface Student {
  id: string;
  admissionId: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
}

interface ExamAccessRecord {
  id?: string;
  exam_id: string;
  student_id: string;
  has_access: boolean;
  updated_at?: string;
}

const ExamAccessPage = () => {
  useDocumentTitle('Exam Access Management');
  const { admin } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExam, setFilterExam] = useState<string>('all');
  const [filterAccess, setFilterAccess] = useState<string>('all');
  const [students, setStudents] = useState<Student[]>([]);
  const [examAccessRecords, setExamAccessRecords] = useState<Record<string, ExamAccessRecord[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
  const [currentExamId, setCurrentExamId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all students
        const studentsData = await queryWithRetry(async () => {
          const data = await fetchStudents();
          return data;
        });

        setStudents(studentsData);

        // Get unique exam IDs from the exams data
        const examIds = exams.map(exam => exam.id);

        // Fetch access records for all exams
        const accessRecords: Record<string, ExamAccessRecord[]> = {};

        for (const examId of examIds) {
          const records = await queryWithRetry(async () => {
            return await fetchExamAccessRecords(examId);
          });
          accessRecords[examId] = records;
        }

        setExamAccessRecords(accessRecords);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load exam access data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get filtered exams based on admin role
  const getFilteredExams = () => {
    let filteredExams = exams;

    if (admin?.username === 'ZenaZPrestigious@elyonmain.app') {
      filteredExams = exams.filter(exam => exam.id === 'english-euee-2018');
    } else if (admin?.username === 'Asnakew@elyonmain.app') {
      filteredExams = exams.filter(exam => exam.id === 'chemistry-2018-natural');
    } else if (admin?.username === 'Habtamu@elyonmain.app') {
      filteredExams = exams.filter(exam =>
        exam.title?.toLowerCase().includes('economics') ||
        exam.title?.toLowerCase().includes('economic')
      );
    }

    return filteredExams;
  };

  const filteredExams = getFilteredExams();
  const uniqueExams = filteredExams.map(exam => ({ id: exam.id, title: exam.title }));

  // Helper function to check if student has access to an exam
  const hasAccess = (studentId: string, examId: string): boolean => {
    const records = examAccessRecords[examId] || [];
    const record = records.find(r => r.student_id === studentId);
    return record?.has_access ?? false;
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAccess = filterAccess === 'all' ||
      (filterAccess === 'has_access' && currentExamId && hasAccess(student.admissionId, currentExamId)) ||
      (filterAccess === 'no_access' && currentExamId && !hasAccess(student.admissionId, currentExamId));

    return matchesSearch && matchesAccess;
  });

  // Bulk action handlers
  const handleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.admissionId)));
    }
  };

  const handleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleBulkGrantAccess = async () => {
    if (selectedStudents.size === 0 || !currentExamId) return;

    const confirmMessage = `Are you sure you want to grant exam access to ${selectedStudents.size} student(s) for "${filteredExams.find(e => e.id === currentExamId)?.title}"?`;
    if (!confirm(confirmMessage)) return;

    try {
      setIsBulkActionLoading(true);
      const studentIds = Array.from(selectedStudents);

      await bulkGrantExamAccess(studentIds, currentExamId);

      // Update local state
      setExamAccessRecords(prev => ({
        ...prev,
        [currentExamId]: [
          ...(prev[currentExamId] || []).filter(r => !studentIds.includes(r.student_id)),
          ...studentIds.map(studentId => ({
            exam_id: currentExamId,
            student_id: studentId,
            has_access: true,
            updated_at: new Date().toISOString()
          }))
        ]
      }));

      setSelectedStudents(new Set());
      alert(`Successfully granted access to ${studentIds.length} student(s).`);
    } catch (error) {
      console.error('Error bulk granting access:', error);
      alert('Failed to grant access. Please try again.');
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  const handleBulkRevokeAccess = async () => {
    if (selectedStudents.size === 0 || !currentExamId) return;

    const confirmMessage = `⚠️ WARNING: Are you sure you want to revoke exam access from ${selectedStudents.size} student(s) for "${filteredExams.find(e => e.id === currentExamId)?.title}"?`;
    if (!confirm(confirmMessage)) return;

    try {
      setIsBulkActionLoading(true);
      const studentIds = Array.from(selectedStudents);

      await bulkRevokeExamAccess(studentIds, currentExamId);

      // Update local state
      setExamAccessRecords(prev => ({
        ...prev,
        [currentExamId]: [
          ...(prev[currentExamId] || []).filter(r => !studentIds.includes(r.student_id)),
          ...studentIds.map(studentId => ({
            exam_id: currentExamId,
            student_id: studentId,
            has_access: false,
            updated_at: new Date().toISOString()
          }))
        ]
      }));

      setSelectedStudents(new Set());
      alert(`Successfully revoked access from ${studentIds.length} student(s).`);
    } catch (error) {
      console.error('Error bulk revoking access:', error);
      alert('Failed to revoke access. Please try again.');
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  const handleToggleAccess = async (studentId: string, examId: string) => {
    const student = students.find(s => s.admissionId === studentId);
    const exam = filteredExams.find(e => e.id === examId);
    const currentlyHasAccess = hasAccess(studentId, examId);

    const action = currentlyHasAccess ? 'revoke' : 'grant';
    const confirmMessage = currentlyHasAccess
      ? `Are you sure you want to revoke access for ${student?.name} from "${exam?.title}"?`
      : `Are you sure you want to grant access for ${student?.name} to "${exam?.title}"?`;

    if (!confirm(confirmMessage)) return;

    try {
      if (currentlyHasAccess) {
        await revokeExamAccess(studentId, examId);
      } else {
        await grantExamAccess(studentId, examId);
      }

      // Update local state
      setExamAccessRecords(prev => ({
        ...prev,
        [examId]: [
          ...(prev[examId] || []).filter(r => r.student_id !== studentId),
          {
            exam_id: examId,
            student_id: studentId,
            has_access: !currentlyHasAccess,
            updated_at: new Date().toISOString()
          }
        ]
      }));
    } catch (error) {
      console.error(`Error ${action}ing access:`, error);
      alert(`Failed to ${action} access. Please try again.`);
    }
  };

  // Calculate stats
  const totalStudents = filteredStudents.length;
  const studentsWithAccess = currentExamId ? filteredStudents.filter(s => hasAccess(s.admissionId, currentExamId)).length : 0;
  const studentsWithoutAccess = currentExamId ? totalStudents - studentsWithAccess : 0;
  const accessRate = currentExamId && totalStudents > 0 ? Math.round((studentsWithAccess / totalStudents) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading exam access data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-lg font-semibold mb-2">Database Connection Required</h2>
        <p className="text-muted-foreground mb-4">
          {error}. This page requires a live database connection to function.
        </p>
        <p className="text-sm text-muted-foreground">
          Please ensure your database is accessible and try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exam Access Management</h1>
          <p className="text-muted-foreground">Control which students can access specific exams</p>
        </div>
      </div>

      {/* Stats */}
      {currentExamId && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 animate-slide-up">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-display font-bold text-foreground">{totalStudents}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <p className="text-sm text-muted-foreground">Have Access</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-display font-bold text-success">{studentsWithAccess}</p>
              <UserCheck size={18} className="text-success" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <p className="text-sm text-muted-foreground">Access Rate</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-display font-bold text-foreground">{accessRate}%</p>
              <TrendingUp size={18} className="text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or admission ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <select
          value={filterExam}
          onChange={(e) => {
            setFilterExam(e.target.value);
            setCurrentExamId(e.target.value === 'all' ? '' : e.target.value);
            setSelectedStudents(new Set());
          }}
          className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">Select Exam</option>
          {uniqueExams.map(exam => (
            <option key={exam.id} value={exam.id}>{exam.title}</option>
          ))}
        </select>
        {currentExamId && (
          <select
            value={filterAccess}
            onChange={(e) => setFilterAccess(e.target.value)}
            className="px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Access Levels</option>
            <option value="has_access">Has Access</option>
            <option value="no_access">No Access</option>
          </select>
        )}
      </div>

      {!currentExamId ? (
        <div className="text-center py-12">
          <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select an Exam</h3>
          <p className="text-muted-foreground">Choose an exam from the dropdown above to manage student access permissions.</p>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-secondary/30 rounded-lg border border-border animate-slide-up" style={{ animationDelay: '350ms' }}>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                disabled={isBulkActionLoading}
              >
                {selectedStudents.size === filteredStudents.length && filteredStudents.length > 0 ? (
                  <CheckCircle size={16} className="text-primary" />
                ) : (
                  <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
                )}
                <span className="text-sm font-medium">
                  {selectedStudents.size === filteredStudents.length && filteredStudents.length > 0
                    ? 'Deselect All'
                    : 'Select All'
                  }
                </span>
              </button>
              <span className="text-sm text-muted-foreground">
                {selectedStudents.size} of {filteredStudents.length} selected
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBulkGrantAccess}
                disabled={selectedStudents.size === 0 || isBulkActionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBulkActionLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-success-foreground border-t-transparent" />
                ) : (
                  <Unlock size={16} />
                )}
                <span className="text-sm font-medium">Grant Access</span>
              </button>

              <button
                onClick={handleBulkRevokeAccess}
                disabled={selectedStudents.size === 0 || isBulkActionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBulkActionLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-destructive-foreground border-t-transparent" />
                ) : (
                  <Lock size={16} />
                )}
                <span className="text-sm font-medium">Revoke Access</span>
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="w-12 px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-border"
                      />
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Student</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Admission ID</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Class</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Section</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">Access Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => {
                      const accessGranted = hasAccess(student.admissionId, currentExamId);

                      return (
                        <tr
                          key={student.admissionId}
                          className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedStudents.has(student.admissionId)}
                              onChange={() => handleSelectStudent(student.admissionId)}
                              className="rounded border-border"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="bg-secondary px-2 py-1 rounded text-sm text-foreground">{student.admissionId}</code>
                          </td>
                          <td className="px-6 py-4 text-foreground">{student.class}</td>
                          <td className="px-6 py-4 text-foreground">{student.section}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleToggleAccess(student.admissionId, currentExamId)}
                              className={`p-2 rounded-lg transition-colors ${
                                accessGranted
                                  ? 'bg-success/10 text-success hover:bg-success/20'
                                  : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                              }`}
                              title={accessGranted ? 'Student has access - click to revoke' : 'Student has no access - click to grant'}
                            >
                              {accessGranted ? <UserCheck size={16} /> : <UserX size={16} />}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        No students found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamAccessPage;
