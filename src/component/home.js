import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";

const HomePage = () => {
  const [postList, setPostList] = useState([]);
  const [temp, setTemp] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getPostList();
  }, []);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  //const handleCreate = () => setShow(true);

  const getPostList = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPostList(response.data);
      const xx = response.data.map((obj) => {
        return {
          value: obj.title,
          label: obj.title,
        };
      });

      setOptions(xx);
    });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Success");
        }
      });
  };

  const updatePost = (obj) => {
    console.log(obj);
    setTemp(obj);
    setShow(true);
  };

  const handleUpdatePost = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${temp.id}`, temp)
      .then((response) => {
        if (response.status === 200) {
          alert("success");
          setShow(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateNew = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("success");
          setShow1(false);
          setData({
            title: "",
            body: "",
            userId: 1,
          });
        }
      });
  };

  return (
    <div>
      <h1>GuardianLink Task</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setShow1(true);
        }}
      >
        Add new Record
      </button>
      <Select options={options} placeholder="Search titles" />
      <table className="table table-striped table-hover" border="1">
        <thead>
          <tr>
            <th>
              <h4>Title</h4>
            </th>
            <th>
              <h4>Body</h4>
            </th>
            <th>
              <h4>Update</h4>
            </th>
            <th>
              <h4>Delete</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {postList.map((obj) => (
            <tr>
              <td>{obj.title}</td>
              <td>{obj.body}</td>
              <td>
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      updatePost(obj);
                    }}
                  >
                    Update
                  </button>
                </>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deletePost(obj.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="txtalign">Edit Text</Modal.Title>
        </Modal.Header>
        <div>
          {temp && (
            <>
              <div>
                <input
                  type="text"
                  className="label"
                  value={temp.title}
                  onChange={(e) => {
                    setTemp({ ...temp, title: e.target.value });
                  }}
                />
                <br />
                <br />
                <input
                  type="text"
                  className="label"
                  value={temp.body}
                  onChange={(e) => {
                    setTemp({ ...temp, body: e.target.value });
                  }}
                />
                <div>
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary label"
                    onClick={handleUpdatePost}
                  >
                    Update Post
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
      <div>
        <Modal show={show1} onHide={handleClose1}>
          <input
            type="text"
            className="label"
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
          <input
            type="text "
            className="label"
            value={data.body}
            onChange={(e) => {
              setData({ ...data, body: e.target.value });
            }}
          />
          <button
            type="button"
            className="btn btn-primary label"
            onClick={handleUpdateNew}
          >
            Create New Data
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
