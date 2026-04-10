function InputField({
  id,
  name,
  label,
  value,
  type = 'text',
  error,
  onChange,
  onBlur,
  helperText,
  inputMode,
  alwaysLiftLabel = false,
}) {
  const hasValue = typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
  const wrapperClassName = [
    'field',
    error ? 'field--error' : '',
    hasValue ? 'field--has-value' : '',
    alwaysLiftLabel ? 'field--raised' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName}>
      <div className="field__control">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          className="field__input"
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          inputMode={inputMode}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
        />
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      </div>

      <div className="field__meta">
        <span className="field__hint">{helperText}</span>
      </div>

      {error ? (
        <span id={`${id}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default InputField;
