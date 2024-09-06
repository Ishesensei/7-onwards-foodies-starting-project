'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
const MealsShareFormStatus = () => {
  const {pending} = useFormStatus();
  const result = pending? <button type="submit" disabled={pending}>Submitting...</button> : <button type="submit" disabled={pending}>Share Meal</button>  ;
  return <>{result}</>;
};

export default MealsShareFormStatus;
