const closing = new WeakMap<HTMLDialogElement, Promise<void>>();
export function closeDialog(dialog: HTMLDialogElement): Promise<void> {
  const pending = closing.get(dialog);
  if (pending) return pending;
  if (!dialog.open || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    dialog.close();
    return Promise.resolve();
  }
  dialog.classList.add("is-closing");
  const finished = new Promise<void>((resolve) =>
    setTimeout(() => {
      dialog.close();
      dialog.classList.remove("is-closing");
      closing.delete(dialog);
      resolve();
    }, 220),
  );
  closing.set(dialog, finished);
  return finished;
}
