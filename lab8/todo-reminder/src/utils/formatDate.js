export default function formatDateTime(dateStr) {
  const d = new Date(dateStr);

  return (
    d.toLocaleDateString('uk-UA') +
    ' ' +
    d.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
}