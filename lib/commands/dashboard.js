// lib/commands/dashboard.js

import inquirer from 'inquirer';
import { configureProxmox } from './configure-proxmox.js'; 
import { configurePortainer } from './configure-portainer.js';
import { configureMasterPassword } from './password-manager.js';

export const displayDashboard = async () => {
  const choices = [
    { name: 'Configure Proxmox', value: 'configureProxmox' },
    { name: 'Configure Portainer', value: 'configurePortainer' },
    { name: 'Change Master Password', value: 'changeMasterPassword' },
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Select an option:',
      choices,
    },
  ]);

  switch (answers.selectedOption) {
    case 'configureProxmox':
      configureProxmox();
      break;
    case 'configurePortainer':
      configurePortainer();
      break;
    case 'changeMasterPassword':
      configureMasterPassword();
      break;
    default:
        console.log('Invalid option selected.');
        break;
  }
};
