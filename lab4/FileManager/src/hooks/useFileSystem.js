import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

const useFileSystem = () => {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState(null);

  // ── Ініціалізація при запуску ────────────────────────────────────────────────
  useEffect(() => {
    initRootDir();
  }, []);

  useEffect(() => {
    if (currentPath) loadDirectory(currentPath);
  }, [currentPath]);

  const initRootDir = async () => {
    try {
      const info = await FileSystem.getInfoAsync(ROOT_DIR);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
      }
      loadStorageInfo();
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося ініціалізувати директорію: ' + e.message);
    }
  };

  // ── Статистика пам'яті ────────────────────────────────────────────────────────
  const loadStorageInfo = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setStorageInfo({ free, total, used: total - free });
    } catch {
      setStorageInfo(null);
    }
  };

  // ── Читання директорії ────────────────────────────────────────────────────────
  const loadDirectory = async (path) => {
    setLoading(true);
    try {
      const names = await FileSystem.readDirectoryAsync(path);
      const details = await Promise.all(
        names.map(async (name) => {
          const fullPath = path + name;
          const info = await FileSystem.getInfoAsync(fullPath, { size: true });
          return {
            name,
            fullPath: info.isDirectory ? fullPath + '/' : fullPath,
            isDirectory: info.isDirectory,
            size: info.size || 0,
            modificationTime: info.modificationTime,
          };
        })
      );
      // Папки першими, потім файли — обидві групи за алфавітом
      details.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      setItems(details);
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося завантажити директорію: ' + e.message);
    }
    setLoading(false);
  };

  // ── Навігація ─────────────────────────────────────────────────────────────────
  const navigateInto = (item) => {
    if (item.isDirectory) setCurrentPath(item.fullPath);
  };

  const navigateUp = () => {
    if (currentPath === ROOT_DIR) return;
    const trimmed = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    const parent = trimmed.substring(0, trimmed.lastIndexOf('/') + 1);
    setCurrentPath(parent);
  };

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  const getBreadcrumb = () => {
    const relative = currentPath.replace(ROOT_DIR, '');
    if (!relative) return 'AppData';
    return 'AppData / ' + relative.replace(/\//g, ' / ').replace(/ \/ $/, '');
  };

  // ── Читання файлу ─────────────────────────────────────────────────────────────
  const readFile = async (fullPath) => {
    return await FileSystem.readAsStringAsync(fullPath);
  };

  // ── Збереження файлу ──────────────────────────────────────────────────────────
  const saveFile = async (fullPath, content) => {
    await FileSystem.writeAsStringAsync(fullPath, content);
    loadDirectory(currentPath);
  };

  // ── Створення папки ───────────────────────────────────────────────────────────
  const createFolder = async (name) => {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Введіть назву папки');
    const newPath = currentPath + trimmed + '/';
    const exists = await FileSystem.getInfoAsync(newPath);
    if (exists.exists) throw new Error('Папка з такою назвою вже існує');
    await FileSystem.makeDirectoryAsync(newPath);
    loadDirectory(currentPath);
  };

  // ── Створення файлу ───────────────────────────────────────────────────────────
  const createFile = async (name, content = '') => {
    let trimmed = name.trim();
    if (!trimmed) throw new Error('Введіть назву файлу');
    if (!trimmed.includes('.')) trimmed += '.txt';
    const newPath = currentPath + trimmed;
    const exists = await FileSystem.getInfoAsync(newPath);
    if (exists.exists) throw new Error('Файл з такою назвою вже існує');
    await FileSystem.writeAsStringAsync(newPath, content);
    loadDirectory(currentPath);
  };

  // ── Видалення ─────────────────────────────────────────────────────────────────
  const deleteItem = (item) => {
    Alert.alert(
      'Підтвердження видалення',
      `Ви впевнені, що хочете видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.fullPath, { idempotent: true });
              loadDirectory(currentPath);
            } catch (e) {
              Alert.alert('Помилка', e.message);
            }
          },
        },
      ]
    );
  };

  return {
    currentPath,
    items,
    loading,
    storageInfo,
    navigateInto,
    navigateUp,
    getBreadcrumb,
    readFile,
    saveFile,
    createFolder,
    createFile,
    deleteItem,
    isAtRoot: currentPath === ROOT_DIR,
  };
};

export default useFileSystem;
