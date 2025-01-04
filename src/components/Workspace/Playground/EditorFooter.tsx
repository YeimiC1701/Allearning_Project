import React from "react";
import { BsChevronUp } from "react-icons/bs";
import styled from "styled-components";

type EditorFooterProps = {
	handleRun: () => void;
	handleSubmit: () => void;
};

const FooterContainer = styled.div`
	display: flex;
	background-color: #2c3e50;
	position: absolute;
	bottom: 0;
	width: 100%;
	z-index: 10;
	padding: 10px 20px;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
	display: flex;
	align-items: center;
`;

const RightSection = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
`;

const Button = styled.button`
	padding: 10px 15px;
	font-size: 0.875rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	border: none;
	border-radius: 8px;
	transition: background-color 0.3s ease, transform 0.3s ease;
	cursor: pointer;
	margin-right: 10px;

	&:hover {
		transform: translateY(-2px);
	}
`;

const ConsoleButton = styled(Button)`
	background-color: #34495e;
	color: #bdc3c7;

	&:hover {
		background-color: #3b5998;
	}
`;

const RunButton = styled(Button)`
	background-color: #1abc9c;
	color: #ecf0f1;

	&:hover {
		background-color: #16a085;
	}
`;

const SubmitButton = styled(Button)`
	background-color: #e74c3c;
	color: #ecf0f1;

	&:hover {
		background-color: #c0392b;
	}
`;

const ChevronIcon = styled(BsChevronUp)`
	margin-left: 8px;
	color: #bdc3c7;
`;

const EditorFooter: React.FC<EditorFooterProps> = ({ handleRun, handleSubmit }) => {
	return (
		<FooterContainer>
			<LeftSection>
				<ConsoleButton>
					Console
					<ChevronIcon />
				</ConsoleButton>
			</LeftSection>
			<RightSection>
				<RunButton onClick={handleRun}>Run</RunButton>
				<SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
			</RightSection>
		</FooterContainer>
	);
};

export default EditorFooter;
