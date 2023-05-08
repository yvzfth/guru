import React from 'react';
import NavLink from './NavLink';
import { useSSR } from '@nextui-org/react';
import MenuIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import AccountButton from './AccountButton';
import Image from 'next/image';
import SearchBar from './SearchBar';
const links: { [key: string]: string } = {
  Discover: 'discover',
  Communities: 'community',
  'How Guru Works': 'about',
  'Create Post ': 'create-post',
};

const Navbar = () => {
  const { isBrowser } = useSSR();
  const router = useRouter();
  const session = useSession();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pathname, setPathname] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // var element = document.getElementById('vert-dots');
    // if (element) {
    //   element.style.rotate = '90deg';
    //   element.style.transition = ' .3s ease-out';
    // }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // var element = document.getElementById('vert-dots');
    // if (element) {
    //   element.style.rotate = '0deg';
    //   element.style.transition = ' .5s ease-out';
    // }
    setAnchorEl(null);
  };
  React.useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);
  if (isBrowser)
    return (
      <div className=' bg-white dark:bg-black fixed top-0 left-0 right-0 flex py-2 z-[100] justify-around items-center border shadow-sm w-full '>
        <Link href='/'>
          <Image
            width={140}
            height={54}
            className='h-10 hidden md:block'
            src='/logo2.png'
            alt='logo'
          />
          <Image
            width={54}
            height={54}
            className='h-10 md:hidden'
            src='/logo1.png'
            alt='logo'
          />{' '}
        </Link>

        {/* <div className='relative rounded-md shadow-sm '>
        <input
          id='search'
          className='text-xs md:text-md py-2 pl-6 md:pl-10 w-full leading-3 md:leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm'
          placeholder='Search on Guru'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='absolute inset-y-0 left-0 pl-1 md:pl-3 flex items-center pointer-events-none'>
          <svg
            className='h-5 w-5 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div> */}
        <SearchBar />
        <div className='hidden lg:flex space-x-2 lg:space-x-4'>
          {Object.keys(links).map((link) => (
            <NavLink key={link} title={link} path={links[link]} />
          ))}
        </div>
        <div className='flex space-x-4   items-center'>
          <div className='lg:hidden'>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
              className='text-white p-0'
            >
              <MenuIcon
                id='menuicon'
                className='text-4xl text-[rgb(9,87,243)]'
              />
            </IconButton>
            <Menu
              id='long-menu'
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  marginTop: '.5rem',
                  maxHeight: 48 * 4.5,
                  width: 'fit-content',
                },
              }}
            >
              {Object.keys(links).map((link) => {
                return (
                  <Link key={link} href={'/' + links[link]}>
                    <MenuItem
                      selected={'/' + links[link] === pathname}
                      onClick={handleClose}
                    >
                      {link}
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </div>
          {session.status === 'authenticated' ? (
            <AccountButton />
          ) : (
            // <div onClick={() => signOut()}>
            //   <Avatar>
            //     <img src={session.data?.user?.image!} alt='' />
            //   </Avatar>
            // </div>
            <div className='flex gap-2'>
              <Button rounded light auto onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button
                rounded
                auto
                onClick={() => router.push('/login?signup=true')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  else {
    return <div>Loading...</div>;
  }
};

export default Navbar;
