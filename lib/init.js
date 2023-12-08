// init.js

// Import necessary modules and libraries
import figlet from 'figlet';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { readConfig } from './config.js';
import { configureProxmox } from './commands/configure-proxmox.js';
import { configurePortainer } from './commands/configure-portainer.js';
import { configureMasterPassword } from './commands/password-manager.js';

// Function to initialize the CLI with a master password and salt
export async function initializeHomelab() {
  displayWelcomeMessage();

  // Read existing configuration
  const config = readConfig() || {};

  // Check if master password is already set
  if (config.masterPassword) {
    console.log('CLI is already initialized.');
    return;
  }

  configureMasterPassword();

  // Ask to configure Proxmox
  const { checkConfigureProxmox } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'configureProxmox',
      message: 'Do you want to configure Proxmox now?',
      default: "Y",
    },
  ]);
  if (checkConfigureProxmox.tolowerCase() === "y" || checkConfigureProxmox.tolowerCase() === "yes") {
    configureProxmox();
  }

  // Ask to configure Portainer
  const { checkConfigurePortainer } = await inquirer.inquirer.prompt([
    {
      type: 'confirm',
      name: 'configurePortainer',
      message: 'Do you want to configure Portainer now?',
      default: "Y",
    },
  ]);
  if (checkConfigurePortainer.tolowerCase() === "y" || checkConfigurePortainer.tolowerCase() === "yes") {
    configurePortainer();
  }
}

export function displayWelcomeMessage() {
  console.clear();
  const msg = `Welcome to the Homelab CLI!`;
  const data = figlet.textSync(msg, {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });
  console.log(gradient.pastel.multiline(data));
}