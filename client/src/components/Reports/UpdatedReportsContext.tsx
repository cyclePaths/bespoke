// UpdatedReportsContext.tsx
import React from 'react';
import { Report } from '@prisma/client';

const UpdatedReportsContext = React.createContext<Report[] | null>(null);

export default UpdatedReportsContext;
