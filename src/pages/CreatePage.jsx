import React, { useState, useEffect } from "react";
import { Modal, Upload, Button } from "antd";
import ImageAndMedia from "../assets/ImageAndMedia";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      navigate("/");
    }
  }, [open]);

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

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/post/create`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });

    // fetch("http://localhost:3000/api/v1/post/userposts", {
    //   method: "get",
    //   credentials: "include",
    // })
    //   .then(async (res) => {
    //     console.log("---**success**-----");
    //     console.log(await res.text());
    //   })
    //   .catch((err) => {
    //     console.log("---**error**-----");
    //     console.log(err);
    //   });
  };

  return (
    <div>
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
      {/* <h1
        style={{
          fontWeight: 500,
        }}>
        Create
      </h1> */}
    </div>
  );
};

export default CreatePage;
