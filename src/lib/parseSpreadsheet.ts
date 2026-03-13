import * as XLSX from 'xlsx';

export interface ParsedSpreadsheet {
  headers: string[];
  rows: Record<string, any>[];
}

export interface ParsedSheet {
  name: string;
  headers: string[];
  rows: Record<string, any>[];
}

export interface ParsedWorkbook {
  sheets: ParsedSheet[];
}

/**
 * Finds the first row in a sheet that looks like a header row —
 * i.e. the first row with >= 2 non-empty string cells.
 * SharePoint exports often have metadata rows above the actual headers.
 */
function findHeaderRow(sheet: XLSX.WorkSheet): number {
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
  for (let r = range.s.r; r <= Math.min(range.e.r, 10); r++) {
    let nonEmptyStrings = 0;
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ r, c })];
      if (cell && cell.t === 's' && String(cell.v).trim()) nonEmptyStrings++;
    }
    if (nonEmptyStrings >= 2) return r;
  }
  return 0; // fallback to first row
}

export function parseSpreadsheet(file: File): Promise<ParsedSpreadsheet> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        // Use first non-empty sheet
        let sheet: XLSX.WorkSheet | null = null;
        for (const name of workbook.SheetNames) {
          const s = workbook.Sheets[name];
          if (s['!ref'] && s['!ref'] !== 'A1:A1') { sheet = s; break; }
        }
        if (!sheet) { resolve({ headers: [], rows: [] }); return; }

        const headerRow = findHeaderRow(sheet);
        const range = XLSX.utils.decode_range(sheet['!ref']!);

        // Slice sheet to start from header row
        const slicedSheet = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
          defval: '',
          range: { s: { r: headerRow, c: range.s.c }, e: range.e },
        });

        const headers = slicedSheet.length > 0 ? Object.keys(slicedSheet[0]) : [];
        resolve({ headers, rows: slicedSheet });
      } catch (err) {
        reject(new Error('Failed to parse file. Supported formats: xlsx, xls, xlsm, xlsb, ods, csv, tsv, txt.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}

export function parseWorkbook(file: File): Promise<ParsedWorkbook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const sheets: ParsedSheet[] = workbook.SheetNames.map(name => {
          const sheet = workbook.Sheets[name];
          const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: '' });
          const headers = json.length > 0 ? Object.keys(json[0]) : [];
          return { name, headers, rows: json };
        }).filter(s => s.rows.length > 0);
        resolve({ sheets });
      } catch (err) {
        reject(new Error('Failed to parse workbook. Please check the file format.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}
