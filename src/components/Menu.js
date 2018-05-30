import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Display, Text } from '@carto/airship'

const Menu = () => (
  <header className="menu">
      <Display as="h2" className="menu__title">Isthmus React</Display>
        <NavLink to="/" activeClassName="is-active" exact={true}>
          <Text as="h2" className="menu__item_first">Explore</Text>
        </NavLink>
        <NavLink to="/help" activeClassName="is-active">
          <Text as="h2" className="menu__item">Help</Text>
        </NavLink>
  </header>
);


export default Menu;
