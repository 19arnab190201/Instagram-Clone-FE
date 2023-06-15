import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";
import logo from "../assets/insta2.svg";
import HomeIcon from "../assets/HomeIcon.jsx";
import SearchIcon from "../assets/SearchIcon.jsx";
import ExploreIcon from "../assets/ExploreIcon.jsx";
import ReelsIcon from "../assets/ReelsIcon.jsx";
import MessagesIcon from "../assets/DMIcon.jsx";
import NotificationsIcon from "../assets/NotificationIcon.jsx";
import CreateIcon from "../assets/CreateIcon.jsx";
import { AiFillPlusCircle } from "react-icons/ai";
import ImageAndMedia from "../assets/ImageAndMedia.jsx";
import defaultImage from "../assets/default.png";

//Styles
import "./HomePage.css";

import axios from "axios";

import { Layout, Menu, Button, Modal, Upload, Drawer, Input } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const items = [
    {
      key: "1",
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      key: "2",
      icon: <SearchIcon />,
      label: "Search",
    },
    {
      key: "3",
      icon: <ExploreIcon />,
      label: "Explore",
    },
    {
      key: "4",
      icon: <ReelsIcon />,
      label: "Reels",
    },
    {
      key: "5",
      icon: <MessagesIcon />,
      label: "Messages",
    },
    {
      key: "6",
      icon: <NotificationsIcon />,
      label: "Notifications",
    },
    {
      key: "7",
      icon: <CreateIcon />,
      label: "Create",
    },
    {
      key: "8",
      icon: <FileOutlined />,
      label: "Profile",
    },
  ];

  const handleNavigation = (key) => {
    console.log(key);
    if (key === "1") {
      navigate("/");
    } else if (key === "2") {
      // navigate("/search");
      showDrawer();
    } else if (key === "3") {
      navigate("/explore");
    } else if (key === "4") {
      navigate("/reels");
    } else if (key === "5") {
      navigate("/messages");
    } else if (key === "6") {
      navigate("/notifications");
    } else if (key === "7") {
      navigate("/create");
    } else if (key === "8") {
      console.log("user", `/profile/${user.userName}`);
      navigate(`/profile/${user.userName}`);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    // Handle the search logic here
    console.log(value);
  };

  const getSearchResults = async (value) => {
    const source = axios.CancelToken.source();
    try {
      const searchResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/search?q=${value}`,
        { cancelToken: source.token }
      );
      console.log(searchResponse.data.users);
      setSearchResults(searchResponse.data.users);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled by user");
      } else {
        console.log(error);
      }
    }
  };

  // Call this function to cancel the API request
  const cancelRequest = () => {
    source.cancel("Request canceled by user");
  };

  useEffect(() => {
    if (searchText.length > 0) {
      getSearchResults(searchText);
    }
  }, [searchText]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}>
      <Sider
        style={{
          height: "100vh",
          // border: "1px solid #ff0000",
          borderInlineEnd: "1px solid rgba(5, 5, 5, 0.2)",

          position: "relative",
        }}
        width={250}
        breakpoint='lg'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}>
        <div>
          <img
            src={logo}
            alt='logo'
            style={{
              width: "100%",
              height: "50px",
              marginTop: "30px",
            }}
          />
        </div>

        <Menu
          style={{
            // border: "1px solid #ff0000",
            height: "100%",
          }}
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => handleNavigation(key)}
          mode='inline'
          items={items}
        />
        <Button
          type='text'
          style={{
            fontSize: "16px",
            // border: "1px solid #ff0000",
            width: "100%",
            height: 64,
            position: "absolute",
            bottom: 0,
          }}
        />
      </Sider>
      <div
        style={{
          position: "relative",
        }}>
        <Drawer
          style={{
            position: "absolute",
          }}
          title='Search'
          placement='left'
          closable={true}
          onClose={onClose}
          open={open}
          getContainer={false}>
          <div>
            <Input
              placeholder='Search'
              value={searchText}
              size='large'
              suffix={
                <AiFillPlusCircle
                  size={18}
                  color='#C8C8C8'
                  style={{
                    cursor: "pointer",
                    transform: "rotate(46deg)",
                  }}
                  onClick={() => setSearchText("")}
                />
              }
              style={{
                width: "100%",
                backgroundColor: "#EFEFEF",
                border: "1px solid #EFEFEF",
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={() => handleSearch(searchText)}
            />
            <div className='search-results-container'>
              {searchResults.map((user) => (
                <div
                  className='search-result'
                  onClick={() => {
                    navigate(`/profile/${user.userName}`);
                    onClose();
                  }}>
                  <div className='search-result-image'>
                    <img
                      width={36}
                      src={user.photo ? user.photo : defaultImage}
                      alt='profile'
                    />
                  </div>
                  <div className='search-result-details'>
                    <div className='search-result-username'>
                      {user.userName}
                    </div>
                    <div className='search-result-name'>{user.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>

      <div
        style={{
          margin: "2% 5% 0 5%",
          width: "100%",
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
