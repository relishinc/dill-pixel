export type FilterCleanAssetNames<T> = T extends string
  ? T extends `${string}/${string}`
    ? never // Remove anything with slashes
    : T extends `${string}.${string}`
      ? never // Remove anything with file extensions
      : T // Keep clean names
  : never;

export type FilterSpineAssetNames<T> = T extends string
  ? T extends `${string}.skel`
    ? T extends `${string}/${infer FileName}.skel`
      ? `${FileName}.skel` // Remove path but keep filename.skel: 'spine/spineboy-pro.skel' → 'spineboy-pro.skel'
      : T // Keep as is if no path: 'spineboy-pro.skel' → 'spineboy-pro.skel'
    : never // Only keep .skel files, ignore .atlas files
  : never;

export type FilterBitmapFontNames<T> = T extends string
  ? T extends `${string}.fnt`
    ? T extends `${string}/${infer FileName}`
      ? FileName extends `${string}/${infer DeepFileName}`
        ? FilterBitmapFontNames<DeepFileName> // Recursively handle nested paths
        : FileName extends `${infer Name}.fnt`
          ? Name // Extract name without .fnt extension
          : never
      : T extends `${infer Name}.fnt`
        ? Name // Handle case with no path
        : never
    : never // Only keep .fnt files
  : never;
