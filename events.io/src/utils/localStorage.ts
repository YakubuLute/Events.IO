export class LocalStorageUtil {
  // Function to set a key-value pair in local storage
  static setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in local storage:', error);
    }
  }

  // Function to get a value from local storage by key
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from local storage:', error);
      return null;
    }
  }

  // Function to remove a key-value pair from local storage
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from local storage:', error);
    }
  }

  // Function to clear all items from local storage
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }
}
