import { Request, Response, Router } from "express";

interface CSVRow {
  [key: string]: string;
}

type Histogram = Record<string, number>;

export function histogramRouter(dataRows: CSVRow[]): Router {
  const router = Router();
  const cache: Record<string, Histogram> = {};

  router.get("/:column/histogram", (req: Request, res: Response) => {
    const { column } = req.params;

    if (!dataRows.length) {
      res.status(500).json({ error: "CSV data not loaded" });
    }

    if (!dataRows[0][column]) {
      res.status(404).json({ error: `Column "${column}" not found.` });
    }

    if (!cache[column]) {
      cache[column] = buildHistogram(column, dataRows);
    }

    res.json({ column, histogram: cache[column] });
  });

  return router;
}

function buildHistogram(column: string, data: CSVRow[]): Histogram {
  const histogram = data.reduce<Histogram>((acc, row) => {
    const value = row[column];
    if (value !== undefined) {
      acc[value] = (acc[value] || 0) + 1;
    }
    return acc;
  }, {});

  return histogram;
}