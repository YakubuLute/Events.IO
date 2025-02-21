export class SessionStorageUtil {
  // Function to set a key-value pair in session storage
  static setItem(key: string, value: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in session storage:', error);
    }
  }

  // Function to get a value from session storage by key
  static getItem<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from session storage:', error);
      return null;
    }
  }

  // Function to remove a key-value pair from session storage
  static removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from session storage:', error);
    }
  }

  // Function to clear all items from session storage
  static clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
  }
}
