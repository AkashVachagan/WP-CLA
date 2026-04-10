function SelectDropdown({
  id,
  name,
  label,
  value,
  options,
  error,
  onChange,
  onBlur,
}) {
  const wrapperClassName = [
    'field',
    error ? 'field--error' : '',
    'field--raised',
    value ? 'field--has-value' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName}>
      <div className="field__control">
        <select
          id={id}
          name={name}
          value={value}
          className="field__select"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      </div>

      <div className="field__meta">
        <span className="field__hint">Choose your highest qualification.</span>
      </div>

      {error ? (
        <span id={`${id}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default SelectDropdown;
