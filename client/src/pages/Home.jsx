import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      // const res = await axios.get(`http://localhost:8888/api/videos/${type}`);
      const res = () => {
        return new Promise((resolve, reject) => {
          fetch(`/videos/${type}`)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        })
      };
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {Array.isArray(videos) && videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;