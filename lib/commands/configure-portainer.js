// configure-portainer.js

import { writeConfig } from '../config.js';

// Function to configure Portainer details
export async function configurePortainer() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter Portainer URL:',
    },
    {
      type: 'input',
      name: 'adminUsername',
      message: 'Enter Portainer admin username:',
    },
    {
      type: 'password',
      name: 'adminPassword',
      message: 'Enter Portainer admin password:',
      mask: '*',
    },
  ]);

  writeConfig({ portainer: answers });
  console.log('Portainer configured successfully.');
}
