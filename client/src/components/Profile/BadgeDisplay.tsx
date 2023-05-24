import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Root';
import {
  AchievementBadgeByName,
  AchievementBadge,
  AchievementBadgeHolder,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeTooltip,
  TooltipBox,
} from '../../StyledComp';

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
  const [chooseBadge, setChooseBadge] = useState<boolean>(false);
  const [displayTooltip, setDisplayTooltip] = useState<boolean>(true);

  const badgeClick = (image, id) => {
    if (chooseBadge) {
      setSelectedBadge(image);
      setChooseBadge(false);
    }
  };

  const toggleBadgeSelection = () => {
    setChooseBadge(true);
    return undefined;
  };

  const toggleTooltip = () => {
    setDisplayTooltip(!displayTooltip);
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

  useEffect(() => {
    const containerElement = document.getElementById('achievementContainer');

    if (containerElement) {
      if (displayTooltip) {
        containerElement.classList.add('show-tooltip');
      } else {
        containerElement.classList.remove('show-tooltip');
      }
    }
  }, [displayTooltip]);

  return (
    <div>
      <div>Featured Badge:</div>
      {displayNoBadgeIfEmpty()}

      <div>Achievement Badges:</div>

      <AchievementBadgeHolder id='badges'>
        {userBadges.map((badge) => {
          return (
            <AchievementBadgeAndTooltipContainer
              id='achievementContainer'
              key={badge.id}
            >
              <AchievementBadge
                onClick={() => {
                  badgeClick(badge.badgeIcon, badge.id);
                }}
                src={badge.badgeIcon}
              />
              <AchievementBadgeTooltip show={true} id={badge.id}>
                <TooltipBox>
                  <h3>{badge.name}</h3>
                  <div>{badge.description}</div>
                </TooltipBox>
              </AchievementBadgeTooltip>
            </AchievementBadgeAndTooltipContainer>
          );
        })}
      </AchievementBadgeHolder>
      <button onClick={toggleBadgeSelection}>Select Featured Badge</button>
      <button onClick={toggleTooltip}>Toggle Tooltip</button>
    </div>
  );
};

export default BadgeDisplay;
