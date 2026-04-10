function RadioGroup({
  name,
  legend,
  options,
  selectedValue,
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
        <span className="group-field__helper">Choose one option</span>
      </div>

      <div className="option-grid">
        {options.map((option) => {
          const optionId = `${name}-${option}`;
          return (
            <label key={option} htmlFor={optionId} className="option-chip">
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option}
                checked={selectedValue === option}
                onChange={() => onChange(name, option)}
                onBlur={() => onBlur(name)}
              />
              <span className="option-chip__label">
                <span className="option-chip__indicator" />
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

export default RadioGroup;
