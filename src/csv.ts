import csvParser from "csv-parser";
import fs from "fs";

export interface CSVRow {
  [key: string]: string;
}

export async function parseCSV(filePath: string): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const results: CSVRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser({
        // Ensures the column headers are not wrapped in quotes
        mapHeaders: ({ header }: { header: string }) => header.trim().replace(/^"|"$/g, '')
      }))
      .on("data", (row: CSVRow) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}