import moment from 'moment';

export const formatDateToMySQL = (isoString) => {
  // Parse the ISO string into a moment object
  const date = moment(isoString);

  // Check if the date is valid
  if (!date.isValid()) {
    throw new Error('Invalid date format');
  }

  // Format the moment object into MySQL datetime format
  return date.format('YYYY-MM-DD HH:mm:ss');
};
