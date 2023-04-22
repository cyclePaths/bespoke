import React, { useContext } from 'react';
import { RouteButton } from '../../StyledComp';
import { UserContext } from '../../Root';

interface Props {
  fetchMaps: (user_id: number | undefined) => void;
  routeList: any;
  setRouteList: React.Dispatch<any>;
  reportsList: any;
  setReportsList: React.Dispatch<any>;
}

const FetchedRoutes = ({
  fetchMaps,
  routeList,
  setRouteList,
  reportsList,
  setReportsList,
}: Props) => {
  const user = useContext(UserContext);

  return (
    <div>
      <RouteButton onClick={() => fetchMaps(user!.id)}>
        Fetch Routes
      </RouteButton>
    </div>
  );
};

export default FetchedRoutes;
