export interface Field {
  key: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
}
export interface Tool {
  slug: string;
  title: string;
  category: string;
  description: string;
  fields: Field[];
  formula: string;
  assumptions: string;
  example: string;
}
export const money = (key: string, label: string, value: number): Field => ({
  key,
  label,
  value,
  min: 0,
  max: 1e12,
  step: 0.1,
});
export const percent = (key: string, label: string, value: number): Field => ({
  key,
  label,
  value,
  min: 0,
  max: 100,
  step: 0.1,
});
export const duration = (key: string, label: string, value: number): Field => ({
  key,
  label,
  value,
  min: 1,
  max: 100,
  step: 1,
});
