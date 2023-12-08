// Import necessary modules and libraries
import crypto from 'crypto';
import inquirer from 'inquirer';
import { writeConfig } from '../config.js';

// Prompt user to set master password
export async function configureMasterPassword() {
    let masterPassword;

    // Prompt user for master password
    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'password',
                name: 'masterPassword',
                message: 'Set your master password:',
                mask: '*',
            },
            {
                type: 'password',
                name: 'confirmMasterPassword',
                message: 'Confirm your master password:',
                mask: '*',
            },
        ]);

        masterPassword = answers.masterPassword;
        const confirmMasterPassword = answers.confirmMasterPassword;

        // Check if passwords match to exit loop
        if (masterPassword === confirmMasterPassword) {
            break;
        } else {
            console.log(masterPassword, confirmMasterPassword);
            console.log('Passwords do not match. Please try again.');
        }
    }

    // Generate salt and hash the master password
    const salt = generateSalt();
    const hashedMasterPassword = hashPassword(masterPassword, salt);

    // Update the configuration and save it
    const config = {
        masterPassword: hashedMasterPassword,
        salt: salt,
    };
    writeConfig(config);
}

// Function to generate a unique salt
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

// Function to hash a password with salt
function hashPassword(password, salt) {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashedPassword;
}
