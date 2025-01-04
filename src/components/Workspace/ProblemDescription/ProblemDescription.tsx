import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import styled from "styled-components";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const Container = styled.div`
	background-color: #2C3E50;
	color: #ECF0F1;
	height: calc(113vh - 94px);
	overflow-y: auto;
`;

const Tab = styled.div`
	display: flex;
	align-items: center;
	padding: 16px 20px;
	background-color: #34495E;
	color: #ECF0F1;
	font-size: 0.875rem;
	font-weight: bold;
`;

const Content = styled.div`
	padding: 20px;
	overflow-y: auto;
`;

const ProblemHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const Title = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
`;

const Difficulty = styled.div<{ className: string }>`
	background-color: ${({ className }) => (className === "Easy" ? "#27ae60" : className === "Medium" ? "#f39c12" : "#e74c3c")};
	color: ${({ className }) => (className === "Easy" ? "#27ae60" : className === "Medium" ? "#f39c12" : "#e74c3c")};
	border-radius: 12px;
	padding: 4px 8px;
	font-size: 0.75rem;
	font-weight: bold;
`;

const InteractionBar = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8px;
`;

const InteractionButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: #34495E;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-right: 8px;

	&:hover {
		background-color: #3b5998;
	}
`;

const ExampleCard = styled.div`
	background-color: hsla(0, 0%, 100%, 0.1);
	border-radius: 0.5rem;
	color: rgba(239, 241, 246, 0.75);
	font-size: 0.98rem;
	line-height: 1.25rem;
	margin: 1rem 0;
	padding: 1rem;
	white-space: pre-wrap;
`;

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
	const [user] = useAuthState(auth);
	const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
	const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);

	const returnUserDataAndProblemData = async (transaction: any) => {
		const userRef = doc(firestore, "users", user!.uid);
		const problemRef = doc(firestore, "problems", problem.id);
		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);
		return { userDoc, problemDoc, userRef, problemRef };
	};

	const handleLike = async () => {
		if (!user) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				if (liked) {
					transaction.update(userRef, {
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes - 1,
					});

					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
					setData((prev) => ({ ...prev, liked: false }));
				} else if (disliked) {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
						dislikes: problemDoc.data().dislikes - 1,
					});

					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, liked: true, disliked: false }));
				} else {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
					setData((prev) => ({ ...prev, liked: true }));
				}
			}
		});
		setUpdating(false);
	};

	const handleDislike = async () => {
		if (!user) {
			toast.error("You must be logged in to dislike a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
			if (userDoc.exists() && problemDoc.exists()) {
				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});
		setUpdating(false);
	};

	const handleStar = async () => {
		if (!user) {
			toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};

	return (
		<Container>
			<Tab>
				Description
			</Tab>

			<Content>
				<ProblemHeading>
					<Title>{problem?.title}</Title>
					{!loading && currentProblem && (
						<Difficulty className={problemDifficultyClass}>
							{currentProblem.difficulty}
						</Difficulty>
					)}
				</ProblemHeading>

				{!loading && currentProblem && (
					<InteractionBar>
						<InteractionButton onClick={handleLike}>
							{liked && !updating && <AiFillLike className='text-dark-blue-s' />}
							{!liked && !updating && <AiFillLike />}
							{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
							<span className='text-xs'>{currentProblem.likes}</span>
						</InteractionButton>
						<InteractionButton onClick={handleDislike}>
							{disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
							{!disliked && !updating && <AiFillDislike />}
							{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
							<span className='text-xs'>{currentProblem.dislikes}</span>
						</InteractionButton>
						<InteractionButton onClick={handleStar}>
							{starred && !updating && <AiFillStar className='text-dark-yellow' />}
							{!starred && !updating && <TiStarOutline />}
							{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
						</InteractionButton>
					</InteractionBar>
				)}

				{loading && (
					<div className='mt-3 flex space-x-2'>
						<RectangleSkeleton />
						<CircleSkeleton />
						<RectangleSkeleton />
						<RectangleSkeleton />
						<CircleSkeleton />
					</div>
				)}

				<div className='text-white text-sm'>
					<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
				</div>

				<div className='mt-4'>
					{problem.examples.map((example, index) => (
						<div key={example.id}>
							<p className='font-medium text-white '>Example {index + 1}: </p>
							{example.img && <img src={example.img} alt='' className='mt-3' />}
							<ExampleCard>
								<p className='font-medium text-white '>
									<strong className='text-white'>Input: </strong> {example.inputText}
									<br />
									<strong>Output:</strong>
									{example.outputText} <br />
									{example.explanation && (
										<>
											<strong>Explanation:</strong> {example.explanation}
										</>
									)}
								</p>
							</ExampleCard>
						</div>
					))}
				</div>

				<div className='my-8 pb-4'>
					<div className='text-white text-sm font-medium'>Constraints:</div>
					<ul className='text-white ml-5 list-disc '>
						<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
					</ul>
				</div>
			</Content>
		</Container>
	);
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		// Get problem from DB
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore, "problems", problemId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty === "Easy" ? "bg-olive text-olive" :
					problem.difficulty === "Medium" ? "bg-dark-yellow text-dark-yellow" :
					"bg-dark-pink text-dark-pink"
				);
			}
			setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const userData = userSnap.data() || {};
				const { solvedProblems = [], likedProblems = [], dislikedProblems = [], starredProblems = [] } = userData;
				setData({
					liked: likedProblems.includes(problemId),
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}
