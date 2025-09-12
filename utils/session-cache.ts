"use client";

const TTL = 1000 * 60; // 1 minute


export function setSessionCache<T>(key: string, value: T, ttl: number = TTL) {
 
  sessionStorage.setItem(key, JSON.stringify({
    value,
    expiry: new Date().getTime() + ttl,
  }));
}

export function getSessionCache<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  if (!item) return null;

  const { value, expiry } = JSON.parse(item);
  if (new Date().getTime() > expiry) {
    removeSessionCache(key);
    return null;
  }

  return value;
}

export function removeSessionCache(key: string) {
 
  sessionStorage.removeItem(key);
}

