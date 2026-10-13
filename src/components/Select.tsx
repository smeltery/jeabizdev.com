import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
export interface Option {
  value: string;
  label: string;
  description?: string;
}
interface Props {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  queryParam?: string;
}
export default function Select({
  label,
  name,
  options,
  value,
  onValueChange,
  queryParam,
}: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const native = useRef<HTMLSelectElement>(null);
  const [internal, setInternal] = useState(options[0]?.value || "");
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const [active, setActive] = useState(0);
  const selected = value ?? internal;
  const current =
    options.find((option) => option.value === selected) || options[0];
  const typeahead = useRef("");
  const lastTyped = useRef(0);
  useEffect(() => {
    if (queryParam) {
      const initial = new URLSearchParams(location.search).get(queryParam);
      if (initial && options.some((option) => option.value === initial))
        setInternal(initial);
    }
  }, []);
  useEffect(() => {
    const form = native.current?.form;
    function reset() {
      setInternal(options[0]?.value || "");
      setOpen(false);
      setActive(0);
    }
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (open)
      root.current
        ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);
  function show() {
    const rect = trigger.current!.getBoundingClientRect();
    setAbove(innerHeight - rect.bottom < 260 && rect.top > 260);
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === selected),
      ),
    );
    setOpen(true);
  }
  function choose(index: number) {
    const next = options[index].value;
    setInternal(next);
    onValueChange?.(next);
    if (native.current) {
      native.current.value = next;
      native.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setOpen(false);
    trigger.current?.focus();
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
      }
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) {
        show();
        return;
      }
      setActive((index) =>
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? options.length - 1
            : event.key === "ArrowDown"
              ? (index + 1) % options.length
              : (index - 1 + options.length) % options.length,
      );
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else show();
      return;
    }
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
      const now = Date.now();
      typeahead.current =
        now - lastTyped.current > 700
          ? event.key
          : typeahead.current + event.key;
      lastTyped.current = now;
      const match = options.findIndex((option) =>
        option.label.toLowerCase().startsWith(typeahead.current.toLowerCase()),
      );
      if (match >= 0) {
        if (!open) show();
        setActive(match);
      }
    }
  }
  return (
    <div className="select-field" ref={root}>
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>
        {label}
      </label>
      <select
        ref={native}
        name={name}
        value={selected}
        onChange={(event) => {
          setInternal(event.target.value);
          onValueChange?.(event.target.value);
        }}
        className="select-native"
        aria-hidden="true"
        tabIndex={-1}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        id={`${id}-trigger`}
        type="button"
        ref={trigger}
        className="select-trigger"
        role="combobox"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open}
        aria-controls={`${id}-options`}
        aria-haspopup="listbox"
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span id={`${id}-value`}>{current.label}</span>
        <Icon name="chevron" size={16} />
      </button>
      {open && (
        <div
          className={`select-options ${above ? "above" : ""}`}
          role="listbox"
          id={`${id}-options`}
          aria-labelledby={`${id}-label`}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={selected === option.value}
              data-index={index}
              className={`select-option ${active === index ? "active" : ""}`}
              onPointerMove={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>
                {option.label}
                {option.description && <small>{option.description}</small>}
              </span>
              {selected === option.value && <Icon name="check" size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
