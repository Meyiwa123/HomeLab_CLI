// proxmox-features.js

// Import necessary modules and libraries
import Proxmox from 'proxmox';

// Function to perform Proxmox features
export async function InitializeProxmox() {
  // Read Proxmox configuration from the config file
  const config = readConfig() || {};
  const proxmoxConfig = config.proxmox;

  // Check if Proxmox configuration is present
  if (!proxmoxConfig || !proxmoxConfig.username || !proxmoxConfig.password || !proxmoxConfig.host) {
    console.log('Proxmox details not configured or corrupted. Please configure Proxmox:');
    await configureProxmox();
  }

  // Initialize Proxmox API client
  return new Proxmox(proxmoxConfig);
}

// Function to list all containers on a specified node
export async function listNodes() {
  // const proxmox = InitializeProxmox();
  // try {
  //   // List all nodes
  //   const nodes = await proxmox.getNodes();
  //   console.log('Proxmox Nodes:', nodes);
  // } catch (error) {
  //   console.error(`Failed to list Proxmox nodes: ${error.message}`);
  // }
  return
}

// Function to perform a health check on a specified node
export async function healthCheck(node) {
  const proxmox = InitializeProxmox();
  try {
    // Perform a health check on the specified node
    const healthCheck = await proxmox.getNodeServiceState(node, 'pveproxy');
    console.log(`Proxmox Health Check on ${node}:`, healthCheck);
  } catch (error) {
    console.error(`Health check failed: ${error.message}`);
  }
}

// Function to list all containers on a specified node
export async function listContainers(node) {
  const proxmox = InitializeProxmox();
  try {
    // List all containers on the specified node
    const containers = await proxmox.getQemu(node);
    console.log(`Containers on ${node}:`, containers);
  } catch (error) {
    console.error(`Failed to list containers: ${error.message}`);
  }
}
