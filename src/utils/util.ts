export function getDateDiff(time: string): string | boolean {
  const dateTimeStamp = new Date(time).getTime();
  const minute: number = 1000 * 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  const halfamonth: number = day * 15;
  const month: number = day * 30;
  const now: number = new Date().getTime();

  const diffValue: number = now - dateTimeStamp;
  if (diffValue < 0) {
    return false;
  }

  const monthC: number = diffValue / month;
  const weekC: number = diffValue / (7 * day);
  const dayC: number = diffValue / day;
  const hourC: number = diffValue / hour;
  const minC: number = diffValue / minute;
  let result: string = '';
  if (monthC >= 1) {
    result = '' + parseInt(monthC.toString()) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC.toString()) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC.toString()) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC.toString()) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC.toString()) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

// 最近24小时
export function initMapData(): Array<object> {
  let timeStamp: Date = new Date();
  const result: object[] = [];
  for (let i = 0; i < 24; i++) {
    let year: string = timeStamp.getFullYear().toString();
    let mouth: string = (timeStamp.getMonth() + 1).toString().padStart(2, '0');
    let days: string = timeStamp
      .getDate()
      .toString()
      .padStart(2, '0');
    let hours: string = timeStamp
      .getHours()
      .toString()
      .padStart(2, '0');
    const time: string = `${year}-${mouth}-${days} ${hours}`;
    timeStamp = new Date(timeStamp.getTime() - 60 * 60 * 1000);
    result.push({
      time,
      events: 0,
    });
  }
  return result;
}
