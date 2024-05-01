import { Signals } from '../signals/Signals';

export function changeLanguage(languageId: string) {
  Signals.changeLanguage.emit(languageId);
}
