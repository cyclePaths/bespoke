import React, { useState } from 'react';
import axios from 'axios';
/*
 -Submitting the report will save to the same table as "post"
with some field to signify it as a report so it's view on the map can be managed.
 -Type will have limited options.  Hazard(road, theft) POI(resource(water fountain, repair station, bike shop))
 -Location field will be necessary to render to map (geolocation)
*/
const CreateReport = () => {
  //  add state
  const [body, setBody] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  //  function to handle text inputs
  const handleTypeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reportType = (document.getElementById('report-type-input') as HTMLInputElement)?.value;
    setType(reportType || '');
  };

  const handleBodyText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reportBody = (document.getElementById('report-body-input') as HTMLInputElement)?.value;
    setBody(reportBody || '');
  };
  // function to handle image file input
  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  //  function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/reports', {
        body: body,
        type: type,
      });
      console.log(response.data); // log response data
      // clear input fields
      setBody('');
      setType('');
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id='report-type-input'
            type='text'
            placeholder='Report Type'
            onChange={handleTypeText}
          />
          <input
            id='report-body-input'
            type='text'
            placeholder='Comments'
            onChange={handleBodyText}
          />
          <input type='file' accept='image/*' onChange={handleImage} />{' '}
          {/* new file input */}
          <input type='submit' value='submit' />
        </form>
        <p>Report Body: {body}</p>
        <p>Report Type: {type}</p>
      </div>
    </div>
  );
};

export default CreateReport;
