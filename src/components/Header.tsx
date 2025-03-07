import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBtn
} from "mdb-react-ui-kit";
import { useAppSelector } from "../redux/hooks";
import { setUnLoggedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";



type HeaderType = {
  appTitle: string;
};


const Header = ({ appTitle }: HeaderType) => {
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  const user = useAppSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addPost = async () => {
    navigate(`/add-post`);
  };

  return (
    <div>
      <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">{appTitle}</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColorThird(!showNavColorThird)}>
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColorThird} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink aria-current="page" href="/">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">Login</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/news">News</MDBNavbarLink>
              </MDBNavbarItem>
              {user?.id && user?.role === 'admin'?(
                <MDBNavbarItem>
                  <button className="btn btn-success" onClick={addPost}>
                    Add post
                  
                  </button>
                </MDBNavbarItem>) : null
              }
              {user?.id ?(
                <MDBNavbarItem>
                  <MDBBtn style={{position:"absolute"}}
                    onClick={() => {
                      dispatch(setUnLoggedUser());
                      navigate("/");
                    }}>
                    Log out
                  </MDBBtn>
                </MDBNavbarItem>): null
              }
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
