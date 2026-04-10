import CheckboxGroup from './CheckboxGroup';
import ImageUpload from './ImageUpload';
import InputField from './InputField';
import RadioGroup from './RadioGroup';
import SelectDropdown from './SelectDropdown';
import TextArea from './TextArea';
import {
  GENDER_OPTIONS,
  QUALIFICATION_OPTIONS,
  SKILL_OPTIONS,
} from '../utils/validation';

function Form({
  formData,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onSkillToggle,
  onPhotoChange,
  onPhotoRemove,
  onSubmit,
  onReset,
  onCancel,
}) {
  return (
    <form className="profile-form card-panel" onSubmit={onSubmit} noValidate>
      <div className="profile-form__header">
        <div>
          <span className="section-badge">Profile Builder</span>
          <h2>Compose a standout personal profile</h2>
          <p>
            Every field below is validated with React and JavaScript only. Once
            saved, the form collapses into an interactive profile experience.
          </p>
        </div>
      </div>

      <div className="profile-form__grid">
        <InputField
          id="fullName"
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          error={touched.fullName ? errors.fullName : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          helperText="Use alphabets and spaces only."
        />

        <InputField
          id="dob"
          name="dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
          error={touched.dob ? errors.dob : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          alwaysLiftLabel
        />

        <RadioGroup
          name="gender"
          legend="Gender"
          options={GENDER_OPTIONS}
          selectedValue={formData.gender}
          error={touched.gender ? errors.gender : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
        />

        <InputField
          id="email"
          name="email"
          label="Email ID"
          value={formData.email}
          error={touched.email ? errors.email : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          helperText="Format: username@domain.com"
          inputMode="email"
        />

        <InputField
          id="mobile"
          name="mobile"
          label="Mobile Number"
          value={formData.mobile}
          error={touched.mobile ? errors.mobile : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          helperText="Enter exactly 10 digits."
          inputMode="numeric"
        />

        <SelectDropdown
          id="qualification"
          name="qualification"
          label="Educational Qualification"
          value={formData.qualification}
          options={QUALIFICATION_OPTIONS}
          error={touched.qualification ? errors.qualification : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
        />

        <TextArea
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          error={touched.address ? errors.address : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          helperText="Minimum 10 characters required."
        />

        <CheckboxGroup
          name="skills"
          legend="Skills"
          options={SKILL_OPTIONS}
          selectedValues={formData.skills}
          error={touched.skills ? errors.skills : ''}
          onChange={onSkillToggle}
          onBlur={onFieldBlur}
        />

        <ImageUpload
          previewUrl={formData.photoDataUrl}
          fileName={formData.photoName}
          error={touched.photo ? errors.photo : ''}
          onChange={onPhotoChange}
          onRemove={onPhotoRemove}
        />

        <TextArea
          id="summary"
          name="summary"
          label="Profile Summary"
          value={formData.summary}
          error={touched.summary ? errors.summary : ''}
          onChange={onFieldChange}
          onBlur={onFieldBlur}
          helperText="Write at least 30 characters."
          isFullWidth
        />
      </div>

      <div className="profile-form__actions">
        <button type="submit" className="btn btn--primary">
          Save Profile
        </button>
        <button type="button" className="btn btn--secondary" onClick={onReset}>
          Reset Form
        </button>
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Back to Profile
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default Form;
