import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Report {
  id: string;
  title: string;
  body: string;
  type: string;
}

const Report = () => {
  const [mostRecentReport, setMostRecentReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchMostRecentReport = async () => {
      try {
        const response = await axios.get('/reports/most-recent');
        setMostRecentReport(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMostRecentReport();
  }, []);

  return (

<div>
      {mostRecentReport && (
        <div>
          <p>Most Recent Report:</p>
          <p>Title: {mostRecentReport.title}</p>
          <p>Type: {mostRecentReport.type}</p>
        <p>Body: {mostRecentReport.body}</p>
        </div>
      )}
    </div>
  );
};

export default Report;
