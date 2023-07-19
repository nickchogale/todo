import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import ReactPaginate from "react-paginate";

import { useParams } from "react-router-dom";
import TaskList from "../components/TaskList";

const Task = () => {
  // console.log("i am here!");
  const [task, setTask] = useState([]);
  const [error, setError] = useState();

  //const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  //   const TASKS = [
  //     {
  //       id: "t1",
  //       title: "working",
  //       status: "completed",
  //       uid: "u1",
  //     },
  //     {
  //       id: "t2",
  //       title: "dance",
  //       status: "pending",
  //       uid: "u1",
  //     },
  //     {
  //       id: "t3",
  //       title: "reading",
  //       status: "started",
  //       uid: "u2",
  //     },
  //     {
  //       id: "t4",
  //       title: "attending lecture",
  //       status: "completed",
  //       uid: "u2",
  //     },
  //   ];

  const userid = localStorage.getItem("userID");

  // const s = async () => {
    // try {
    //   const response = await axios.get(
    //     `http://localhost:5000/api/tasks/user/${userid}`
    //   );

    //   setTask(response.data.tasks);
    //   console.log(response.tasks);
    // } catch (error) {
    //   setError({ message: error.response.data.message });
    // }
  // };

  // useEffect(() => {
  //   s();
  // }, []);

  useEffect(() => {
    currentPage.current = 1;
    // getAllUser();
    getPaginatedTasks();
  }, []);

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedTasks();
  }


    const getPaginatedTasks = async () => {
         try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/user/${userid}/paginatedtask?page=${currentPage.current}&limit=${limit}`
      );

      setPageCount(response.data.pageCount);
      setTask(response.data.result);
      console.log(response);
      console.log(task);
    } catch (error) {
      console.log(error);
      //setError({ message: error.response.data.message });
    }


      // fetch(
      //   `http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      //   {
      //     method: "GET",
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data, "userData");
      //     setPageCount(data.pageCount);
      //     setData(data.result);
      //   });
    }

  // const userId = useParams().userId;
  // const loadedTasks = TASKS.filter(task => task.uid === userId);

  return (
    <>
      
      <div className="container">
        <TaskList tasks={task} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current - 1}
      />
    </>
  );
};

export default Task;
