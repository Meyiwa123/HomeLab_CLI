// config.js

// Import necessary modules and libraries
import fs from 'fs';

// Path to the configuration file
const CONFIG_FILE_PATH = './config/homelab_config.json';

// Function to read the configuration from the file
export function readConfig() {
  try {
    const configFileContents = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
    return JSON.parse(configFileContents);
  } catch (error) {
    console.error(`Error reading configuration: ${error.message}`);
    return null;
  }
}

// Function to write the configuration to the file
export function writeConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
    console.log('Configuration updated successfully.');
  } catch (error) {
    console.error(`Error writing configuration: ${error.message}`);
  }
}
