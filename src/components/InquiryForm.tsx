import { celebrate } from "../client/confetti";
import OpportunityFields from "./OpportunityFields";
import Icon from "./Icon";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { inquiryText, validateInquiry, type Inquiry } from "../server/inquiry";
import { site } from "../content/site";
export default function InquiryForm() {
  const form = useRef<HTMLFormElement>(null);
  const review = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  function updateValidity() {
    if (!form.current) return;
    const values = new FormData(form.current);
    try {
      validateInquiry({
        ...Object.fromEntries(values),
        consent: values.get("consent") === "on",
      });
      setIsValid(form.current.checkValidity());
    } catch {
      setIsValid(false);
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    for (const name of ["subject"]) {
      const field = form.current?.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLSelectElement
        | null;
      const value = params.get(name);
      if (field && value) {
        if (
          field instanceof HTMLSelectElement &&
          ![...field.options].some((option) => option.value === value)
        ) {
          continue;
        }
        field.value = value.slice(0, 200);
      }
    }
  }, []);
  function prepare(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setFailed(false);
    try {
      const data = new FormData(event.currentTarget);
      setDraft(
        validateInquiry({
          ...Object.fromEntries(data),
          consent: data.get("consent") === "on",
        }),
      );
      setSent(false);
      requestAnimationFrame(() => review.current?.focus());
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Please check your details.",
      );
      setFailed(true);
    }
  }
  async function send() {
    if (!draft || busy || sent) return;
    setBusy(true);
    setFailed(false);
    setStatus("Sending your introduction…");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
        signal: AbortSignal.timeout(20000),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          body.message || "Delivery failed. Please use the email draft.",
        );
      setSent(true);
      setStatus(body.message);
      celebrate();
    } catch (error) {
      setFailed(true);
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Delivery could not be confirmed. Your draft is preserved below.",
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    if (!draft) return;
    const url = URL.createObjectURL(
      new Blob([inquiryText(draft)], { type: "text/plain" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "jea-introduction.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Introduction downloaded. Send it to JEA when you are ready.");
  }
  const text = draft ? inquiryText(draft) : "";
  return (
    <div className="form-panel">
      <form
        ref={form}
        onSubmit={prepare}
        onInput={updateValidity}
        onChange={() => {
          updateValidity();
          if (draft) {
            setDraft(null);
            setStatus("");
            setSent(false);
          }
        }}
      >
        <fieldset>
          <legend>
            <span>01</span>Let’s get acquainted
          </legend>
          <p className="micro">Fields marked * are required.</p>
          <div className="fields">
            <label>
              Full name *
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Work email *
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={200}
              />
            </label>
            <label>
              Company *
              <input
                name="company"
                autoComplete="organization"
                required
                maxLength={200}
              />
            </label>
            <label>
              Your role
              <input
                name="role"
                autoComplete="organization-title"
                maxLength={150}
              />
            </label>
          </div>
        </fieldset>
        <OpportunityFields />
        <div className="honeypot" aria-hidden="true">
          <label>
            Leave this blank
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="check-field">
          <input name="consent" type="checkbox" required />
          <span>
            I agree that JEA may use these details to respond to my inquiry.{" "}
            <a href="/privacy">Privacy policy</a>.
          </span>
        </label>
        <div className="form-actions">
          <button
            className="button"
            type="submit"
            disabled={!isValid || busy}
            aria-describedby="inquiry-required"
          >
            <Icon name="file" /> Review my introduction
          </button>
        </div>
        <p
          id="inquiry-required"
          className="micro"
          role="status"
          style={{ marginTop: 12 }}
        >
          {isValid
            ? "Your introduction is ready to review."
            : "Complete your name, valid email, company, and priorities, then check the consent box to continue."}
        </p>
        <p className="micro" style={{ marginTop: 15 }}>
          Review your details before sending. You can also open an email draft
          or download a copy.
        </p>
      </form>
      {draft && (
        <section
          ref={review}
          tabIndex={-1}
          className="review"
          aria-labelledby="review-title"
        >
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2 id="review-title" style={{ fontSize: 32 }}>
            {sent
              ? "Thank you for the introduction."
              : "Your introduction, ready to review."}
          </h2>
          <pre>{text}</pre>
          <div className="form-actions">
            <button className="button" onClick={send} disabled={busy || sent}>
              <Icon name={sent ? "check" : "mail"} />
              {sent ? "Inquiry sent" : busy ? "Sending…" : "Send to JEA"}
            </button>
            <a
              className="button secondary"
              href={`mailto:${site.email}?subject=${encodeURIComponent(draft.subject || "JEA business development inquiry")}&body=${encodeURIComponent(text)}`}
            >
              <Icon name="mail" /> Open email draft
            </a>
            <button
              className="text-link"
              style={{
                background: "none",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
              onClick={download}
            >
              <Icon name="download" /> Download introduction
            </button>
          </div>
          <p className="micro" style={{ marginTop: 15 }}>
            Opening an email draft does not send it. Send the message from your
            email app to complete your inquiry.
          </p>
        </section>
      )}
      <p className={`form-status ${failed ? "error" : ""}`} role="status">
        {status}
      </p>
    </div>
  );
}
