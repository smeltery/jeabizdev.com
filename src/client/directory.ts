document
  .querySelectorAll<HTMLElement>("[data-directory]")
  .forEach((directory) => {
    const query = directory.querySelector<HTMLInputElement>(
      "[data-directory-query]",
    )!;
    const category = directory.querySelector<HTMLSelectElement>(
      "[data-directory-category]",
    );
    const cards = [
      ...directory.querySelectorAll<HTMLElement>("[data-directory-item]"),
    ];
    const count = directory.querySelector<HTMLElement>(
      "[data-directory-count]",
    )!;
    const empty = directory.querySelector<HTMLElement>(
      "[data-directory-empty]",
    )!;
    let selected = "";
    const chips = [
      ...directory.querySelectorAll<HTMLButtonElement>(
        "[data-category-filter]",
      ),
    ];
    function filter() {
      const words = query.value
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      for (const card of cards)
        card.hidden =
          !words.every((word) =>
            (card.dataset.search || card.textContent || "")
              .toLowerCase()
              .includes(word),
          ) || !!(selected && card.dataset.category !== selected);
      const visible = cards.filter((card) => !card.hidden).length;
      count.textContent = `${visible} ${directory.dataset.noun || "partnerships"} found`;
      empty.hidden = visible > 0;
      chips.forEach((chip) =>
        chip.setAttribute(
          "aria-pressed",
          String(chip.dataset.categoryFilter === selected),
        ),
      );
    }
    document.addEventListener("directory:category", (event) => {
      selected = (event as CustomEvent<string>).detail;
      filter();
    });
    query.addEventListener("input", filter);
    category?.addEventListener("change", () => {
      selected = category.value;
      filter();
    });
    chips.forEach((chip) =>
      chip.addEventListener("click", () => {
        selected = chip.dataset.categoryFilter!;
        filter();
      }),
    );
    directory
      .querySelector("[data-directory-reset]")
      ?.addEventListener("click", () => {
        document.dispatchEvent(new Event("directory:reset"));
        query.value = "";
        selected = "";
        if (category) category.value = "";
        filter();
        query.focus();
      });
  });
