import express, { Application } from "express";
import path from "path";
import { parseCSV } from "./csv";
import { histogramRouter } from "./routes/histogram";

export interface CSVRow {
  [key: string]: string;
}

// Optionally, allow overriding CSV path for flexibility/testing
const DEFAULT_CSV_PATH = path.join(__dirname, "../Projection2021.csv");

export async function createApp(csvPath = DEFAULT_CSV_PATH): Promise<Application> {
  // Parse and load custom CSV data
  const dataRows = await parseCSV(csvPath);
  const app = express();

  app.use(express.json());
  app.use("/", histogramRouter(dataRows));

  return app;
}
