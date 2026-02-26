import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExamResult, getStudentExamResults } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Check, X, Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ExamResultDetails = () => {
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const { student } = useAuth();
  const navigate = useNavigate();
  const { examId, resultId } = useParams<{ examId: string; resultId: string }>();

  useEffect(() => {
    const loadResult = async () => {
      if (!student?.id || !resultId) return;

      try {
        setLoading(true);
        const allResults = await getStudentExamResults(student.id);
        const foundResult = allResults.find(r => r.id === resultId);
        setResult(foundResult || null);
      } catch (error) {
        console.error('Failed to load exam result details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [student?.id, resultId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#10422a]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#dcfce7] border-t-transparent"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto py-8 px-4 bg-[#10422a] min-h-screen">
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-[#dcfce7] mb-4" />
          <h3 className="text-lg font-medium text-[#dcfce7]">Result not found</h3>
          <p className="text-[#dcfce7]/70 mt-2">The requested exam result could not be found.</p>
          <Button className="mt-6 bg-[#dcfce7] hover:bg-[#dcfce7]/90 text-[#10422a]" onClick={() => navigate('/results')}>
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    return 'text-[#dcfce7]';
  };

  const getScoreBgColor = (percentage: number) => {
    return 'bg-[#dcfce7] text-[#10422a]';
  };

  return (
    <div className="min-h-screen bg-[#10422a] text-[#dcfce7]">
      <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/results')} className="text-[#dcfce7] hover:bg-[#dcfce7]/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#dcfce7]">{result.exam_title}</h1>
            <p className="text-[#dcfce7]/70">
              Exam completed on {new Date(result.submitted_at).toLocaleDateString()} at {new Date(result.submitted_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Badge className={getScoreBgColor(result.score_percentage)}>
          {Math.round(result.score_percentage)}% Score
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-[#dcfce7] border-[#10422a]/20 hover:shadow-lg transition-all duration-300 hover:bg-[#dcfce7]/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#10422a]">Total Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-[#10422a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#10422a]">{result.total_questions}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#dcfce7] border-[#10422a]/20 hover:shadow-lg transition-all duration-300 hover:bg-[#dcfce7]/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#10422a]">Correct Answers</CardTitle>
            <Check className="h-4 w-4 text-[#10422a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#10422a]">{result.correct_answers}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#dcfce7] border-[#10422a]/20 hover:shadow-lg transition-all duration-300 hover:bg-[#dcfce7]/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#10422a]">Incorrect Answers</CardTitle>
            <X className="h-4 w-4 text-[#10422a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#10422a]">{result.total_questions - result.correct_answers}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#dcfce7] border-[#10422a]/20 hover:shadow-lg transition-all duration-300 hover:bg-[#dcfce7]/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#10422a]">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-[#10422a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#10422a]">
              {Math.floor(result.time_spent / 60)}m {result.time_spent % 60}s
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="mb-8 bg-[#10422a] border-[#dcfce7]/20">
        <CardHeader>
          <CardTitle className="text-[#dcfce7]">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#dcfce7]">Accuracy Rate</span>
              <span className={`text-lg font-bold ${getScoreColor(result.score_percentage)}`}>
                {Math.round((result.correct_answers / result.total_questions) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[#dcfce7]/20 rounded-full h-2">
              <div
                className="bg-[#dcfce7] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(result.correct_answers / result.total_questions) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-[#dcfce7]/70">
              You answered {result.correct_answers} out of {result.total_questions} questions correctly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => navigate('/dashboard')} className="bg-[#dcfce7] text-[#10422a]">
          Back to Dashboard
        </Button>
      </div>
      </div>
    </div>
  );
};

export default ExamResultDetails;
