import React from 'react';
import './MainForm.css';

const MainForm = ({ children }: { children: JSX.Element }) => {
  return <div className="main__form">{children}</div>;
};

export default MainForm;
