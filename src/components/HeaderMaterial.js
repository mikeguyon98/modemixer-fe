import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function HeaderMaterial() {
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/collections" className="flex items-center">
          Collections
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
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
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-black">
          <Typography
            as="h1"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Link to="/">ModeMixer</Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <div className="flex items-center gap-x-1">
              <Link to="/admin">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden bg-black text-white lg:inline-block"
                >
                  <span>Admin</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
