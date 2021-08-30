const options: Record<string, string> = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timeZone: 'UTC',
};
export const dateToString = (date: Date | string): string => {
  return typeof date === 'string'
    ? new Date(date).toLocaleString('ko-KR', options)
    : date.toLocaleString('ko-KR', options);
};

export const getMaxDate = (date: Date | null | undefined): Date | null => {
  if (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  } else {
    return null;
  }
};

export const getMinDate = (date: Date | null | undefined): Date | null => {
  if (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  } else {
    return null;
  }
};

export const getKoreaTime = (date: Date | null): Date | null => {
  if (date) {
    const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const krTime = new Date(utc + KR_TIME_DIFF);

    return krTime;
  } else {
    return null;
  }
};
