import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import styled from "styled-components";
import Swal from "sweetalert2";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #2c3e50;
	position: relative;
	overflow: hidden;
	height: 100vh;
`;

const EditorContainer = styled.div`
	flex: 1;
	overflow: auto;
`;

const TestCaseContainer = styled.div`
	flex: 1;
	padding: 20px;
	overflow: auto;
	background-color: #34495e;
	border-top: 1px solid #2c3e50;
`;

const TestCaseHeading = styled.div`
	display: flex;
	height: 40px;
	align-items: center;
	gap: 20px;
`;

const TestCaseTab = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
`;

const TabLabel = styled.div`
	font-size: 0.875rem;
	font-weight: 500;
	color: #ecf0f1;
`;

const TabHighlight = styled.hr`
	position: absolute;
	bottom: 0;
	height: 2px;
	width: 100%;
	border: none;
	background-color: #ecf0f1;
	border-radius: 1px;
`;

const TestCases = styled.div`
	display: flex;
	margin-top: 20px;
`;

const TestCase = styled.div<{ isactive: boolean }>`
	margin-right: 10px;
	margin-top: 10px;
	padding: 10px 20px;
	border-radius: 8px;
	background-color: ${({ isactive }) => (isactive ? "#3b5998" : "#34495e")};
	color: ${({ isactive }) => (isactive ? "#ecf0f1" : "#95a5a6")};
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;

	&:hover {
		background-color: #3b5998;
		color: #ecf0f1;
	}
`;

const InputOutputContainer = styled.div`
	margin-top: 20px;
`;

const Label = styled.p`
	font-size: 0.875rem;
	font-weight: 500;
	color: #ecf0f1;
	margin-top: 10px;
`;

const CodeContainer = styled.div`
	width: 100%;
	cursor: text;
	border-radius: 8px;
	padding: 10px 20px;
	background-color: #34495e;
	color: #ecf0f1;
	margin-top: 10px;
	white-space: pre-wrap; /* Asegura que los saltos de línea se mantengan */
`;

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);

	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const {
		query: { pid },
	} = useRouter();

	const handleRun = () => {
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					Swal.fire({
						icon: 'success',
						title: 'All test cases passed!',
						background: '#2c3e50',
						color: '#ecf0f1',
						confirmButtonColor: '#1abc9c'
					});
				}
			}
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Test case failed',
				text: error.message,
				background: '#2c3e50',
				color: '#ecf0f1',
				confirmButtonColor: '#e74c3c'
			});
		}
	};

	const handleSubmit = async () => {
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					Swal.fire({
						icon: 'success',
						title: 'Congrats! All tests passed!',
						background: '#2c3e50',
						color: '#ecf0f1',
						confirmButtonColor: '#1abc9c'
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
					setSolved(true);
				}
			}
		} catch (error: any) {
			Swal.fire({
				icon: 'error',
				title: 'Submission error',
				text: error.message,
				background: '#2c3e50',
				color: '#ecf0f1',
				confirmButtonColor: '#e74c3c'
			});
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		setUserCode(code ? JSON.parse(code) : problem.starterCode);
	}, [pid, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<Container>
			<PreferenceNav settings={settings} setSettings={setSettings} />
			<Split className='h-full' direction='vertical' sizes={[60, 40]} minSize={60}>
				<EditorContainer>
					<CodeMirror
						value={userCode}
						theme={vscodeDark}
						onChange={onChange}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>
				</EditorContainer>
				<TestCaseContainer>
					<TestCaseHeading>
						<TestCaseTab>
							<TabLabel>Testcases</TabLabel>
							<TabHighlight />
						</TestCaseTab>
					</TestCaseHeading>

					<TestCases>
						{problem.examples.map((example, index) => (
							<TestCase
								key={example.id}
								isactive={activeTestCaseId === index}
								onClick={() => setActiveTestCaseId(index)}
							>
								Case {index + 1}
							</TestCase>
						))}
					</TestCases>

					<InputOutputContainer>
						<Label>Input:</Label>
						<CodeContainer>{problem.examples[activeTestCaseId].inputText}</CodeContainer>
						<Label>Output:</Label>
						<CodeContainer>{problem.examples[activeTestCaseId].outputText}</CodeContainer>
					</InputOutputContainer>
				</TestCaseContainer>
			</Split>
			<EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} />
		</Container>
	);
};

export default Playground;
