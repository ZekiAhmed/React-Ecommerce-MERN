import { styled } from "@mui/material";

const ContainerDiv = styled("div")`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return (
    <ContainerDiv>Super Deal! Free Shipping on Orders Over $50</ContainerDiv>
  );
};

export default Announcement;
