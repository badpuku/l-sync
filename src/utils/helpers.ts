/**
 * 指定された時間だけ処理を待機させる
 * @param ms 待機時間（ミリ秒）
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * エラーレスポンスを生成する
 * @param message エラーメッセージ
 * @param status HTTPステータスコード
 */
export const createErrorResponse = (message: string, status: number = 500) => {
  return Response.json({ 
    status: 'error', 
    message 
  }, { status });
};

/**
 * 成功レスポンスを生成する
 * @param data レスポンスデータ
 * @param status HTTPステータスコード
 */
export const createSuccessResponse = (data: any = {}, status: number = 200) => {
  return Response.json({ 
    status: 'success', 
    ...data 
  }, { status });
}; 