#!/usr/bin/env node

// bin/homelab.js

// Import Homelabinitialize function
import { displayWelcomeMessage, initializeHomelab } from '../lib/init.js';

// Import the new commands
import { program } from 'commander';
import { displayDashboard } from '../lib/commands/dashboard.js';
import { listNodes, healthCheck, listContainers } from '../lib/commands/proxmox-features.js';
import { listPortainerContainers, createPortainerContainer, startPortainerContainer, deletePortainerContainer } from '../lib/commands/portainer-features.js';

initializeHomelab();

// Proxmox commands
program
  .command('welcome')
  .description('Display the Welcome message and Homelab Dashboard')
  .action(() => {
    displayWelcomeMessage();
    displayDashboard();
  });

program
  .command('proxmox health <node>')
  .description('Perform a health check on a specified node')
  .action((node) => healthCheck(node));

program
  .command('proxmox containers <node>')
  .description('List all nodes')
  .action(listNodes());

program
  .command('proxmox containers <node>')
  .description('List all containers on a specified node')
  .action((node) => listContainers(node));


// Portainer commands
program
  .command('portainer containers <environmentId>')
  .description('List all Portainer containers')
  .action((environmentId) => listPortainerContainers(environmentId));

program
  .command('portainer create <environmentId> <containerName> <image> <hostPort>')
  .description('Create a Portainer container')
  .action((environmentId, containerName, image, hostPort) => createPortainerContainer(environmentId, containerName, image, hostPort));

program
  .command('portainer start <environmentId> <containerId>')
  .description('Start a Portainer container')
  .action((environmentId, containerId) => startPortainerContainer(environmentId, containerId));

program
  .command('portainer delete <environmentId> <containerId>')
  .description('Delete a Portainer container')
  .action((environmentId, containerId) => deletePortainerContainer(environmentId, containerId));


// Parse command-line arguments
program.parse(process.argv);