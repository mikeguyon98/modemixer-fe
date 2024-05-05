import React from "react";
import { Link } from "react-router-dom";
import CollectionCreator from "./CollectionCreator";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

export function StickyNavbar({ children }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="h5" className="p-1 font-normal text-brand">
        <Link
          to="/collections"
          className="flex items-center hover:text-brand-dark"
        >
          Collections
        </Link>
      </Typography>
      <Typography as="li" variant="h5" className="text-brand p-1 font-normal">
        <Link to="/" className="flex items-center hover:text-brand-dark">
          About
        </Link>
      </Typography>
      {/* <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to="/admin" className="flex items-center">
              Admin
            </Link>
          </Typography> */}
    </ul>
  );

  return (
    <div className="-m-6 max-h-screen overflow-scroll">
      <Navbar className="sticky top-3 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center lg:mt-4 mt-2 justify-between">
          <Typography
            variant="h3"
            className="ml-10 text-brand ext-xl cursor-pointer font-bold"
          >
            <Link to="/" className="flex items-center hover:text-brand-dark">
              ModeMixer
            </Link>
          </Typography>
          <div className="flex items-center gap-4 mr-12">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <CollectionCreator />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Link to="/admin">
              <Button fullWidth variant="text" size="sm" className="">
                <span>Admin</span>
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
      <div className="mt-4">{children}</div>
    </div>
  );
}
