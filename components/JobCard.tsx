"use client";

import React from "react";
import Image from "next/image";
import { JobDetails } from "@/types/JobDetails";

interface JobCardProps {
	job: JobDetails;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	function capitalizeFirstLetter(string: string): string {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return (
		<div className="p-5 border-solid border-2 border-sky-200 rounded-2xl cursor-pointer mb-5 mr-3 hover:bg-slate-100">
			<div className="flex">
				<Image
					src={job.logoUrl}
					alt={job.title}
					width={50}
					height={50}
					className="py-1"
				/>
				<div className="ml-8">
					<h2 className="font-bold">{job.title}</h2>
					<p className="text-gray-400 text-sm py-2">
						{job.orgName} . {job.location}
					</p>
				</div>
			</div>
			<div className="pl-20 text-sm">
				<div className="pr-3">
					<span>{job.description}</span>
				</div>
				<div className="flex gap-2 mt-7">
					<button className="rounded-xl p-2 border-solid border-2 border-green-300 text-green-500 hover:bg-green-100 ">
						{capitalizeFirstLetter(job.opType)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
