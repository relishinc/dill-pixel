import { Signals } from '../signals';

export function changeLanguage(languageId: string) {
  Signals.changeLanguage.emit(languageId);
}
