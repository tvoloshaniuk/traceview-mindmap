import en from './locales/en.json';
import uk from './locales/uk.json';
import pl from './locales/pl.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt-BR.json';
import zh from './locales/zh-CN.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ru from './locales/ru.json';

export const LANGUAGES = {
  en: 'English', uk: 'Українська', ru: 'Русский', pl: 'Polski', de: 'Deutsch', es: 'Español',
  fr: 'Français', 'pt-BR': 'Português (Brasil)', 'zh-CN': '简体中文', ja: '日本語', ko: '한국어',
} as const;
export type Language = keyof typeof LANGUAGES;
export type LanguageSetting = Language | 'auto';
type Message = keyof typeof en;
type Dictionary = Partial<Record<Message, string>>;
export const dictionaries: Record<Language, Dictionary> = { en, uk, ru, pl, de, es, fr, 'pt-BR': pt, 'zh-CN': zh, ja, ko };
let language: Language = 'en';

export function resolveLanguage(value: string): Language {
  const code = value.trim().replace(/_/g, '-').toLowerCase();
  const exact = Object.keys(LANGUAGES).find(key => key.toLowerCase() === code);
  if (exact) return exact as Language;
  const base = code.split('-')[0];
  if (base === 'pt') return 'pt-BR';
  if (base === 'zh') return 'zh-CN';
  return Object.prototype.hasOwnProperty.call(LANGUAGES, base) ? base as Language : 'en';
}

export function isLanguageSetting(value: unknown): value is LanguageSetting {
  return typeof value === 'string' && (value === 'auto' || Object.prototype.hasOwnProperty.call(LANGUAGES, value));
}

export function setLanguage(value: LanguageSetting, appLanguage = 'en'): void {
  language = resolveLanguage(value === 'auto' ? appLanguage : value);
}

export function getLocale(): Language { return language; }

export function t(key: Message, values: Record<string, string | number> = {}): string {
  const text = dictionaries[language][key] || en[key];
  return text.replace(/\{(\w+)\}/g, (token, name: string) => Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : token);
}
