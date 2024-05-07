// src/components/Spinner.js
import React from "react";
import { Spinner } from '@material-tailwind/react';

const SpinnerComp = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
      Loading...
    </div>
  );
};

export default SpinnerComp;
