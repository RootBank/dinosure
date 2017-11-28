import Link from 'next/link';
import React from 'react';

// const LoginElements = ({isAuthenticated, currentPage}) => {
//   if (isAuthenticated) {
//     return [
//       <Link key={'account'} prefetch href='/my-account'><a className={`navbar-item ${currentPage === '/my-account' ? 'is-active' : ''}`}>My Account</a></Link>,
//       <Link key={'logout'} prefetch href='/auth/log-out'>
//         <a className='navbar-item'>
//           <button className='button is-primary is-inverted'>
//             <span className='icon'>
//               <i className='fa fa-sign-in' />
//             </span>
//             <span>Log out</span>
//           </button>
//         </a>
//       </Link>
//     ];
//   } else {
//     return (
//       <Link prefetch href='/auth/log-in'>
//         <span className='navbar-item'>
//           <a className='button is-primary is-inverted'>
//             <span className='icon'>
//               <i className='fa fa-sign-in' />
//             </span>
//             <span>Log In</span>
//           </a>
//         </span>
//       </Link>
//     );
//   }
// };

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenuVisibility () {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render () {
    const { currentPage } = this.props;
    return (
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <Link prefetch href='/'>
              <a className='navbar-item'>
                <img style={{ height: '50px', maxHeight: 'unset' }} src='/static/logo.svg' alt='Logo' />
              </a>
            </Link>
            <label onClick={this.toggleMenuVisibility.bind(this)} className='navbar-burger navbar-toggle burger' >
              <span />
              <span />
              <span />
            </label>
          </div>
          <div id='navbarMenuHero' className={`navbar-menu nav-right nav-menu ${this.state.menuOpen ? 'is-active' : ''}`}>
            <div className='navbar-end'>
              {/* The following section the current page's navbar item to selected.
                  It uses a ternery operator to perform the check on each item
               */}
              <Link prefetch href='/'><a className={`navbar-item ${currentPage === '/' ? 'is-active' : ''}`}>Home</a></Link>
              <Link prefetch href='/about'><a className={`navbar-item ${currentPage === '/about' ? 'is-active' : ''}`}>About</a></Link>
              <Link prefetch href='/contact'><a className={`navbar-item ${currentPage === '/contact' ? 'is-active' : ''}`}>Contact</a></Link>
              <Link prefetch href='/claim'><a className={`navbar-item ${currentPage === '/claim' && 'is-active'}`}>Claim</a></Link>
              {/* Commenting this out for now for the demo:
                <LoginElements isAuthenticated={isAuthenticated} currentPage={currentPage} />
               */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
