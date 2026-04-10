import { calculateAge } from '../utils/validation';

const getCardBackground = (photoDataUrl) =>
  photoDataUrl
    ? `linear-gradient(180deg, rgba(14, 19, 33, 0.06), rgba(14, 19, 33, 0.16)), url("${photoDataUrl}")`
    : 'linear-gradient(135deg, rgba(181, 136, 73, 0.92), rgba(44, 36, 44, 0.96))';

function ProfileCard({
  profile,
  onOpen,
  onEdit,
  isPreview = false,
  badgeText,
}) {
  const age = profile?.dob ? calculateAge(profile.dob) : null;
  const displayName = profile?.fullName || 'Your profile card';
  const displayEmail = profile?.email || 'email@domain.com';
  const displayQualification = profile?.qualification || 'Qualification pending';
  const skillCount = profile?.skills?.length || 0;
  const hasPhoto = Boolean(profile?.photoDataUrl);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  if (isPreview) {
    return (
      <div
        className="profile-card"
        style={{ backgroundImage: getCardBackground(profile?.photoDataUrl) }}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        aria-label="Open profile details"
      >
        <div className="profile-card__content">
          <div className="profile-card__top">
            <span className="profile-card__badge">
              {badgeText || 'Live preview'}
            </span>
          </div>

          <div className="profile-card__footer">
            <p className="profile-card__eyebrow">{displayQualification}</p>
            <h2 className="profile-card__title">{displayName}</h2>
            <p className="profile-card__subtitle">{displayEmail}</p>

            <div className="profile-card__chips">
              <span className="tag">{profile?.gender || 'Gender'}</span>
              <span className="tag">{age ? `${age} years` : 'Age pending'}</span>
              <span className="tag">
                {skillCount > 0 ? `${skillCount} skill tags` : 'Skills pending'}
              </span>
            </div>

            <p className="profile-card__cta">
              Click to open the full profile details in a modal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="profile-card profile-card--saved"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label="Open profile details"
    >
      <div className="profile-card__saved-media">
        {hasPhoto ? (
          <img
            src={profile.photoDataUrl}
            alt={`${displayName} profile`}
            className="profile-card__saved-image"
          />
        ) : (
          <div className="profile-card__saved-fallback">No profile photo uploaded</div>
        )}
      </div>

      <div className="profile-card__saved-body">
        <div className="profile-card__top">
          <span className="profile-card__badge profile-card__badge--light">
            Saved Profile
          </span>

          {onEdit ? (
            <button
              type="button"
              className="profile-card__edit profile-card__edit--light"
              onClick={(event) => {
                event.stopPropagation();
                onEdit();
              }}
            >
              Edit
            </button>
          ) : null}
        </div>

        <div className="profile-card__footer">
          <p className="profile-card__eyebrow profile-card__eyebrow--light">
            {displayQualification}
          </p>
          <h2 className="profile-card__title profile-card__title--light">
            {displayName}
          </h2>
          <p className="profile-card__subtitle profile-card__subtitle--light">
            {displayEmail}
          </p>

          <div className="profile-card__chips">
            <span className="tag">{profile?.gender || 'Gender'}</span>
            <span className="tag">{age ? `${age} years` : 'Age pending'}</span>
            <span className="tag">
              {skillCount > 0 ? `${skillCount} skill tags` : 'Skills pending'}
            </span>
          </div>

          <p className="profile-card__cta profile-card__cta--light">
            Click to open the full profile details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
