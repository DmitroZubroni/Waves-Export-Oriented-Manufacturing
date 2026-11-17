import { useLayoutEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "./icons.jsx";
import { useDismiss } from "./useDismiss.js";

/**
 * Select — собственный компонент выпадающего списка (Правило Н6).
 * Браузерный <select> не используется: ширина открытого списка равна полю,
 * длинный текст переносится, список не выходит за экран (разворачивается
 * вверх у нижнего края), прокручивается при большом числе вариантов,
 * работает мышью, клавиатурой (Up/Down/Home/End/Enter/Esc) и касанием.
 *
 * Контракт такой же, как у браузерного select: value — текущее значение,
 * onChange(value) — выбор; никакой сетевой/бизнес-логики здесь нет.
 */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder = "Выберите значение",
  mono = false,
  disabled = false,
  invalid = false,
  describedBy,
  label,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openUp, setOpenUp] = useState(false);
  const [listHeight, setListHeight] = useState(280);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const generatedId = useId();
  const triggerId = id || generatedId;
  const listboxId = `${triggerId}-listbox`;

  const selected = options.find((option) => option.value === value);

  const close = () => setOpen(false);
  useDismiss(open, close, rootRef);

  useLayoutEffect(() => {
    if (!open) return;
    const currentIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);

    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const header = document.querySelector('.app-header');
      const edge = header && getComputedStyle(header).position === 'sticky' ? header.getBoundingClientRect().bottom : 0;
      const below = window.innerHeight - rect.bottom - 8;
      const above = rect.top - edge - 8;
      const up = below < 280 && above > below;
      setOpenUp(up);
      setListHeight(Math.max(44, Math.min(280, up ? above : below)));
    }
    const frame = requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const commit = (index) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setOpen(false);
    rootRef.current?.querySelector("button")?.focus();
  };

  const onTriggerKeyDown = (event) => {
    if (disabled) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (event) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        rootRef.current?.querySelector("button")?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="k-select" ref={rootRef}>
      <button
        type="button"
        id={triggerId}
        className={`k-select-trigger ${mono ? "mono-data" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={`k-select-value ${!selected ? "is-placeholder" : ""}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon className="chev" size={16} />
      </button>

      {open && (
        <ul
          className={`k-select-list ${openUp ? "open-up" : ""}`}
          role="listbox"
          style={{ maxHeight: listHeight }}
          id={listboxId}
          tabIndex={-1}
          ref={listRef}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listboxId}-opt-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`k-select-option ${index === activeIndex ? "is-active" : ""} ${
                option.value === value ? "is-selected" : ""
              } ${mono ? "mono-data" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => commit(index)}
            >
              <span>{option.label}</span>
              {option.value === value && <CheckIcon size={16} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
