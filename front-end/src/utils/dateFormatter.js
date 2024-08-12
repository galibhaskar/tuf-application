import moment from 'moment';

export const formatDateToMySQL = (date) => {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const convertDateFromMySQL = (mysqlDate) => {
  if (!mysqlDate) return new Date();
  return moment(mysqlDate).toDate().toISOString();
};
