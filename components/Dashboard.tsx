"use client";
import Header from "./Header";
import JobCard from "./JobCard";
import useJobData from "../utils/JobData";
import Link from "next/link";
import SignOut from "./SignOut";

const Dashboard = () => {
	const { jobData, error, loading } = useJobData();

	return (
		<div className=" h-full w-full max-w-6xl pl-5 m-auto">
			<SignOut />
			<Header num={jobData?.length ?? 0} />

			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			{jobData &&
				jobData.length > 0 &&
				jobData.map((job, index) => (
					<Link href={`/JobDes/${index}`} key={index}>
						<JobCard job={job} key={index} />
					</Link>
				))}
			{jobData && jobData.length === 0 && <div>No job listings available</div>}
		</div>
	);
};

export default Dashboard;
