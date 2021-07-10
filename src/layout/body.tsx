import React from 'react';

const Body: React.FC = (props) => {
  return <div className="w-full flex justify-center p-4">{props.children}</div>;
};

export default Body;
