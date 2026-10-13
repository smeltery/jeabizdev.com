import Select from "./Select";
import Icon from "./Icon";
import { useState } from "react";
import { assets } from "../../data/assets";
const stageOrder = [
  "Phase 3",
  "Phase 1",
  "IND Approved",
  "IND Filing",
  "Preclinical",
];
export default function AssetLibrary() {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("All areas");
  const [stage, setStage] = useState("All stages");
  const [sort, setSort] = useState("stage");
  const results = assets
    .filter(
      (asset) =>
        (focus === "All areas" || asset.focus === focus) &&
        (stage === "All stages" || asset.stage === stage) &&
        `${asset.name} ${asset.target} ${asset.focus} ${asset.type} ${asset.stage}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage),
    );
  function reset() {
    setQuery("");
    setFocus("All areas");
    setStage("All stages");
  }
  return (
    <>
      <div className="filters">
        <label>
          Search opportunities
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search target, asset, or modality…"
          />
        </label>
        <Select
          label="Development stage"
          name="stage"
          value={stage}
          onValueChange={setStage}
          options={[
            "All stages",
            ...stageOrder.filter((value) =>
              assets.some((asset) => asset.stage === value),
            ),
          ].map((value) => ({ value, label: value }))}
        />
        <Select
          label="Sort by"
          name="sort"
          value={sort}
          onValueChange={setSort}
          options={[
            {
              value: "stage",
              label: "Development stage",
              description: "Most advanced first",
            },
            { value: "name", label: "Asset name A–Z" },
          ]}
        />
      </div>
      <div className="filter-chips" role="group" aria-label="Therapeutic area">
        {["All areas", "Oncology", "Cardiovascular"].map((value) => (
          <button
            key={value}
            aria-pressed={value === focus}
            onClick={() => setFocus(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <p className="library-status" role="status">
        {results.length}{" "}
        {results.length === 1 ? "opportunity" : "opportunities"} · Overview
        decks available upon request
      </p>
      <div className="library-grid">
        {results.map((asset) => (
          <a
            className="library-card"
            key={asset.id}
            href={`/assets/${asset.id}`}
          >
            <span className="badge">{asset.focus}</span>
            <h2>{asset.name}</h2>
            <p>
              {asset.type}
              <br />
              Target: {asset.target}
            </p>
            <div className="card-bottom">
              <span>{asset.stage}</span>
              <span className="inline-icon">
                Explore asset <Icon name="right" size={15} />
              </span>
            </div>
          </a>
        ))}
      </div>
      {!results.length && (
        <div className="empty">
          <h3>No matching opportunities.</h3>
          <p>Try another target or broaden your filters.</p>
          <button className="button" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
