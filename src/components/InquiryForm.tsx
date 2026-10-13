import { celebrate } from "../client/confetti";
import OpportunityFields from "./OpportunityFields";
import Icon from "./Icon";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { validateInquiry } from "../server/inquiry";
export default function InquiryForm() {
  const form = useRef<HTMLFormElement>(null);
  const confirmationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (confirmationTimer.current) clearTimeout(confirmationTimer.current);
    },
    [],
  );
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  function updateValidity() {
    if (!form.current) return;
    if (sent) {
      if (confirmationTimer.current) clearTimeout(confirmationTimer.current);
      setSent(false);
      setStatus("");
    }
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
  async function send(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setFailed(false);
    setStatus("Sending your introduction…");
    try {
      const inquiry = validateInquiry({
        ...Object.fromEntries(values),
        consent: values.get("consent") === "on",
      });
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
        signal: AbortSignal.timeout(20000),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message || "Delivery failed. Please try again.");
      form.current?.reset();
      setIsValid(false);
      setSent(true);
      setStatus(
        "Thank you. Your inquiry has been sent to JEA BizDev Consulting, LLC®. We’ll respond by email within a few business days.",
      );
      if (confirmationTimer.current) clearTimeout(confirmationTimer.current);
      confirmationTimer.current = setTimeout(() => {
        setStatus("");
        setSent(false);
        confirmationTimer.current = null;
      }, 10000);
      celebrate();
    } catch (error) {
      setFailed(true);
      setStatus(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Delivery could not be confirmed. Your details are preserved; please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="form-panel">
      <form ref={form} onSubmit={send} onInput={updateValidity}>
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
            I agree that JEA BizDev Consulting, LLC® may use these details to
            respond to my inquiry. <a href="/privacy">Privacy policy</a>.
          </span>
        </label>
        <div className="form-actions">
          <button
            className="button"
            type="submit"
            disabled={!isValid || busy}
            aria-describedby={sent ? undefined : "inquiry-required"}
          >
            <Icon name="mail" />
            {busy ? "Sending…" : failed ? "Try again" : "Send inquiry"}
          </button>
        </div>
        {!sent && (
          <p
            id="inquiry-required"
            className="micro"
            role="status"
            style={{ marginTop: 12 }}
          >
            {isValid
              ? "We’ll respond by email within a few business days."
              : "Complete your name, valid email, company, and priorities, then check the consent box to continue."}
          </p>
        )}
      </form>
      <p className={`form-status ${failed ? "error" : ""}`} role="status">
        {status}
      </p>
    </div>
  );
}
