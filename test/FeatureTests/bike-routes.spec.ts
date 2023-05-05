import { expect } from 'chai';
import axios from 'axios';

describe('Route Saves to Database', () => {
  let saveRoute;

  const routeWithoutWaypoints = {
    request: {
      origin: {
        location: {
          lat: 30.102345432,
          lng: -90.001234551,
        },
      },
      destination: {
        location: {
          lat: 29.00432223,
          lng: -90.00322234,
        },
      },
    },
  };

  const routeWithWaypoints = {
    request: {
      origin: {
        location: {
          lat: 30.102345432,
          lng: -90.001234551,
        },
      },
      destination: {
        location: {
          lat: 29.00432223,
          lng: -90.00322234,
        },
      },
      waypoints: [
        {
          location: {
            location: {
              lat: 31.00324562,
              lng: -90.54366621,
            },
          },
          stopover: true,
        },
        {
          location: {
            location: {
              lat: 30.00324562,
              lng: -91.54366621,
            },
          },
          stopover: true,
        },
      ],
    },
  };

  beforeEach(async () => {
    const response = await axios.post(
      'http://localhost:8080/bikeRoutes/newRoute',
      {
        directions: routeWithoutWaypoints,
        name: 'TestRoute',
        category: 'Speedy',
        privacy: true,
        userId: 1,
      }
    );
    saveRoute = response.data;
  });

  it('Route is created with only origin and destination', () => {
    expect(saveRoute).to.deep.equal('Created');
  });

  beforeEach(async () => {
    const response = await axios.post(
      'http://localhost:8080/bikeRoutes/newRoute',
      {
        directions: routeWithWaypoints,
        name: 'TestRoute',
        category: 'Speedy',
        privacy: true,
        userId: 1,
      }
    );
    saveRoute = response.data;
  });

  it('Route is created with origin, destination, and waypoints', () => {
    expect(saveRoute).to.deep.equal('Created');
  });
});

describe('Fetch Routes from the Database', () => {});
