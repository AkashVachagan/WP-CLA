function ImageUpload({ previewUrl, fileName, error, onChange, onRemove }) {
  const wrapperClassName = [
    'group-field',
    'group-field--full',
    error ? 'group-field--error' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassName}>
      <div className="group-field__header">
        <p className="group-field__legend">Profile Photo Upload</p>
        <span className="group-field__helper">Image files only</span>
      </div>

      <label className="image-upload__dropzone">
        <input
          className="image-upload__input"
          type="file"
          accept="image/*"
          onChange={(event) => onChange(event.target.files?.[0] || null)}
        />

        {previewUrl ? (
          <img src={previewUrl} alt="Profile preview" className="image-upload__preview" />
        ) : (
          <div className="image-upload__fallback">Preview</div>
        )}

        <div className="image-upload__content">
          <h3>Upload a profile image</h3>
          <p>
            The selected photo appears instantly here and becomes the background
            of the interactive profile card after submission.
          </p>
          <span className="image-upload__file">
            {fileName || 'PNG, JPG, JPEG, SVG or WEBP image files'}
          </span>

          {previewUrl ? (
            <div className="image-upload__actions">
              <button
                type="button"
                className="image-upload__remove"
                onClick={(event) => {
                  event.preventDefault();
                  onRemove();
                }}
              >
                Remove Photo
              </button>
            </div>
          ) : null}
        </div>
      </label>

      {error ? <span className="group-field__error">{error}</span> : null}
    </div>
  );
}

export default ImageUpload;
