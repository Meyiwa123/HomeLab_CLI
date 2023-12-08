// configure-proxmox.js

// Import necessary modules and libraries
import inquirer from 'inquirer';
import { readConfig, writeConfig } from '../config.js';

// Function to configure Proxmox if not present in the config
export async function configureProxmox() {
  // Prompt user for Proxmox details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter Proxmox username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter Proxmox password:',
      mask: '*',
    },
    {
      type: 'input',
      name: 'host',
      message: 'Enter Proxmox host (e.g., "https://your-proxmox-host.com"):',
    },
  ]);

  // Update the configuration and save it
  const config = readConfig() || {};
  config.proxmox = answers;
  writeConfig(config);
}