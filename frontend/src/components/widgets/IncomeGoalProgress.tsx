import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const IncomeGoalProgress = ({
  data,
}: {
  data: { achieved: number; goal: number; percentage: number };
}) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Income Goal Progress
      </h2>
      <CircularProgressbar
        value={data.percentage}
        text={`${data.percentage}%`}
        styles={buildStyles({
          textColor: "#4B5563",
          pathColor: "#6A994E",
          trailColor: "#F5F5F5",
        })}
      />
      <p className="mt-4 text-gray-500">
        Achieved: ${data.achieved.toLocaleString()} / $
        {data.goal.toLocaleString()}
      </p>
    </div>
  );
};

export default IncomeGoalProgress;
