import { useEffect, useState } from "react";
import Select from "./Select";
export default function YearFilter() {
  const [year, setYear] = useState("");
  useEffect(() => {
    const reset = () => setYear("");
    document.addEventListener("directory:reset", reset);
    return () => document.removeEventListener("directory:reset", reset);
  }, []);
  return (
    <Select
      label="Year"
      name="transaction-year"
      value={year}
      options={[
        { value: "", label: "All years" },
        { value: "2026", label: "2026" },
        { value: "2025", label: "2025" },
      ]}
      onValueChange={(value) => {
        setYear(value);
        document.dispatchEvent(
          new CustomEvent("directory:category", { detail: value }),
        );
      }}
    />
  );
}
