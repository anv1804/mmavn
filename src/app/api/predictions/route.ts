import { NextRequest, NextResponse } from 'next/server';
import {
  getPredictionByFightId,
  getAllPredictions,
  submitPredictionVote,
  getTopPredictors,
  getPredictionStatsSummary,
} from '@/lib/services/prediction-service';
import { PredictionMethod, VoteSubmission } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fightId = searchParams.get('fightId');
    const isLeaderboard = searchParams.get('leaderboard') === 'true';
    const isStats = searchParams.get('stats') === 'true';

    if (isLeaderboard) {
      const leaderboard = getTopPredictors();
      return NextResponse.json({
        success: true,
        data: leaderboard,
        total: leaderboard.length,
      });
    }

    if (isStats) {
      const stats = getPredictionStatsSummary();
      return NextResponse.json({
        success: true,
        data: stats,
      });
    }

    if (fightId) {
      const prediction = getPredictionByFightId(fightId);
      return NextResponse.json({
        success: true,
        data: prediction,
      });
    }

    // Default: return all predictions
    const predictions = getAllPredictions();
    return NextResponse.json({
      success: true,
      data: predictions,
      total: Object.keys(predictions).length,
    });
  } catch (error) {
    console.error('Error handling GET /api/predictions:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể lấy dữ liệu dự đoán' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fightId, selectedFighterId, predictedMethod, predictedRound, userId, userName } = body;

    if (!fightId || !selectedFighterId || !predictedMethod) {
      return NextResponse.json(
        {
          success: false,
          error: 'Thiếu thông tin bắt buộc: fightId, selectedFighterId, predictedMethod',
        },
        { status: 400 }
      );
    }

    const validMethods: PredictionMethod[] = ['KO/TKO', 'Submission', 'Decision'];
    if (!validMethods.includes(predictedMethod as PredictionMethod)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Phương thức dự đoán không hợp lệ. Cho phép: KO/TKO, Submission, Decision',
        },
        { status: 400 }
      );
    }

    const submission: VoteSubmission = {
      fightId,
      selectedFighterId,
      predictedMethod: predictedMethod as PredictionMethod,
      predictedRound: predictedRound ? Number(predictedRound) : undefined,
      userId: userId || 'anon-user',
      userName: userName || 'Người hâm mộ MMA',
    };

    const result = submitPredictionVote(submission);

    return NextResponse.json({
      success: true,
      data: result.prediction,
      message: result.message,
    });
  } catch (error) {
    console.error('Error handling POST /api/predictions:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể ghi nhận dự đoán của bạn' },
      { status: 500 }
    );
  }
}
