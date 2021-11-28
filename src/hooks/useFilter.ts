import Konva from 'konva';
import { useEffect, useState } from 'react';

export const useFilter = ({ selected, updateShape }) => {
  const previewFilter = ({
    type,
  }) => (e) => {
    const value = Number((e.target as HTMLInputElement).value);
    updateShape({
      id: selected,
      [type]: value,
    }, {
      saveHistory: false,
    });
  };

  const applyFilter = ({
    type,
  }) => (e) => {
    const value = Number((e.target as HTMLInputElement).value);
    updateShape({
      id: selected,
      [type]: value,
    });
  };

  return {
    applyFilter,
    previewFilter,
  };
};
