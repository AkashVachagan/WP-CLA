import { useEffect } from 'react';
import { calculateAge, formatDisplayDate } from '../utils/validation';

function ProfileModal({ isOpen, profile, onClose, onEdit }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !profile) {
    return null;
  }

  const age = profile.dob ? calculateAge(profile.dob) : null;
  const hasPhoto = Boolean(profile.photoDataUrl);
  const details = [
    { label: 'Full Name', value: profile.fullName || 'Not provided yet' },
    { label: 'Date of Birth', value: formatDisplayDate(profile.dob) },
    { label: 'Age', value: age ? `${age} years old` : 'Not available' },
    { label: 'Gender', value: profile.gender || 'Not selected' },
    { label: 'Email ID', value: profile.email || 'Not provided' },
    { label: 'Mobile Number', value: profile.mobile || 'Not provided' },
    {
      label: 'Educational Qualification',
      value: profile.qualification || 'Not selected',
    },
    { label: 'Address', value: profile.address || 'Not provided' },
  ];

  return (
    <div
      className="profile-modal__backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="profile-modal__close"
          onClick={onClose}
          aria-label="Close profile modal"
        >
          x
        </button>

        <div className="profile-modal__hero">
          <div className="profile-modal__media-card">
            {hasPhoto ? (
              <img
                src={profile.photoDataUrl}
                alt={`${profile.fullName || 'Profile'} portrait`}
                className="profile-modal__media-image"
              />
            ) : (
              <div className="profile-modal__media-fallback">
                No profile photo uploaded
              </div>
            )}
          </div>

          <div className="profile-modal__hero-copy">
            <span className="section-badge">Expanded Profile View</span>
            <h2 id="profile-modal-title">{profile.fullName || 'Profile Preview'}</h2>
            <p>
              {profile.email || 'email@domain.com'}
              <br />
              {profile.qualification || 'Qualification pending'}
            </p>
          </div>
        </div>

        <div className="profile-modal__body">
          <div className="details-grid">
            {details.map((detail) => (
              <div key={detail.label} className="detail-card">
                <span className="detail-card__label">{detail.label}</span>
                <p className="detail-card__value">{detail.value}</p>
              </div>
            ))}
          </div>

          <section className="profile-modal__section">
            <h3>Skills</h3>
            <div className="skill-tags">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills selected yet.</p>
              )}
            </div>
          </section>

          <section className="profile-modal__section">
            <h3>Profile Summary</h3>
            <p>{profile.summary || 'No summary added yet.'}</p>
          </section>

          <div className="profile-modal__actions">
            {onEdit ? (
              <button type="button" className="btn btn--primary" onClick={onEdit}>
                Edit Profile
              </button>
            ) : null}
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
