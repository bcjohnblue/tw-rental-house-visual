export const cleanData = (originData: any): any[] => {
  originData.sort((a: any, b: any) => a.monthly_price - b.monthly_price);
  // console.log(originData);

  // 去除頭尾各 10% 資料
  const CUT_EDGE_DATA_PERCENT = 20 * 0.01 / 2;
  const edgeDataLength = Math.floor(originData.length * CUT_EDGE_DATA_PERCENT);
  const first10percentIndex = edgeDataLength;
  const last10percentIndex = originData.length - edgeDataLength;

  return originData.slice(first10percentIndex, last10percentIndex);
};

export const fixPrice = (price: number, digit: number = 0) => {
  const roundNumber = 10 ** digit;
  return Math.round(price / roundNumber) * roundNumber;
};
