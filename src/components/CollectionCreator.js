
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
   
  export default function CollectionCreator() {
    return (
      <Menu>
        <MenuHandler>
          <Button className="bg-brand">Collection Creator</Button>
        </MenuHandler>
        <MenuList>
          <Link to='/admin'>
            <MenuItem>Create Collection</MenuItem>
          </Link>
          <MenuItem>Edit Collection</MenuItem>
        </MenuList>
      </Menu>
    );
  }