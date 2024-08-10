import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const NavBar = async () => {
	const session = await getServerSession(options);

	return (
		<div className="fixed w-full ">
			<nav className="flex justify-between p-4 px-20 border-solid border-2 shadow-[0_15px_20px_-18px_rgba(0,0,0,0.3)] bg-white">
				<div className=" text-xl">
					<Link className="font-bold text-blue-800" href="/">
						Job List
					</Link>
				</div>
				<div className="flex gap-10">
					{session ? (
						<>
							<Link
								href="/dashboard"
								className="hover:border-2 hover:border-solid hover:border-blue-300 hover:rounded-full px-2"
							>
								Dashboard
							</Link>
							<Link
								href="/api/auth/signout?callbackUrl=/"
								className="hover:border-2 hover:border-solid hover:border-blue-300 hover:rounded-full px-2"
							>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link
								href="/api/auth/signin?callbackUrl=/dashboard"
								className="hover:border-2 hover:border-solid hover:border-blue-100 hover:rounded-full px-2"
							>
								Login
							</Link>
							<Link
								href="/signup"
								className="hover:border-2 hover:border-solid hover:border-blue-100 hover:rounded-full px-2"
							>
								Signup
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
