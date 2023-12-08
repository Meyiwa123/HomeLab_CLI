# HomeLab CLI

<img src="img/sample_welcome.png"
     alt="Sample Welcome"

HomeLab CLI is a command-line interface (CLI) tool for managing and monitoring your home lab environment. It provides convenient commands for interacting with Proxmox and Portainer features.

## Table of Contents
* Installation
* Usage
    * Welcome Message and Dashboard
    * Proxmox Commands
    * Portainer Commands
* Contributing
* License

## Installation
Ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/your-username/homelab-cli.git
    ```
2. Navigate to the project directory:
    ```
    cd homelab-cli
    ```
3. Install dependencies:
    ```
    npm install
    ```

## Usage
### Welcome Message and Dashboard
* Display the welcome message and HomeLab dashboard:
    ```
    ./bin/homelab.js welcome
    ```

### Proxmox Commands

* Perform a health check on a specified node:
    ```
    ./bin/homelab.js proxmox health <node>
    ```
* List all nodes:
    ```
    ./bin/homelab.js proxmox nodes
    ```
* List all containers on a specified node:
    ```
    ./bin/homelab.js proxmox containers <node>
    ```

### Portainer Commands
* List all Portainer containers:
    ```
    ./bin/homelab.js portainer containers <environmentId>
    ```
* Create a Portainer container:
    ```
    ./bin/homelab.js portainer create <environmentId> <containerName> <image> <hostPort>
    ```
* Start a Portainer container:
    ```
    ./bin/homelab.js portainer start <environmentId> <containerId>
    ```
* Delete a Portainer container:
    ```
    ./bin/homelab.js portainer delete <environmentId> <containerId>
    ```
## Contributing
Contributions are welcome! Fork the project, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.