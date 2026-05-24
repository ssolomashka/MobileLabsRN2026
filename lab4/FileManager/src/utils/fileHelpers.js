// ── Розширення файлу ───────────────────────────────────────────────────────────
export const getExtension = (name) => {
  const parts = name.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

// ── Чи є файл текстовим ───────────────────────────────────────────────────────
export const isTextFile = (name) => {
  return ['txt', 'md', 'json', 'csv', 'log', 'js', 'ts'].includes(getExtension(name));
};

// ── Іконка файлу (емодзі) ─────────────────────────────────────────────────────
export const getFileEmoji = (name, isDirectory) => {
  if (isDirectory) return '📁';
  const ext = getExtension(name);
  const map = {
    txt: '📄',
    md: '📝',
    json: '📋',
    csv: '📊',
    log: '📃',
    js: '📜',
    ts: '📜',
  };
  return map[ext] || '📄';
};

// ── Форматування розміру ──────────────────────────────────────────────────────
export const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// ── Форматування дати ─────────────────────────────────────────────────────────
export const formatDate = (ms) => {
  if (!ms) return '—';
  const d = new Date(ms);
  return (
    d.toLocaleDateString('uk-UA') +
    '  ' +
    d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  );
};

// ── Тип файлу для відображення ────────────────────────────────────────────────
export const getFileType = (name, isDirectory) => {
  if (isDirectory) return 'Папка';
  const ext = getExtension(name);
  return ext ? ext.toUpperCase() + '-файл' : 'Файл';
};
