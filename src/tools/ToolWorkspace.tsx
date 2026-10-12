import { useState } from "react";
import Select from "../components/Select";
import Calculator from "./Calculator";
import { tools } from "./catalog";
export default function ToolWorkspace() {
  const [slug, setSlug] = useState(tools[0].slug);
  const tool = tools.find((item) => item.slug === slug)!;
  return (
    <div className="all-tools-workspace">
      <div className="workspace-selector">
        <Select
          label="Choose a tool"
          name="workspace-tool"
          value={slug}
          onValueChange={setSlug}
          options={tools.map((item) => ({
            value: item.slug,
            label: item.title,
            description: item.category,
          }))}
        />
        <p className="micro">
          Switch tools without leaving this page. Each tool starts with an
          illustrative example.
        </p>
      </div>
      <h3>{tool.title}</h3>
      <Calculator key={slug} tool={tool} />
      <details className="workspace-guide">
        <summary>Formula & assumptions</summary>
        <p>{tool.formula}</p>
        <p>{tool.assumptions}</p>
        <p>{tool.example}</p>
        <p>
          <a className="text-link" href={`/tools/${tool.slug}`}>
            Read the full guide
          </a>
        </p>
      </details>
    </div>
  );
}
