export interface Formula {
  formula_id: number;
  name: string;
  description?: string | null;
  standard_batch?: number | null; // DECIMAL se maneja como number
  unit?: string | null;           // CHAR(1) es un string en TS
  production_time?: number | null;
  gallon_type?: string | null;    // CHAR(1) es un string en TS
  gallon_quantity?: number | null;
  estado: boolean;                // BIT mapea excelente a boolean
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
  deleted_at?: string | Date | null;
  restored_at?: string | Date | null;
}

export type FormulaCreate = Omit<Formula, 'formula_id' | 'created_at' | 'updated_at' | 'deleted_at' | 'restored_at'>;
export type FormulaUpdate = Partial<Omit<Formula, 'formula_id' | 'created_at' | 'updated_at' | 'deleted_at' | 'restored_at'>>;
