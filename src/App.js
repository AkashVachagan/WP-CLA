import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import ProfileCard from './components/ProfileCard';
import ProfileModal from './components/ProfileModal';
import {
  calculateCompletion,
  createEmptyProfile,
  normalizeProfile,
  validateField,
  validateProfile,
} from './utils/validation';

const PROFILE_STORAGE_KEY = 'profile-atelier-data';
const FORM_FIELDS = [
  'fullName',
  'dob',
  'gender',
  'email',
  'mobile',
  'address',
  'skills',
  'qualification',
  'summary',
  'photo',
];

const readStoredProfile = () => {
  try {
    const storedValue = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    return normalizeProfile(JSON.parse(storedValue));
  } catch (error) {
    return null;
  }
};

const syncSingleError = (currentErrors, fieldName, errorMessage) => {
  const nextErrors = { ...currentErrors };

  if (errorMessage) {
    nextErrors[fieldName] = errorMessage;
  } else {
    delete nextErrors[fieldName];
  }

  return nextErrors;
};

function App() {
  const [savedProfile, setSavedProfile] = useState(() => readStoredProfile());
  const [formData, setFormData] = useState(
    () => readStoredProfile() || createEmptyProfile()
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isEditing, setIsEditing] = useState(() => !readStoredProfile());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (savedProfile) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(savedProfile));
      } else {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    } catch (error) {
      // Ignore localStorage write issues and keep the app usable.
    }
  }, [savedProfile]);

  const markFieldTouched = (fieldName) => {
    setTouched((currentTouched) =>
      currentTouched[fieldName]
        ? currentTouched
        : { ...currentTouched, [fieldName]: true }
    );
  };

  const markAllFieldsTouched = () => {
    const allTouched = FORM_FIELDS.reduce((accumulator, fieldName) => {
      accumulator[fieldName] = true;
      return accumulator;
    }, {});

    setTouched(allTouched);
  };

  const handleFieldChange = (fieldName, value) => {
    markFieldTouched(fieldName);

    setFormData((currentData) => {
      const nextData = { ...currentData, [fieldName]: value };
      const nextError = validateField(fieldName, nextData[fieldName]);

      setErrors((currentErrors) =>
        syncSingleError(currentErrors, fieldName, nextError)
      );

      return nextData;
    });
  };

  const handleFieldBlur = (fieldName) => {
    markFieldTouched(fieldName);

    setErrors((currentErrors) =>
      syncSingleError(
        currentErrors,
        fieldName,
        validateField(fieldName, formData[fieldName])
      )
    );
  };

  const handleSkillToggle = (skill) => {
    markFieldTouched('skills');

    setFormData((currentData) => {
      const isSelected = currentData.skills.includes(skill);
      const nextSkills = isSelected
        ? currentData.skills.filter((item) => item !== skill)
        : [...currentData.skills, skill];
      const nextData = { ...currentData, skills: nextSkills };
      const nextError = validateField('skills', nextSkills);

      setErrors((currentErrors) =>
        syncSingleError(currentErrors, 'skills', nextError)
      );

      return nextData;
    });
  };

  const handlePhotoChange = (file) => {
    markFieldTouched('photo');

    if (!file) {
      setFormData((currentData) => ({
        ...currentData,
        photoDataUrl: '',
        photoName: '',
      }));
      setErrors((currentErrors) => syncSingleError(currentErrors, 'photo', ''));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors((currentErrors) =>
        syncSingleError(currentErrors, 'photo', 'Please upload a valid image file.')
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((currentData) => ({
        ...currentData,
        photoDataUrl: typeof reader.result === 'string' ? reader.result : '',
        photoName: file.name,
      }));
      setErrors((currentErrors) => syncSingleError(currentErrors, 'photo', ''));
    };

    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    markFieldTouched('photo');
    setFormData((currentData) => ({
      ...currentData,
      photoDataUrl: '',
      photoName: '',
    }));
    setErrors((currentErrors) => syncSingleError(currentErrors, 'photo', ''));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateProfile(formData);

    if (errors.photo) {
      validationErrors.photo = errors.photo;
    }

    setErrors(validationErrors);
    markAllFieldsTouched();

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const nextProfile = normalizeProfile(formData);

    setSavedProfile(nextProfile);
    setFormData(nextProfile);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProfile = () => {
    setFormData(savedProfile || createEmptyProfile());
    setErrors({});
    setTouched({});
    setIsEditing(true);
    setIsModalOpen(false);
  };

  const handleResetForm = () => {
    const nextProfile = savedProfile || createEmptyProfile();
    setFormData(nextProfile);
    setErrors({});
    setTouched({});
  };

  const handleClearPage = () => {
    const emptyProfile = createEmptyProfile();

    setSavedProfile(null);
    setFormData(emptyProfile);
    setErrors({});
    setTouched({});
    setIsEditing(true);
    setIsModalOpen(false);
  };

  const completion = calculateCompletion(formData);
  const previewProfile = isEditing ? formData : savedProfile;
  const activeModalProfile = savedProfile && !isEditing ? savedProfile : formData;

  return (
    <div className="profile-app">
      <div className="profile-app__orb profile-app__orb--one" />
      <div className="profile-app__orb profile-app__orb--two" />
      <div className="profile-app__orb profile-app__orb--three" />

      <main className="profile-app__shell">
        <section className="profile-app__hero card-panel">
          <div className="profile-app__hero-copy">
            <span className="section-badge">React User Profile Studio</span>
            <h1>Profile Generator</h1>
            <p>
              Create a polished digital identity with real-time validation,
              photo-driven cards, local persistence, and a detail-rich modal
              experience.
            </p>
          </div>

          <div className="profile-app__hero-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleClearPage}
            >
              Clear Page
            </button>

            {savedProfile && !isEditing ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            ) : null}
          </div>
        </section>

        {isEditing ? (
          <section className="profile-app__workspace">
            <Form
              formData={formData}
              errors={errors}
              touched={touched}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleFieldBlur}
              onSkillToggle={handleSkillToggle}
              onPhotoChange={handlePhotoChange}
              onPhotoRemove={handlePhotoRemove}
              onSubmit={handleSubmit}
              onReset={handleResetForm}
              onCancel={savedProfile ? () => setIsEditing(false) : null}
            />

            <aside className="profile-app__preview-column">
              <div className="card-panel profile-app__mini-panel">
                <div className="profile-app__mini-header">
                  <span className="section-badge section-badge--soft">
                    Live Preview
                  </span>
                  <span className="profile-app__mini-value">{completion}%</span>
                </div>
                <p className="profile-app__mini-copy">
                  Every valid field sharpens the final presentation. Upload a
                  photo to unlock the full visual impact of the profile card.
                </p>
              </div>

              <ProfileCard
                profile={previewProfile}
                onOpen={() => setIsModalOpen(true)}
                isPreview
              />

              <div className="card-panel profile-app__insight-grid">
                <div className="insight-tile">
                  <span className="insight-tile__label">Completion</span>
                  <strong>{completion}% ready</strong>
                </div>
                <div className="insight-tile">
                  <span className="insight-tile__label">Selected Skills</span>
                  <strong>{formData.skills.length}</strong>
                </div>
                <div className="insight-tile insight-tile--wide">
                  <span className="insight-tile__label">Current Summary</span>
                  <p>
                    {formData.summary
                      ? `${formData.summary.slice(0, 110)}${
                          formData.summary.length > 110 ? '...' : ''
                        }`
                      : 'Your profile summary will appear here once you start writing.'}
                  </p>
                </div>
              </div>
            </aside>
          </section>
        ) : savedProfile ? (
          <section className="profile-app__saved-preview" aria-live="polite">
            <ProfileCard
              profile={savedProfile}
              onOpen={() => setIsModalOpen(true)}
              isPreview
              badgeText="Profile saved"
            />
          </section>
        ) : null}
      </main>

      <ProfileModal
        isOpen={isModalOpen}
        profile={activeModalProfile}
        onClose={() => setIsModalOpen(false)}
        onEdit={savedProfile ? handleEditProfile : null}
      />
    </div>
  );
}

export default App;
