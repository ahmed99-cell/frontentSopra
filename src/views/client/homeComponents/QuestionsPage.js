import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";
import NewNavbar from "./NewNavbar";
import Header2 from "./Header2";
import { Link } from "react-router-dom";
import axios from 'axios';
import Pagination from './pagination';

const QuestionStat = styled.div`
  text-align: center;
  display: inline-block;
  font-size: 1.2rem;
  color: #aaa;
  margin-top: 6px;
  span {
    font-size: 0.7rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;

const QuestionTitleArea = styled.div`
  padding: 0px 30px;
`;

const Tag = styled.span`
  display: inline-block;
  margin-right: 5px;
  background-color: rgb(0 0 0 / 10%);
  color: #000000;
  padding: 7px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const QuestionLink = styled(Link)`
  text-decoration: none;
  color: #bc1434;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
`;

const StyledQuestionRow = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 50px) 1fr;
  border: 1px solid #dc3545;
  margin-bottom: 20px;
`;

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]); // State for questions
  const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [questionData, setQuestionData] = useState([]); // State for question data
    const [error, setError] = useState(null);

  const votreToken = localStorage.getItem('token');
  const handlePageChange = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  const fetchAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/questions/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: '', 
          content: '', 
          userId: null, 
          tags: [], 
          pageIndex: 0, 
          pageSize: 40, 
        })
      });
  
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setQuestionData(data); // Utilisez setQuestionData pour mettre à jour questionData
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("There was an error fetching questions:", error);
    }
  };
useEffect(() => {
  fetchAllQuestions();
  // FindFrequencyOfAns();
  // fetchVotes();

}, [votreToken]) // refetch questions when currentPage changes

const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = questionData.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNum => setcurrentPage(pageNum);
console.log(questionData);

return (
  <>
    <NewNavbar />
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header2 />
        <>
        {error && <p>{error}</p>}
        {currentPosts && currentPosts.map((question, index) => (
          <StyledQuestionRow key={index}>
            <QuestionStat>{question.votes || 0}<span>votes</span></QuestionStat>
            <QuestionStat>{question.answers || 0}<span>answers</span></QuestionStat>
            <QuestionStat>{question.views || 0}<span>views</span></QuestionStat>
            <QuestionTitleArea>
              <QuestionLink to={`/client/question/${question.id}`}>{question.title || 'No title'}</QuestionLink>
              <p>{question.content}</p> {/* Display the content of the question */}
            </QuestionTitleArea>
          </StyledQuestionRow>
        ))}
                                           
        <Pagination postsPerPage={postPerPage} totalPosts={questionData.length} paginate={paginate} />

        </>
      </div>
    </div>
  </>
);
};

export default QuestionsPage;