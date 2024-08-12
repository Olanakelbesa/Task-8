import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import userImg from "@/public/assets/user.png";

const NavBar = async () => {
	const session = await getServerSession(options);

	return (
		<div className="fixed w-full text-center">
			<nav className="flex justify-between p-4 md:px-10  border-solid border-2 shadow-[0_15px_20px_-18px_rgba(0,0,0,0.3)] bg-white">
				<div className=" text-xl px-20">
					<Link className="font-bold text-blue-800" href="/">
						Job List
					</Link>
				</div>
				<div className="flex gap-8">
					{session ? (
						<>
							<Link
								href="/dashboard"
								className="hover:border-2 hover:border-solid hover:border-blue-300 hover:border-opacity-50 hover:rounded-full px-2"
							>
								Opportunities
							</Link>
							<Link
								href="/bookmarks"
								className="hover:border-2 hover:border-solid hover:border-blue-300 hover:border-opacity-50 hover:rounded-full px-2"
							>
								Bookmarks
							</Link>

							<div className="flex gap-1 cursor-pointer pl-5">
								<Image
									src={
										session.user?.data.profilePicUrl
											? session.user?.data.profilePicUrl
											: userImg
									}
									alt="profile pic"
									width={"25"}
									height={"25"}
									className="md:pb-1 "
								/>
								<div>{session.user?.data.name}</div>
							</div>

							<Link
								href="/api/auth/signout?callbackUrl=/"
								className="hover:border-2 hover:border-solid hover:border-blue-300 hover:border-opacity-50 hover:rounded-full px-2 focus:"
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
