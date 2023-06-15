export function formatDate(timestamp) {
  if (isNaN(timestamp)) {
    // Handle invalid dates
    return '';
  }

  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}
