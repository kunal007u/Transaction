import moment from 'moment';

export const DateUTCToLocalDateString = (date) => moment.utc(date).local().format('DD MMMM, YYYY');
export const DateUTCToLocalDateAndTimeString = (date) => moment.utc(date).local().format('DD MMMM, YYYY hh:mm:a');
export const DateToLocalDateString = (date) => moment(date).format('YYYY-MM-DD');
export const DateUTCToLocalDateTimeString = (date: Date | string) => moment(new Date(date)).format('DD-MMM-yyyy hh:mm a');
export const DateUTCToLocalDateWithTimeString = (date: Date | string) => moment(new Date(date)).format('DD/MM/yyyy hh:mm A');
export const DateUTCToLocalDateTimeWithSecondString = (date: Date | string) => moment(new Date(date)).format('DD-MMM-yyyy hh:mm:ss a');
export const TimeToTimeString = (time: string) => moment(time, 'hh:mm').format('hh:mm A');
export const DateTimeToDateString = (date: Date | string) => moment(date).format('DD-MMM-yyyy');
export const DateTimeToDate_String = (date: Date | string) => moment(date).format('DD-MM-yyyy');
export const DateToLocalTimeString = (date: Date) => moment(date).format('hh:mm A')
export const DateToLocalDayString = (date: Date | string) => moment(new Date(date)).format('dddd')
