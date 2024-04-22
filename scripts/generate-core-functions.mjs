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

// Function to find class members with the @CoreFunction decorator
function findMembersWithDecorator(classDeclaration, decoratorName) {
  return classDeclaration.members.filter(member => ts.isMethodDeclaration(member)).filter(member => {
    const decorators = ts.getDecorators(member);
    return decorators?.some(decorator => {
      return getDecoratorName(decorator) === decoratorName;
    });
  });
}

// Generate the TypeScript declaration file
function generateDeclarationFile(functions) {
  let content = 'export interface ICoreFunctions {\n';
  functions.forEach(func => {
    content += `    ${func.signature};\n`;
  });
  content += '}\n';

  const filePath = path.resolve(__dirname, '../src/core/CoreFunctions.d.ts');
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
let coreFunctions = [];

tsFiles.forEach(fileName => {
  const program = ts.createProgram([fileName], {});
  const sourceFile = program.getSourceFile(fileName);

  if (sourceFile) {
    const coreModuleClass = findClassWithDecorator(sourceFile, 'CoreModule');
    if (coreModuleClass) {
      const members = findMembersWithDecorator(coreModuleClass, 'CoreFunction');
      members.forEach(member => {
        // push only the functions signature, not the function body, to the coreFunctions array,
        // we want to generate an interface, not the full function
        coreFunctions.push({
          signature: methodToSignature(member, sourceFile),
        });
      });
    }
  }
});

generateDeclarationFile(coreFunctions);
