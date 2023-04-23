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
          const monthAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
          return reportCreatedAt >= monthAgo;
        });
        // Sort the filteredReports array by createdAt in descending order
        filteredReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReports(filteredReports);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div >
      <ReportsMap />
      <div id='reports-container' >
      <h2>Reports:</h2>

        {reports.map((report) => (
          <div key={report.id}>
            <h1>{report.type}</h1>
            <p>{report.title}</p>
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
