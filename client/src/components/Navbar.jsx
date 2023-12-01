import React from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";

const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({ theme }) => theme.bgLighther};
height:56px;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
height: 100%;
padding: 0 20px;
justify-content: flex-end;
position: relative;
`

const Search = styled.div`
position: absolute;
width: 40%;
left:0;
right:0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px
`

const Input = styled.input`
border: none;
background-color: transparent;
`
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' />
          <SearchOutlinedIcon />
        </Search>
        <Link to="signin" style={{ textDecoration: "none" }}>
          <Button><AccountCircleOutlinedIcon /> Sign In</Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Navbar