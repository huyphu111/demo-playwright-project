import * as fs from 'fs/promises';
import * as path from 'path';

export class JsonUtils {
    /**
     * Reads and parses a JSON file.
     * @param filePath Relative path to the JSON file (relative to the project root or this file).
     * @returns Parsed JSON object or throws an error if reading/parsing fails.
     */
    private static _data = {};

    static async readJsonFile<T>(filePath: string): Promise<T> {
        try {
            if (this._data?.[filePath] == null) {
                // Resolve relative to the current file's directory
                const absolutePath = path.resolve(__dirname, filePath);
                const jsonData = await fs.readFile(absolutePath, 'utf-8');
                this._data[filePath] = JSON.parse(jsonData) as T;
            }
            return this._data[filePath] as T;
        } catch (error) {
            throw new Error(`Failed to read or parse JSON file at ${filePath}: ${(error as Error).message}`);
        }
    }
}