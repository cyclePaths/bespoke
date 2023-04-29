import React, { useEffect } from 'react';

const ReportsList = ({ reports }) => {
  return (
    <div>
        jasdffgbsdfgh
      {reports.map((report) => (
        <img key={report.id} src={report.imgUrl} />
      ))}
    </div>
  );
};

export default ReportsList;
