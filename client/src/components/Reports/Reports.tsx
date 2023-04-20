

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Report = {
  id: number;
  title: string;
  body: string;
  type: string;
}

const Reports: React.FC = () => {

  const [reports, setReports] = useState<Report[]>([]);


  useEffect(() => {
    const fetchReports = async () => {
      try{
        const response = await axios.get('/reports');
        setReports(response.data);
      }catch (error){
        console.error(error);
      }
    };
    fetchReports();
  }, [])

  return (
    <div>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <p>{report.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}