function CheckboxGroup({
  name,
  legend,
  options,
  selectedValues,
  error,
  onChange,
  onBlur,
}) {
  const wrapperClassName = [
    'group-field',
    error ? 'group-field--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset className={wrapperClassName}>
      <div className="group-field__header">
        <legend className="group-field__legend">{legend}</legend>
        <span className="group-field__helper">Pick at least one skill</span>
      </div>

      <div className="option-grid">
        {options.map((option) => {
          const optionId = `${name}-${option.replace(/\s+/g, '-').toLowerCase()}`;
          const checked = selectedValues.includes(option);

          return (
            <label key={option} htmlFor={optionId} className="option-chip">
              <input
                id={optionId}
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                onBlur={() => onBlur(name)}
              />
              <span className="option-chip__label">
                <span className="option-chip__indicator option-chip__indicator--square" />
                <span>{option}</span>
              </span>
            </label>
          );
        })}
      </div>

      {error ? <span className="group-field__error">{error}</span> : null}
    </fieldset>
  );
}

export default CheckboxGroup;
