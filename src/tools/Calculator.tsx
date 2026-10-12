import { useState } from "react";
import type { Tool } from "./catalog";
import { calculate, formatValue, type Result } from "./calculate";
export default function Calculator({ tool }: { tool: Tool }) {
  const defaults = Object.fromEntries(
    tool.fields.map((field) => [field.key, String(field.value)]),
  );
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [message, setMessage] = useState("");
  let result: Result | null = null;
  let error = "";
  try {
    result = calculate(
      tool.slug,
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          value.trim() === "" ? NaN : Number(value),
        ]),
      ),
    );
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Check your inputs.";
  }
  function download() {
    if (!result) return;
    const lines = [
      tool.title,
      ...tool.fields.map((field) => `${field.label}: ${values[field.key]}`),
      "",
      `${result.label}: ${formatValue(result.value, result.unit)}`,
      ...result.rows.map(
        (row) => `${row.label}: ${formatValue(row.value, row.unit)}`,
      ),
      "",
      `Formula: ${tool.formula}`,
      `Assumptions: ${tool.assumptions}`,
      "Illustrative scenario only. Not a valuation or a recommendation.",
    ];
    const url = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/plain" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `jea-${tool.slug}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Scenario downloaded.");
  }
  return (
    <>
      <div className="tool-workspace">
        <div className="tool-inputs">
          <p className="eyebrow">YOUR SCENARIO</p>
          {tool.fields.map((field) => (
            <label key={field.key}>
              {field.label}
              <input
                type="number"
                inputMode="decimal"
                min={field.min}
                max={field.max}
                step={field.step ?? "any"}
                value={values[field.key]}
                onChange={(event) => {
                  setValues({ ...values, [field.key]: event.target.value });
                  setMessage("");
                }}
              />
            </label>
          ))}
          <button
            className="text-link"
            style={{
              background: "none",
              borderTop: 0,
              borderLeft: 0,
              borderRight: 0,
            }}
            onClick={() => {
              setValues(defaults);
              setMessage("Example inputs restored.");
            }}
          >
            Reset to example ↺
          </button>
        </div>
        <div className="tool-results" aria-live="polite" aria-atomic="true">
          <p className="eyebrow">A CLEARER PICTURE</p>
          {result ? (
            <>
              <div className="result-value">
                {formatValue(result.value, result.unit)}
              </div>
              <p className="result-label">{result.label}</p>
              <div className="result-rows">
                {result.rows.map((row) => (
                  <div key={row.label}>
                    <span>{row.label}</span>
                    <strong>{formatValue(row.value, row.unit)}</strong>
                  </div>
                ))}
              </div>
              <p className="micro">{tool.assumptions}</p>
            </>
          ) : (
            <p role="status">{error}</p>
          )}
        </div>
      </div>
      <div className="tool-actions">
        <button
          className="button secondary"
          onClick={download}
          disabled={!result}
        >
          Download scenario ↓
        </button>
        <button className="button secondary" onClick={() => window.print()}>
          Print results
        </button>
        <a
          className="text-link"
          href={`/contact?subject=${encodeURIComponent(tool.title)}`}
        >
          Discuss this scenario
        </a>
      </div>
      <p className="micro" role="status" style={{ marginTop: 15 }}>
        {message ||
          "Your inputs stay in this browser tab. Nothing is saved or sent."}
      </p>
    </>
  );
}
