import csvParser from "csv-parser";
import { Request, Response, Router } from "express";
import fs from "fs";

interface CSVRow {
  [key: string]: string;
}

type Histogram = Record<string, number>;

export function histogramRouter(csvPath: string): Router {
  const router = Router();

  router.get("/:column/histogram", async (req: Request, res: Response) => {
    const { column } = req.params;

    const histogram = await processCSV(column, csvPath);

    res.json({ column, histogram });
  });

  return router;
}

export function processCSV(column: string, csvPath: string): Promise<Record<string, number>> {
  return new Promise((resolve, reject) => {
    const histogramStats: Histogram = {};

    fs.createReadStream(csvPath)
      .pipe(csvParser({
        mapHeaders: ({ header }) => header.trim().replace(/^"|"$/g, "")
      }))
      .on("data", (row: CSVRow) => {
        const key = row[column]?.trim();
        if (key) {
          // if histogramStats[key] is already set, use it's value then add 1, else start at 0
          histogramStats[key] = (histogramStats[key] || 0) + 1;
        }
      })
      .on("end", () => resolve(histogramStats))
      .on("error", (err) => reject(err));

    return histogramStats;
  });
}