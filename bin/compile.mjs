// Require modules
import fs from "fs";
import pkg from "uuid-1345";
import { exec } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { zip } from "zip-a-folder";
import chalk from "chalk";

const { v4: uuidv4 } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const logs = {
  /**
   * Logs a warning message.
   *
   * @param {...*} args - The message(s) to be logged.
   * @return {Array} - The updated logs array.
   */
  warn: (...args) => {
    console.log(chalk.yellow("WARN: "), ...args);
    return logs;
  },
  /**
   * Logs debug information.
   *
   * @param {...*} args - The arguments to be logged.
   * @return {*} - The logs.
   */
  debug: (...args) => {
    console.log(chalk.blue("DEBUG: "), ...args);
    return logs;
  },
  /**
   * Logs the given information to the console as an info message.
   *
   * @param {...*} args - The information to be logged.
   * @return {Array} logs - The array of logs.
   */
  info: (...args) => {
    console.log(chalk.cyan("INFO: "), ...args);
    return logs;
  },
  /**
   * Log an error message and return the logs.
   *
   * @param {...any} args - The error message to log.
   * @return {Array} - The logs.
   */
  error: (...args) => {
    console.error(chalk.red("ERROR: "), ...args);
    return logs;
  },
  /**
   * Logs a success message to the console and returns logs.
   *
   * @param {...*} args - The arguments to be logged.
   * @return {*} logs - The returned logs.
   */
  success: (...args) => {
    console.log(chalk.green("SUCCESS: "), ...args);
    return logs;
  },
  /**
   * Adds a spacer to the console.
   *
   * @return {*} logs - The returned logs.
   */
  spacer: () => {
    console.log("");
    return logs;
  },
};

/**
 * Sets a timeout for the specified number of seconds.
 *
 * @param {number} seconds - The number of seconds to wait before resolving the promise.
 * @return {Promise} A promise that resolves after the specified number of seconds.
 */
async function timeout(seconds) {
  const ms = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deletes all files in a directory recursively.
 *
 * @param {string} directory - The path to the directory.
 * @return {Promise<void>} A promise that resolves when all files are deleted.
 */
async function deleteFilesInDirectory(directory) {
  /**
   * Deletes a file at the given file path.
   *
   * @param {string} filePath - The path of the file to be deleted.
   * @return {Promise<void>} A promise that resolves when the file is deleted successfully.
   */
  const deleteFile = async (filePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, async (err) => {
        if (err) {
          logs.error("Error deleting file:", err);
          reject(err);
        } else {
          logs.success(
            "File deleted successfully:",
            filePath.replace(__dirname, "")
          );
          await timeout(0.5);
          resolve();
        }
      });
    });
  };

  /**
   * Recursively deletes files in a given directory.
   *
   * @param {string} directory - The directory to delete files from.
   * @return {Promise} A promise that resolves when all files have been deleted.
   */
  const deleteFilesRecursive = async (directory) => {
    return new Promise((resolve, reject) => {
      fs.readdir(directory, async (err, files) => {
        if (err) {
          logs.error("Error reading directory:", err);
          reject(err);
          return;
        } else {
          await timeout(1.5);
          logs.spacer().info(
            "Deleting files in directory:",
            directory.replace(__dirname, ""),
          );
        }

        for (const file of files) {
          const filePath = path.join(directory, file);
          if (fs.statSync(filePath).isDirectory()) {
            await deleteFilesRecursive(filePath);
          } else {
            await deleteFile(filePath);
          }
        }

        resolve();
      });
    });
  };

  await deleteFilesRecursive(directory);
}

/**
 * Updates the UUIDs in the manifest file.
 *
 * @param {string} manifestFilePath - The path to the manifest file.
 * @param {string} targetPath - The path where the updated manifest file will be written.
 * @return {Promise<void>} A promise that resolves when the UUIDs are updated successfully.
 */
async function updateUUIDsInManifest(manifestFilePath, targetPath) {
  return new Promise(async (resolve, reject) => {
    try {
      await timeout(0.5);
      logs.warn("Updating UUIDs in:", manifestFilePath.replace(__dirname, ""));
      // Read the manifest file
      const manifestData = JSON.parse(
        fs.readFileSync(manifestFilePath, "utf8")
      );

      // Update the UUIDs
      manifestData.header.uuid = uuidv4();
      manifestData.modules[0].uuid = uuidv4();

      // Write the updated manifest file
      await timeout(0.5);
      logs.spacer().info("Writing updated manifest file to:", targetPath);
      fs.writeFileSync(targetPath, JSON.stringify(manifestData, null, 2));

      await timeout(0.5);
      logs.success("UUIDs updated successfully in the manifest file.");
      resolve();
    } catch (err) {
      logs.error("Failed to update UUIDs", err);
      logs.warn(
        "Failed to update UUIDs in the Manifest file:",
        manifestFilePath.replace(__dirname, "") +
          " You must update the UUIDs manually."
      );
      reject(err);
    }
  });
}

/**
 * Runs the TypeScript compiler asynchronously.
 *
 * @return {Promise} A promise that resolves when the compiler has finished running.
 */
async function runTSC() {
  return new Promise(async (resolve, reject) => {
    logs.spacer().info("Compiling TypeScript files...");
    await timeout(0.5);
    logs.debug("Executing tsc");
    exec("tsc", async (error, stdout, stderr) => {
      if (error) {
        logs.error("Error running tsc:", error);
        reject(error);
        return;
      }
      await timeout(0.5);
      logs.success("All Typescript files compiled successfully." + stdout);
      resolve();
    });
  });
}

async function buildMcpack(directory) {
  return new Promise(async (resolve, reject) => {
     try {
      logs.spacer().info("Building .McPack...", "Building...");
    await timeout(0.5);
    zip(directory, __dirname.replace("\\bin", "") + "/build/core.mcpack", {

    })
    
    await timeout(0.5);
    logs.success("Build complete.");
    resolve();
    } catch (err) {
      logs.error("Error building .McPack:", err);
      reject(err);
    }
  })
}

/**
 * Executes a series of asynchronous tasks.
 *
 * @return {Promise} A promise that resolves when all tasks have completed.
 */
async function main() {
  try {
    logs.info("Running...", "Running...");
    logs.warn("This process could take a while. Please be patient.", "\n");
    await deleteFilesInDirectory(__dirname + "/output/");
    await updateUUIDsInManifest(
      __dirname + "/templates/manifest.json",
      __dirname + "/output/manifest.json"
    );
    await runTSC();
    await buildMcpack(__dirname + "/output/");
  } catch (err) {
    logs.error("Error:", err);
  }
}

main();
