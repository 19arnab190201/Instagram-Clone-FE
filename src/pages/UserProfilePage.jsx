import React, { useState, useEffect } from "react";
import { Avatar, Button, Tabs } from "antd";
import defaultImage from "../assets/default.png";
import useAxios from "../hooks/useAxios";
import { useAuthContext } from "../hooks/useAuthContext";
import PostsContainer from "../components/PostsContainer";
import { FiLogOut } from "react-icons/fi";

//Styles
import "./UserProfilePage.css";

const UserPosts = ({ userId }) => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `api/v1/post/userposts/${userId}`,
    headers: JSON.stringify({ accept: "*/*" }),
  });
  console.log("user 33", response?.posts);
  return (
    <>
      {
        <div className='feed-posts-container'>
          <PostsContainer
            size={"small"}
            posts={!loading ? response?.posts : []}
          />
        </div>
      }
    </>
  );
};

const UserReels = ({}) => {
  return <>REELS</>;
};

const UserSaved = ({}) => {
  return <>SAVED</>;
};

const UserTagged = ({}) => {
  return <>TAGGED</>;
};

const UserProfilePage = () => {
  const { user } = useAuthContext();

  //API call to get user data
  const { response, loading, error } = useAxios({
    method: "get",
    url: `api/v1/userdashboard/${user?._id}`,
    headers: JSON.stringify({ accept: "*/*" }),
  });

  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log("response", response);
    console.log("loading", loading);
    console.log("error", error);

    if (response && !loading && !error) {
      setUserData(response.user);
    }
  }, [response, loading, error]);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className='user-profile-container'>
        <div className='user-information'>
          <div className='user-avatar'>
            <Avatar
              style={{ width: "10vw", height: "10vw" }}
              size='large'
              src={userData.photo ? userData.photo : defaultImage}
            />
          </div>
          <div className='user-details'>
            <div className='user-name'>
              <h2>{userData.userName}</h2>
              {userData.userName !== user.userName ? (
                <>
                  <Button
                    className='follow-button'
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                      backgroundColor: "#0095F6",
                      border: "none",
                      color: "white",
                    }}>
                    Follow
                  </Button>
                </>
              ) : (
                <></>
              )}

              {userData.userName === user.userName ? (
                <Button
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    backgroundColor: "#EFEFEF",
                    border: "none",
                  }}>
                  Edit Profile
                </Button>
              ) : (
                <Button
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    backgroundColor: "#EFEFEF",
                    border: "none",
                  }}>
                  Message
                </Button>
              )}

              <FiLogOut />
            </div>
            <div className='user-stats'>
              <div className='user-posts'>
                {console.log("user 22", userData)}
                <h3>{userData.userPosts?.length}</h3>
                <p>Posts</p>
              </div>
              <div className='user-followers'>
                <h3>{userData.userFollowers?.length}</h3>
                <p>Followers</p>
              </div>
              <div className='user-following'>
                <h3>{userData.userFollowing?.length}</h3>
                <p>Following</p>
              </div>
            </div>
            <div className='user-bio'>
              <h4>{userData.name}</h4>
              <p>
                {userData.bio}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                asperiores ipsum repellendus distinctio.
              </p>
              <p>{userData.website}</p>
            </div>
          </div>
        </div>
        <div className='user-highlights'>{/* TODO */}</div>
        <div className='user-posts-container'>
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                key: "1",
                label: "POSTS",
                children: <UserPosts userId={userData._id} />,
              },
              { key: "2", label: "REELS", children: <UserReels /> },
              { key: "3", label: "SAVED", children: <UserSaved /> },
              { key: "4", label: "TAGGED", children: <UserTagged /> },
            ]}
          />
        </div>
      </div>
    );
  }
};

export default UserProfilePage;
