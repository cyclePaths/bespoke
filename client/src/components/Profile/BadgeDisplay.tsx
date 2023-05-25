import React, { useContext, useState, useEffect, useRef } from 'react';
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

  const selectBadge = (image) => {
    console.log('selectBadge has fired');
    setSelectedBadge(image);
    return undefined;
  };

  const [tooltipVisibility, setTooltipVisibility] = useState({});
  const [selectedTooltip, setSelectedTooltip] = useState<string | null>(null);
  const tooltipRefs = useRef<{ [key: string]: HTMLElement }>({});

  const handleBadgeClick = (event, tooltipId) => {
    event.stopPropagation();
    let tooltips = tooltipVisibility;
    for (let key in tooltips) {
      console.log(`this is tooltips[${key}]: `, tooltips[key]);
      tooltips[key] = null;
    }
    setTooltipVisibility(tooltips);
    setTooltipVisibility((prevVisibility) => ({
      ...prevVisibility,
      [tooltipId]: !prevVisibility[tooltipId],
    }));
  };

  const handleFavoriteClick = (event, image) => {
    event.stopPropagation();
    selectBadge(image);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      let tooltips = tooltipVisibility;
      for (let key in tooltips) {
        console.log(`this is tooltips[${key}]: `, tooltips[key]);
        tooltips[key] = null;
      }
      setTooltipVisibility(tooltips);
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
    <div>
      <div>Your Badges:</div>

      <AchievementBadgeHolder id='badges'>
        {userBadges.map((badge) => {
          const tooltipVisible = tooltipVisibility[badge.id];
          return (
            <AchievementBadgeAndTooltipContainer
              id='achievementContainer'
              key={badge.id}
              show={tooltipVisible}
              onClick={(event) => handleBadgeClick(event, badge.id)}
            >
              <AchievementBadge src={badge.badgeIcon} />
              <AchievementBadgeTooltip show={tooltipVisible} id={badge.id}>
                <TooltipBox>
                  <h3>{badge.name}</h3>
                  <div>{badge.description}</div>
                  <button
                    onClick={(event) =>
                      handleFavoriteClick(event, badge.badgeIcon)
                    }
                  >
                    Favorite
                  </button>
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
