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
  //holds toggle-able value to control whether badges are displaying on profile page or not
  const [chooseBadge, setChooseBadge] = useState<boolean>(false);
  // const [displayTooltip, setDisplayTooltip] = useState<boolean>(true);

  const selectBadge = (image) => {
    console.log('selectBadge has fired');
    setSelectedBadge(image);
    return undefined;
  };

  const [tooltipVisibility, setTooltipVisibility] = useState({});
  const [selectedTooltip, setSelectedTooltip] = useState<string | null>(null);
  const tooltipRefs = useRef<{ [key: string]: HTMLElement }>({});

  const handleTooltipClick = (event, tooltipId) => {
    console.log('handleTooltipClick has fired');
    event.stopPropagation();
    setTooltipVisibility((prevVisibility) => ({
      ...prevVisibility,
      [tooltipId]: !prevVisibility[tooltipId],
    }));
  };

  const handleFavoriteClick = (event, image) => {
    console.log('handleFavoriteClick has fired');
    event.stopPropagation();
    selectBadge(image);
    // setSelectedTooltip(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log('this is selectedTooltip: ', selectedTooltip);
      console.log('this is event.target: ', event.target);
      let tooltips = tooltipVisibility;
      for (let key in tooltips) {
        console.log(`this is tooltips[${key}]: `, tooltips[key]);
        tooltips[key] = null;
      }
      setTooltipVisibility(tooltips);
      if (selectedTooltip !== null) {
        console.log(
          'this is tooltipRefs.current[selectedTooltip]: ',
          tooltipRefs.current[selectedTooltip]
        );
        if (!tooltipRefs.current[selectedTooltip]?.contains(event.target)) {
          setSelectedTooltip(null);
        }
      } else {
        console.log(
          'Cannot display tooltipRefs.current[selectedTooltip] because selectedTooltip is equal to null'
        );
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
              onClick={(event) => handleTooltipClick(event, badge.id)}
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
