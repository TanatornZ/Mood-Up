import { Key } from "react";

export interface ChartType {
  id: Key | null | undefined;
  emotion: number;
  count: number;
  color: string;
}
