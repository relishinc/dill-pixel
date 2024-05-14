let version;

try {
  version = __APP_VERSION__;
} catch (e) {
  version = 'dev';
}

export const APP_VERSION = version;
export const COLOR_GREEN = 0x50a564;
