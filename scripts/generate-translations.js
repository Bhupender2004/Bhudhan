#!/usr/bin/env node

/**
 * BhuDhan Translation Generator CLI
 * 
 * This script provides a command-line interface for generating translations
 * for the BhuDhan application.
 * 
 * Usage:
 *   node scripts/generate-translations.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if Python is installed
function checkPythonInstalled() {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['--version']);
    
    pythonProcess.on('error', (error) => {
      reject(new Error('Python is not installed or not in PATH'));
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        reject(new Error('Python is not installed or not in PATH'));
      }
    });
  });
}

// Check if required Python packages are installed
function checkRequiredPackages() {
  return new Promise((resolve, reject) => {
    const packages = ['torch', 'transformers', 'sentencepiece', 'sacremoses'];
    const pythonProcess = spawn('python', ['-c', `import sys; packages = ${JSON.stringify(packages)}; missing = [p for p in packages if p not in sys.modules and __import__(p, fromlist=['']) is None]; print(','.join(missing) if missing else '')`]);
    
    let output = '';
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    pythonProcess.on('error', (error) => {
      reject(new Error('Failed to check required packages'));
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        const missingPackages = output.trim().split(',').filter(Boolean);
        if (missingPackages.length > 0) {
          reject(new Error(`Missing required Python packages: ${missingPackages.join(', ')}`));
        } else {
          resolve(true);
        }
      } else {
        reject(new Error('Failed to check required packages'));
      }
    });
  });
}

// Install required Python packages
function installRequiredPackages() {
  return new Promise((resolve, reject) => {
    console.log('Installing required Python packages...');
    
    const packages = ['torch', 'transformers', 'sentencepiece', 'sacremoses'];
    const pythonProcess = spawn('pip', ['install', ...packages]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to install required packages: ${error.message}`));
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Required packages installed successfully');
        resolve(true);
      } else {
        reject(new Error('Failed to install required packages'));
      }
    });
  });
}

// Generate translations
function generateTranslations() {
  return new Promise((resolve, reject) => {
    console.log('Generating translations...');
    
    // Path to the Python script
    const scriptPath = path.join(__dirname, 'generate_translations.py');
    
    // Input and output paths
    const inputPath = path.join(__dirname, '..', 'translations', 'en.json');
    const outputPath = path.join(__dirname, '..', 'translations');
    
    // Ensure the translations directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    // Spawn Python process
    const pythonProcess = spawn('python', [
      scriptPath,
      '--input', inputPath,
      '--output', outputPath
    ]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to generate translations: ${error.message}`));
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Translations generated successfully');
        resolve(true);
      } else {
        reject(new Error('Failed to generate translations'));
      }
    });
  });
}

// Main function
async function main() {
  try {
    // Check if Python is installed
    await checkPythonInstalled();
    console.log('Python is installed');
    
    try {
      // Check if required packages are installed
      await checkRequiredPackages();
      console.log('All required Python packages are installed');
    } catch (error) {
      console.error(error.message);
      
      // Install required packages
      await installRequiredPackages();
    }
    
    // Generate translations
    await generateTranslations();
    
    console.log('Translation generation completed successfully');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
