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
  const handleCreate = () => setShow(true);

  console.log("execute", postList);

  const test = ({ x = 100, y = 200 }) => {
    console.log(x, y);
  };

  const sample = { x: 20, y: 30 };
  const getPostList = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      //   console.log(response);
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
        // console.log(response);
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
        console.log(response);
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

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  return (
    <div>
      <button
        type="button"
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
            <th>Title</th>
            <th>Body</th>
            <th>Update</th>
            <th>Delete</th>
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
          <Modal.Title>Edit Text</Modal.Title>
        </Modal.Header>
        <div>
          {temp && (
            <>
              <div>
                <input
                  type="text"
                  value={temp.title}
                  onChange={(e) => {
                    setTemp({ ...temp, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  value={temp.body}
                  onChange={(e) => {
                    setTemp({ ...temp, body: e.target.value });
                  }}
                />
                <div>
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
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
          <input
            type="text "
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
