import React, { useContext, useState } from 'react';
import { UserContext } from 'client/src/Root';
import {
  AchievementBadgeByName,
  AchievementBadge,
  AchievementBadgeHolder,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeTooltip,
  TooltipBox,
} from 'client/src/StyledComp';

const BadgeDisplay = () => {
  const {
    userBadges,
    setUserBadges,
    selectedBadge,
    setSelectedBadge,
    tickBadgeCounter,
    addBadge,
    tierCheck,
  } = useContext(UserContext);
  //holds toggle-able value to control whether badges are displaying on profile page or not
  const [badgeDisplay, setBadgeDisplay] = useState<string>('none');

  //show/hide badges on user profile page
  const badgesToggle = () => {
    if (badgeDisplay === 'none') {
      setBadgeDisplay('block');
    } else {
      setBadgeDisplay('none');
    }
    document.getElementById('badges')!.style.display = badgeDisplay;
  };

  const displayNoBadgeIfEmpty = () => {
    if (
      selectedBadge &&
      selectedBadge !==
        'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
    ) {
      return <AchievementBadgeByName src={selectedBadge} />;
    }
  };

  return (
    <div>
      <div>Achievement Badges:</div>

      <button onClick={badgesToggle}>Show Badges</button>

      <AchievementBadgeHolder id='badges'>
        {userBadges.map((badge) => {
          return (
            <AchievementBadgeAndTooltipContainer key={badge.id}>
              <AchievementBadge
                onClick={() => {
                  setSelectedBadge(badge.badgeIcon);
                }}
                src={badge.badgeIcon}
              />
              <AchievementBadgeTooltip>
                <TooltipBox>
                  <h3>{badge.name}</h3>
                  <div>{badge.description}</div>
                </TooltipBox>
              </AchievementBadgeTooltip>
            </AchievementBadgeAndTooltipContainer>
          );
        })}
      </AchievementBadgeHolder>
    </div>
  );
};

export default BadgeDisplay;
