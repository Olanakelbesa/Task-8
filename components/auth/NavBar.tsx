import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/lib/options";

const NavBar = async () => {
	const session = await getServerSession(options);
	return (
		<nav className="flex justify-between p-3 px-20 bg-blue-900 text-white">
			<div className=" text-xl">
				<Link className="text-bold" href="/">
					Job List
				</Link>
			</div>
			<div className="flex gap-10">
				<div>
					<Link href="/dashboard">DashBoard</Link>
				</div>
				{session ? (
					<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
				) : (
					<Link href="/api/auth/signin?callbackUrl=/dashboard">Login</Link>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
