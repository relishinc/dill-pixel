import fs from 'node:fs';

// Default voiceover attributes
const defaultVoice = 'en-US-Wavenet-D'; // Example Google voice ID
const defaultGender = 'female';
const defaultLanguage = 'en-US';
const defaultCaption = 'Y';

// Function to load existing CSV data into a map
function loadExistingCsv(filePath) {
  const csvMap = new Map();
  if (fs.existsSync(filePath)) {
    const csvData = fs.readFileSync(filePath, 'utf8');
    const lines = csvData.split('\n');
    lines.forEach((line, index) => {
      if (line && index > 0) {
        // Skip header
        const parts = line.split('\t'); // Use tab to split
        const filename = parts[0];
        csvMap.set(filename, parts);
      }
    });
  }
  return csvMap;
}

function updateOrAddLine(filename, lineText, csvMap) {
  lineText = stripHtmlTags(lineText);

  if (csvMap.has(filename)) {
    const parts = csvMap.get(filename);
    parts[1] = lineText; // Update the line text
  } else {
    // Create new line with defaults if they are not present
    const newLine = [filename, lineText, defaultVoice, defaultGender, defaultLanguage, defaultCaption];
    csvMap.set(filename, newLine);
  }
}

function stripHtmlTags(str) {
  // Replace <strong> tag with asterisks for emphasis
  str = str.replace(/<strong>/g, '*');
  str = str.replace(/<\/strong>/g, '*');

  // Replace <em> tag with underscores for emphasis
  str = str.replace(/<em>/g, '_');
  str = str.replace(/<\/em>/g, '_');

  // Remove other HTML tags
  str = str.replace(/<[^>]*>/g, '');
  return str;
}

// Function to parse the object and create CSV content
function parseOrUpdateVoiceoverData(data, existingCsvMap) {
  let csvContent = 'FILENAME\tLINE\tSCRATCH_VOICE\tSCRATCH_GENDER\tSCRATCH_LANGUAGE\tCAPTION\n';

  for (const key in data) {
    const value = data[key];

    // Handle replace object structure
    if (value && typeof value === 'object' && 'replace' in value) {
      const { replace, replaceOpts } = value;

      // Parse replacement options
      if (replaceOpts && replaceOpts.startsWith('[') && replaceOpts.endsWith(']')) {
        const options = replaceOpts.slice(1, -1).split('|');

        // Generate a line for each replacement option
        options.forEach((option, index) => {
          const filename = `${key}_${index}`;
          const replacedText = replace.replace(/\{[^}]+\}/, option.trim());
          updateOrAddLine(filename, replacedText, existingCsvMap);
        });
      } else {
        // If no valid replaceOpts, just use the replace text as is
        updateOrAddLine(key, replace, existingCsvMap);
      }
    }
    // Handle existing string array format
    else if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      const options = value.slice(1, -1).split('|');
      options.forEach((option, index) => {
        const filename = `${key}_${index}`;
        updateOrAddLine(filename, option, existingCsvMap);
      });
    }
    // Handle simple string
    else if (typeof value === 'string') {
      updateOrAddLine(key, value, existingCsvMap);
    }
  }

  existingCsvMap.forEach((parts) => {
    csvContent += parts.join('\t') + '\n';
  });

  return csvContent;
}

export async function generateVoiceoverCSV(inputDirs, outputDir) {
  console.log('inputDirs', inputDirs);
  // Split input directories and trim whitespace
  const directories = inputDirs.split(',').map((dir) => dir.trim());

  // Process each directory
  for (const inputDir of directories) {
    // Skip if directory doesn't exist
    if (!fs.existsSync(inputDir)) {
      console.warn(`Warning: Directory ${inputDir} does not exist, skipping...`);
      continue;
    }

    const files = fs.readdirSync(inputDir).filter((file) => !file.startsWith('.'));
    for (const file of files) {
      const filePath = `${inputDir}/${file}`;
      console.log('filePath', filePath);
      // only process files that end with .js or .ts or .json
      if (!file.endsWith('.js') && !file.endsWith('.ts') && !file.endsWith('.json')) {
        console.log('Skipping file', file);
        continue;
      }

      let fileData = fs.readFileSync(filePath, 'utf-8');
      // if the file is a js or ts file, extract a JSON object by finding the first occurrence of '{'
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        const startIndex = fileData.indexOf('{');
        const endIndex = fileData.lastIndexOf('}');
        fileData = fileData.slice(startIndex, endIndex + 1);
        // ensure it's valid json by eliminating single quotes and comments
        fileData = fileData
          .replace(/\/\/.*/g, '')
          .replace(/\/\*.*\*\//g, '')
          .replace(/'/g, '"');
        // wrap the keys in double quotes
        fileData = fileData.replace(/(\w+):/g, '"$1":');
        // remove trailing commas
        fileData = fileData.replace(/,(\s*})/g, '$1');
      }
      // parse the JSON object
      fileData = JSON.parse(fileData);

      // Use the directory name as part of the output filename to avoid conflicts
      const dirName = inputDir.split('/').filter(Boolean).pop() || 'default';
      const csvFilePath = `${outputDir}/${dirName}_${file.replace(/\.\w+$/, '')}.csv`;

      const existingCsvMap = loadExistingCsv(csvFilePath);
      // generate the CSV content
      const csvContent = parseOrUpdateVoiceoverData(fileData, existingCsvMap);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      // write the CSV content to the file
      fs.writeFileSync(csvFilePath, csvContent);
    }
  }
}
