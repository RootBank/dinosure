import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth';
import Link from 'next/link';

const Navbar = ({ currentPage }) => (
  <nav className='navbar'>

    <div className='container'>
      <div className='navbar-brand'>
        <Link href='/'>
          <a className='navbar-item'>
            <img style={{ height: '50px', maxHeight: 'unset' }} src='/static/logo.svg' alt='Logo' />
          </a>
        </Link>
        <label className='navbar-burger navbar-toggle burger' data-target='navbarMenuHero' htmlFor='nav-toggle-state'>
          <span />
          <span />
          <span />
        </label>
      </div>
      <div id='navbarMenuHero' className='navbar-menu nav-right nav-menu'>
        <div className='navbar-end'>
          {/* The following section the current page's navbar item to selected.
              It uses a ternery operator to perform the check on each item
           */}
          <Link href='/'><a className={`navbar-item ${currentPage === '/' ? 'is-active' : ''}`}>Home</a></Link>
          <Link href='/about'><a className={`navbar-item ${currentPage === '/about' ? 'is-active' : ''}`}>About</a></Link>
          <Link href='/contact'><a className={`navbar-item ${currentPage === '/contact' ? 'is-active' : ''}`}>Contact</a></Link>
          <Link href='/claim'><a className={`navbar-item ${currentPage === '/claim' && 'is-active'}`}>Claim</a></Link>
          <Link href='/log-in'>
            <span className='navbar-item'>
              <a className='button is-info is-inverted'>
                <span className='icon'>
                  <i className='fa fa-sign-in' />
                </span>
                <span>Log In</span>
              </a>
            </span>
          </Link>
        </div>
      </div>
    </div>
  </nav>);

Navbar.getInitialProps = (ctx) => {
  const loggedUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req);
  return {
    loggedUser,
    currentUrl: ctx.pathname,
    isAuthenticated: !!loggedUser
  };
};

export default Navbar;
