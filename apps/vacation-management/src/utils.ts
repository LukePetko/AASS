export const calcBusinessDays = (dDate1: Date, dDate2: Date) => {
  let weeks,
    dateDiff,
    adjust = 0;

  if (dDate2 < dDate1) return -1;

  let weekday1 = dDate1.getDay();
  let weekday2 = dDate2.getDay();

  weekday1 = weekday1 == 0 ? 7 : weekday1;
  weekday2 = weekday2 == 0 ? 7 : weekday2;

  if (weekday1 > 5 && weekday2 > 5) adjust = 1;

  weekday1 = weekday1 > 5 ? 5 : weekday1;
  weekday2 = weekday2 > 5 ? 5 : weekday2;

  weeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000);

  if (weekday1 <= weekday2) {
    dateDiff = weeks * 5 + (weekday2 - weekday1);
  } else {
    dateDiff = (weeks + 1) * 5 - (weekday1 - weekday2);
  }

  dateDiff -= adjust;

  return dateDiff + 1;
};
