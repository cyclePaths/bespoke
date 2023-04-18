import React from 'react';



/*
 -Submitting the report will save to the same table as "post"
with some field to signify it as a report so it's view on the map can be managed.
 -Type will have limited options.  Hazard(road, theft) POI(resource(water fountain, repair station, bike shop))
 -Location field will be necessary to render to map (geolocation)
*/
const CreateReport = () => {



  return (
    <div>
      <div>
      <input id="report-type-input" type="text" placeholder='Report Type'/>
      <input id="report-body-input" type="text" placeholder='Comments'/>
      <input type="submit" value='submit' />
      </div>
    </div>
  );
};

export default CreateReport;