// portainer-features.js

import axios from 'axios';
import { readConfig, writeConfig } from '../config.js';

// Function to authenticate against the Portainer API using the admin account
export async function authenticateAdmin() {
  const config = readConfig() || {};
  const portainerConfig = config.portainer;

  if (!portainerConfig || !portainerConfig.url || !portainerConfig.adminUsername || !portainerConfig.adminPassword) {
    console.log('Portainer details not configured. Please configure Portainer first.');
    return;
  }

  const apiUrl = `${portainerConfig.url}/api/auth`;
  const payload = {
    Username: portainerConfig.adminUsername,
    Password: portainerConfig.adminPassword,
  };

  try {
    const response = await axios.post(apiUrl, payload);
    const apiKey = response.data.jwt;
    console.log('Authentication successful. JWT Token:', apiKey);

    // Save the API key in the config file
    portainerConfig.apiKey = apiKey;
    writeConfig(config);

    return apiKey;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    return null;
  }
}

// Function to perform a generic HTTP request to Portainer API
async function portainerRequest(method, path, body = {}) {
  const config = readConfig() || {};
  const portainerConfig = config.portainer;

  if (!portainerConfig || !portainerConfig.url) {
    console.log('Portainer details not configured. Please configure Portainer first.');
    return;
  }

  // Check if API key is present, otherwise authenticate
  let apiKey = portainerConfig.apiKey;
  if (!apiKey) {
    apiKey = await authenticateAdmin();
    if (!apiKey) {
      console.log('Failed to authenticate with Portainer. API key not available.');
      return;
    }
  }

  const apiUrl = `${portainerConfig.url}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  };

  try {
    const response = await axios({
      method: method,
      url: apiUrl,
      headers: headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('Error performing Portainer API request:', error.message);
  }
}

// Function to list all containers
export async function listPortainerContainers(environmentId) {
  const path = `/api/endpoints/${environmentId}/docker/containers/json?all=true`;
  return await portainerRequest('GET', path);
}

// Function to create a container
export async function createPortainerContainer(environmentId, name, image, hostPort) {
  const path = `/api/endpoints/${environmentId}/docker/containers/create`;
  const body = {
    name: name,
    Image: image,
    ExposedPorts: { '80/tcp': {} },
    HostConfig: { PortBindings: { '80/tcp': [{ HostPort: hostPort }] } },
  };

  return await portainerRequest('POST', path, body);
}

// Function to start a container
export async function startPortainerContainer(environmentId, containerId) {
  const path = `/api/endpoints/${environmentId}/docker/containers/${containerId}/start`;
  return await portainerRequest('POST', path);
}

// Function to delete a container
export async function deletePortainerContainer(environmentId, containerId) {
  const path = `/api/endpoints/${environmentId}/docker/containers/${containerId}?force=true`;
  return await portainerRequest('DELETE', path);
}
