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
import ImageAndMedia from "../assets/ImageAndMedia.jsx";
import axios from "axios";

import { Layout, Menu, Button, Modal, Upload } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

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
      onClick: showModal,
    },
    {
      key: "8",
      icon: <FileOutlined />,
      label: "Profile",
    },
  ];

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("postCaption", "Example post caption");
    formData.append("media", file);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
    };

    // fetch(`${import.meta.env.VITE_API_URL}/api/v1/post/create`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Post created successfully:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating post:", error);
    //   });

    fetch("http://localhost:3000/api/v1/post/userposts", {
      method: "get",
      credentials: "include",
    })
      .then(async (res) => {
        console.log("---**success**-----");
        console.log(await res.text());
      })
      .catch((err) => {
        console.log("---**error**-----");
        console.log(err);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}>
      <Modal
        title='Create new post'
        open={open}
        centered
        footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            gap: "1rem",
          }}>
          <ImageAndMedia />
          <p
            style={{
              fontSize: "20px",
            }}>
            Drag photos and videos here
          </p>
          <div>
            <Upload
              name='media'
              action='/post/create'
              accept='.png,.jpg,.jpeg'
              showUploadList={false}
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}>
              <Button type='primary'>Select From Computer</Button>
            </Upload>
          </div>
        </div>
      </Modal>
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
          margin: "2% 5% 0 5%",
          width: "100%",
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
