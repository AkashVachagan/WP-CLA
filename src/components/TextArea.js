function TextArea({
  id,
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  helperText,
  isFullWidth = false,
}) {
  const hasValue = value.trim().length > 0;
  const wrapperClassName = [
    'field',
    isFullWidth ? 'field--full' : '',
    error ? 'field--error' : '',
    hasValue ? 'field--has-value' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName}>
      <div className="field__control">
        <textarea
          id={id}
          name={name}
          value={value}
          className="field__textarea"
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
        />
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      </div>

      <div className="field__meta">
        <span className="field__hint">{helperText}</span>
        <span className="field__counter">{value.length} characters</span>
      </div>

      {error ? (
        <span id={`${id}-error`} className="field__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default TextArea;
