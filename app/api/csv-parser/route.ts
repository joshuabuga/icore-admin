import csv from 'csv-parser';


export async function POST(req: Request) {
  // Handle CSV upload and extraction of data
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any[] = [];
  const buffer = Buffer.from(await file.arrayBuffer());
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const stream = require('stream');
  const readable = new stream.Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);

  await new Promise<void>((resolve, reject) => {
    interface CsvRow {
      [key: string]: string;
    }

    interface CsvParserStream extends NodeJS.ReadableStream {
      pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T;
      on(event: 'data', listener: (data: CsvRow) => void): this;
      on(event: 'end', listener: () => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
    }

    (readable as CsvParserStream)
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', reject);
  });

  // Extract relevant data from results
  const extractedData = results.map(row => {
    return {
      name: row['name'],
      phoneNumber: row['phoneNumber'],
      amount: row['amount'],
    };
  });

  return new Response(JSON.stringify(extractedData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}