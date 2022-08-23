import React from 'react';

import './header.css';

const Header = () => {
	return (
		<header>
			<a className='logo' href='/'>
				<span className='bold'>Mark</span><span className='thin'>Pars</span>
			</a>
		</header>
	)
}

export default Header;