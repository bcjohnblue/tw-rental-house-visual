import React from 'react';

import Header from './header';
import Body from './body';

const Layout: React.FC = (props) => {
  return (
    <>
      <Header></Header>
      <Body>{props.children}</Body>
    </>
  );
};

export default Layout;
