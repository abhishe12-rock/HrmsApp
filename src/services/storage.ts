import AsyncStorage from '@react-native-async-storage/async-storage';

const memoryCache: Record<string, any> = {};
let isInitialized = false;

export const initStorage = async () => {
  try {
    const storage = AsyncStorage as any;
    if (typeof storage?.getAllKeys === 'function') {
      const keys: string[] = await storage.getAllKeys();
      const hrmKeys = keys.filter((k: string) => k.startsWith('hrm_'));
      if (hrmKeys.length > 0 && typeof storage?.multiGet === 'function') {
        const entries: [string, string | null][] = await storage.multiGet(hrmKeys);
        entries.forEach(([key, value]) => {
          if (value) {
            try {
              const rawKey = key.replace('hrm_', '');
              memoryCache[rawKey] = JSON.parse(value);
            } catch {
              // ignore
            }
          }
        });
      }
    }
    isInitialized = true;
  } catch (err) {
    console.warn('Storage init failed, using in-memory state:', err);
  }
};

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (key in memoryCache) {
    return memoryCache[key] as T;
  }
  return defaultValue;
}

export function saveToStorage<T>(key: string, value: T): void {
  memoryCache[key] = value;
  try {
    AsyncStorage.setItem(`hrm_${key}`, JSON.stringify(value)).catch(() => {});
  } catch (error) {
    console.error(`Error saving to storage key ${key}:`, error);
  }
}
