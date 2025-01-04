import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import styled from "styled-components";

type TopbarProps = {
  problemPage?: boolean;
};

const TopbarContainer = styled.nav`
  background-color: #2C3E50;
  color: #ECF0F1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProblemTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* Aumentar el espacio entre los elementos */
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px; /* Aumentar el tamaño del botón */
  height: 45px; /* Aumentar el tamaño del botón */
  background-color: #34495E;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b5998;
  }

  span {
    margin-left: 8px;
    font-size: 0.875rem;
  }
`;

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const router = useRouter();
  const problemId = router.query.pid as string;
  const problem = problems[problemId] as Problem;

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <TopbarContainer>
      {problemPage && (
        <Navigation>
          <NavButton onClick={() => handleProblemChange(false)}>
            <FaChevronLeft />
          </NavButton>
          <ProblemTitle>{problem?.title}</ProblemTitle>
          <NavButton onClick={() => handleProblemChange(true)}>
            <FaChevronRight />
          </NavButton>
        </Navigation>
      )}
    </TopbarContainer>
  );
};

export default Topbar;
