import Select from "./Select";
import { assets } from "../../data/assets";
export default function OpportunityFields() {
  return (
    <fieldset>
      <legend>
        <span>02</span>The opportunity ahead
      </legend>
      <div className="fields">
        <label className="full">
          What would you like to discuss?
          <input
            name="subject"
            placeholder="e.g. Out-licensing strategy or partner identification"
            maxLength={200}
          />
        </label>
        <Select
          label="Asset of interest"
          name="asset"
          queryParam="asset"
          options={[
            { value: "", label: "Not asset-specific" },
            ...assets.map((asset) => ({
              value: asset.name,
              label: asset.name,
              description: asset.focus,
            })),
          ]}
        />
        <Select
          label="Territories"
          name="territory"
          options={[
            { value: "", label: "Let’s discuss" },
            ...[
              "Global",
              "North America",
              "Europe",
              "Asia",
              "Multiple territories",
            ].map((value) => ({ value, label: value })),
          ]}
        />
        <Select
          label="Timeline"
          name="timeline"
          options={[
            { value: "", label: "Let’s discuss" },
            ...[
              "As soon as possible",
              "Within 1–3 months",
              "Within 3–6 months",
              "Just exploring",
            ].map((value) => ({ value, label: value })),
          ]}
        />
        <Select
          label="Engagement model"
          name="engagement"
          queryParam="engagement"
          options={[
            { value: "", label: "Help me choose" },
            {
              value: "Hourly",
              label: "Hourly",
              description: "Targeted advice and flexible scope",
            },
            {
              value: "Retainer",
              label: "Retainer",
              description: "Ongoing support for your team",
            },
            {
              value: "Project-based",
              label: "Project-based",
              description: "Defined scope and deliverables",
            },
            {
              value: "Blended",
              label: "Blended",
              description: "Fixed fees with performance incentives",
            },
          ]}
        />
        <label className="full">
          Tell us about your priorities *
          <textarea
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder="Your goals, the support you are looking for, and any questions. Please keep this introduction non-confidential."
          />
        </label>
      </div>
    </fieldset>
  );
}
