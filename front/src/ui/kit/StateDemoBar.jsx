/**
 * StateDemoBar — демо-переключатель состояний экрана (Правило Н4): каждое из
 * 4 состояний (У1) можно открыть и проверить руками, не дожидаясь реальной
 * сети или пустой выборки. Не бизнес-логика — только триггеры локального
 * UI-состояния, которое уже существует на каждой странице со списком.
 */
export function StateDemoBar({
  onTestLoading,
  errorOn,
  onToggleError,
  emptyOn,
  onToggleEmpty,
}) {
  if (!(["review", "dev"].some(key => new URLSearchParams(window.location.search).has(key)))) return null;
  return (
    <div className="flex justify-end items-center gap-2 mb-3 flex-wrap">
      <span className="mono-data text-xs text-muted">Проверка состояний (У1):</span>
      <button type="button" onClick={onTestLoading} className="btn btn-ghost btn-sm mono-data">
        Загрузка
      </button>
      <button
        type="button"
        onClick={onToggleEmpty}
        aria-pressed={emptyOn}
        className={`btn btn-ghost btn-sm mono-data ${emptyOn ? "is-active" : ""}`}
      >
        {emptyOn ? "Скрыть «пусто»" : "Пустой список"}
      </button>
      <button
        type="button"
        onClick={onToggleError}
        aria-pressed={errorOn}
        className={`btn btn-ghost btn-sm mono-data ${errorOn ? "is-active" : ""}`}
        style={errorOn ? { color: "var(--danger)" } : undefined}
      >
        {errorOn ? "Сбросить ошибку" : "Ошибка"}
      </button>
    </div>
  );
}

export default StateDemoBar;
