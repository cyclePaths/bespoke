import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';


const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
    <h2>Reports:</h2>
    {reports.map((report) => (
      <div key={report.id}>
        <p>Type: {report.type}</p>
        <p>Body: {report.body}</p>
        <p>
          Location: {report.location_lat}, {report.location_lng}
        </p>
      </div>
    ))}
  </div>
  );
};

export default Reports;

