import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Recursively read all TypeScript files in a directory
function readTypescriptFiles(dirPath) {
  let files = [];
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(readTypescriptFiles(fullPath));
    } else if (fullPath.endsWith('.ts')) {
      files.push(fullPath);
    }
  });
  return files;
}

function getDecoratorName(decorator) {
  if (decorator.expression && ts.isIdentifier(decorator.expression)) {
    return decorator.expression.text;
  }
}

// Function to find the class with the @CoreModule decorator
function findClassWithDecorator(sourceFile, decoratorName) {
  let found = false;

  function visit(node) {
    const decorators = ts.getDecorators(node);
    if (ts.isClassDeclaration(node) && decorators) {
      const hasDecorator = !found && decorators.some(decorator => {
        return getDecoratorName(decorator) === decoratorName;
      });
      if (hasDecorator) {
        found = true;
        return node;
      }
    }
    return ts.forEachChild(node, visit);
  };
  return visit(sourceFile);
}

function getTypeInfo(node, checker) {
  const type = checker.getTypeAtLocation(node);
  return {
    name: node?.name?.text,
    type: checker.typeToString(type, node),
  };
  return { name: 'unknown', properties: [] };
}

// Function to find class members with the @CoreFunction decorator
function findSignalMembers(classDeclaration, checker) {
  return classDeclaration.members.filter(member => ts.isPropertyDeclaration(member)).map(member => {
    const typeInfo = getTypeInfo(member, checker);
    return typeInfo?.type?.indexOf('Signal') === 0 ? typeInfo : null;
  }).filter(Boolean);
}

// Generate the TypeScript declaration file
function generateDeclarationFile(signals) {
  let content = 'export interface ICoreSignals {\n';
  signals.forEach(signalMember => {
    content += `    ${signalMember.signature};\n`;
  });
  content += '}\n';

  const filePath = path.resolve(__dirname, '../src/core/CoreSignals.d.ts');
  fs.writeFileSync(filePath, content);
}

// Convert a method declaration to a method signature
function methodToSignature(method, sourceFile) {
  const printer = ts.createPrinter();
  const parameters = method.parameters.map(param => printer.printNode(ts.EmitHint.Unspecified, param, sourceFile)).join(', ');
  const returnType = method.type ? `: ${printer.printNode(ts.EmitHint.Unspecified, method.type, sourceFile)}` : '';
  return `${method.name.getText(sourceFile)}(${parameters})${returnType}`;
}


// Example usage
const directoryPath = path.resolve(__dirname, '../src/modules');
const tsFiles = readTypescriptFiles(directoryPath);
let coreSignals = [];

tsFiles.forEach(fileName => {
  const program = ts.createProgram([fileName], { target: ts.ScriptTarget.ESNext, experimentalDecorators: true });
  const sourceFile = program.getSourceFile(fileName);
  const checker = program.getTypeChecker();

  if (sourceFile) {
    const coreModuleClass = findClassWithDecorator(sourceFile, 'CoreModule');
    if (coreModuleClass) {

      const members = findSignalMembers(coreModuleClass, checker);
      if (!members?.length) {
        return;
      }
      coreSignals.push({
        signature: `// ${path.basename(fileName).replace('.ts', '')}`,
      });
      members.forEach(member => {
        // push only the functions signature, not the function body, to the coreFunctions array,
        // we want to generate an interface, not the full function
        // generate name
        let signalName = member.name.toString();
        // remove "on" prefix and lowercase first letter
        // signalName = signalName.charAt(2).toLowerCase() + signalName.slice(3);
        coreSignals.push({
          signature: `${signalName}: ${member.type.trim()}`,
        });
      });
    }
  }
});

generateDeclarationFile(coreSignals);
