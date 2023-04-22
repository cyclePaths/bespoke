import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';
import ReportsMap from './ReportsMap';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        const filteredReports = response.data.filter((report) => {
          const reportCreatedAt = new Date(report.createdAt);
          const currentDate = new Date();
          const monthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
          return reportCreatedAt >= monthAgo;
        });
        setReports(filteredReports);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);


  return (
    <div>
      <ReportsMap />
      <h2>Reports:</h2>
      <div id='reports-container'>
        {reports.map((report) => (
        <div key={report.id}>
          <p>{report.title}</p>
          <p>{report.type}</p>
          <p>
            Location: {report.location_lat}, {report.location_lng}
          </p>
        </div>
      ))}
      </div>

    </div>
  );
};

export default Reports;
