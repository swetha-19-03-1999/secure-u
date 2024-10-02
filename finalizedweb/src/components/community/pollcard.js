import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie(props) {
    const {pollData} =props
   
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => ` ${item.value}`,
          arcLabelMinAngle: 45,
         
          data: pollData,
        },
      ]}
      height={200}
    />
  );
}