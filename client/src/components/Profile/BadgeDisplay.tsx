import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../Root';
import {
  AchievementBadgeByName,
  AchievementBadge,
  AchievementBadgeHolder,
  BadgeContainerLabel,
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
    isDark,
  } = useContext(UserContext);

  const [tooltipVisibility, setTooltipVisibility] = useState({});
  const [selectedTooltip, setSelectedTooltip] = useState<string | null>(null);
  const tooltipRefs = useRef<{ [key: string]: HTMLElement }>({});

  const notAllBlackTierOneBadgeNames = [
    'Storm Chaser',
    'Speedster',
    'Social Butterfly',
    'Community Legend',
    'Likable Legend',
    'Legendary Explorer',
  ];

  const selectBadge = (image) => {
    setSelectedBadge(image);
    return undefined;
  };

  const clearTooltips = () => {
    let tooltips = tooltipVisibility;
    for (let key in tooltips) {
      tooltips[key] = null;
    }
    setTooltipVisibility(tooltips);
  };

  const handleBadgeClick = (event, tooltipId) => {
    event.stopPropagation();
    clearTooltips();
    setTooltipVisibility((prevVisibility) => ({
      ...prevVisibility,
      [tooltipId]: !prevVisibility[tooltipId],
    }));
  };

  const displayTooltipButton = (badge) => {
    if (badge.name !== 'No Achievements') {
      return (
        <button
          onClick={(event) => handleFavoriteClick(event, badge.badgeIcon)}
        >
          Favorite
        </button>
      );
    }
  };

  const handleFavoriteClick = (event, image) => {
    event.stopPropagation();
    selectBadge(image);
    clearTooltips();
  };

  useEffect(() => {
    console.log('here are the userBadges: ', userBadges);
    const handleOutsideClick = (event) => {
      clearTooltips();
      if (selectedTooltip !== null) {
        if (!tooltipRefs.current[selectedTooltip]?.contains(event.target)) {
          setSelectedTooltip(null);
        }
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedTooltip]);

  return (
    <AchievementBadgeHolder isDark={isDark}>
      <BadgeContainerLabel>
        <strong>Earned Badges</strong>
      </BadgeContainerLabel>

      <span id='badges'>
        {userBadges.map((badge) => {
          const tooltipVisible = tooltipVisibility[badge.id];
          let allBlack = true;
          if (
            isDark &&
            (badge.name === 'Iron Lungs' ||
              (badge.tier === 1 &&
                !notAllBlackTierOneBadgeNames.includes(badge.name)))
          ) {
            allBlack = true;
          }

          return (
            <AchievementBadgeAndTooltipContainer
              id='achievementContainer'
              key={badge.id}
              show={tooltipVisible}
              onClick={(event) => handleBadgeClick(event, badge.id)}
            >
              <AchievementBadge src={badge.badgeIcon} allBlack={allBlack} />
              <AchievementBadgeTooltip show={tooltipVisible} id={badge.id}>
                <TooltipBox isDark={isDark}>
                  <h3>{badge.name}</h3>
                  <div>{badge.description}</div>
                  {displayTooltipButton(badge)}
                </TooltipBox>
              </AchievementBadgeTooltip>
            </AchievementBadgeAndTooltipContainer>
          );
        })}
      </span>
    </AchievementBadgeHolder>
  );
};

export default BadgeDisplay;
