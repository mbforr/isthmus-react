import React from 'react';
import { connect } from 'react-redux';
import HeaderToggle from './header/HeaderToggle'
import HeaderLink from './header/HeaderLink'
import Avatar from './Avatar'

const Header = () => {
  return(
    <header className="as-toolbar">
      <HeaderToggle />
    <div className="as-toolbar__group">
      <div className="as-toolbar__item">
        <Avatar
          size='l'
          alt='Isthmus'
          icon="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LNBHPmcyIcNeWf3W50m%2Favatar.png?generation=1537815172519034&alt=media"
        />
      </div>
      </div>
      <nav className="as-toolbar__actions">
        <ul>
          <HeaderLink name='Home' link='/' />
          <HeaderLink name='Another Map' link='/page' />
          <HeaderLink name='Help' link='/help' />
        </ul>
      </nav>

    <div className="as-toolbar__item as-body">
      <i className="as-icon as-icon-settings as-subheader as-m--0"></i>
    </div>

  </header>
  );
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

export default connect(mapStateToProps)(Header);
