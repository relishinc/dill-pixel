import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const supabasePkg = JSON.parse(fs.readFileSync('./node_modules/@supabase/supabase-js/package.json', 'utf8'));
const supabasePostgresPkg = JSON.parse(fs.readFileSync('./node_modules/@supabase/postgrest-js/package.json', 'utf8'));
const supabaseVersion = supabasePkg.version;
const supabasePostgresVersion = supabasePostgresPkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const supabaseVersion = '${supabaseVersion}';\nexport const supabasePostgresVersion = '${supabasePostgresVersion}';`,
);
