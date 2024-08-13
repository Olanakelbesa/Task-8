import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import Dashboard from "@/components/Dashboard";
import useJobData from "@/utils/JobData";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "@/app/api/bookmarkApi";

// Mocking dependencies
jest.mock("@/utils/JobData");
jest.mock("next-auth/react");
jest.mock("@/app/api/bookmarkApi");

describe("Dashboard Component", () => {
	const mockJobData = [
		{
			id: "1",
			title: "Job 1",
			logoUrl: "",
			orgName: "Org 1",
			location: "Location 1",
			description: "Description 1",
			opType: "full-time",
		},
		{
			id: "2",
			title: "Job 2",
			logoUrl: "",
			orgName: "Org 2",
			location: "Location 2",
			description: "Description 2",
			opType: "part-time",
		},
	];

	const mockSession = {
		user: {
			accessToken: "mock-token",
		},
	};

	const mockUseJobData = useJobData as jest.Mock;
	const mockUseSession = useSession as jest.Mock;
	const mockGetBookmarks = getBookmarks as jest.Mock;
	const mockBookmarkCrud = BookmarkCrud as jest.Mock;

	beforeEach(() => {
		mockUseJobData.mockReturnValue({
			jobData: mockJobData,
			error: null,
			loading: false,
		});
		mockUseSession.mockReturnValue({ data: mockSession });
		mockGetBookmarks.mockResolvedValue([{ eventID: "1" }]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders correctly with job data", async () => {
		render(<Dashboard />);

		await waitFor(() => {
			expect(screen.getByText("Job 1")).toBeInTheDocument();
			expect(screen.getByText("Job 2")).toBeInTheDocument();
		});
	});

	it("displays loading state", () => {
		mockUseJobData.mockReturnValue({
			jobData: null,
			error: null,
			loading: true,
		});

		render(<Dashboard />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays an error message", () => {
		mockUseJobData.mockReturnValue({
			jobData: null,
			error: "Failed to fetch data",
			loading: false,
		});

		render(<Dashboard />);

		expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
	});

	it("handles bookmarking functionality", async () => {
		mockBookmarkCrud.mockResolvedValue({ success: true });

		render(<Dashboard />);

		await waitFor(() => {
			expect(screen.getByText("Job 1")).toBeInTheDocument();
		});

		const [bookmarkIcon] = screen.getAllByAltText(/Bookmarked|Unbookmarked/);

		await act(async () => {
			fireEvent.click(bookmarkIcon);
		});

		await waitFor(() => {
			expect(mockBookmarkCrud).toHaveBeenCalledWith("1", "mock-token", true);
		});

		// Simulate an API error during bookmark toggle
		mockBookmarkCrud.mockRejectedValueOnce(new Error("Bookmarking failed"));

		await act(async () => {
			fireEvent.click(bookmarkIcon);
		});

		// await waitFor(() => {
		// 	expect(
		// 		screen.getByText("Error updating bookmark: Bookmarking failed")
		// 	).toBeInTheDocument();
		// });
	});

	it("does not call BookmarkCrud if there is no session token", async () => {
		mockUseSession.mockReturnValue({ data: null });

		render(<Dashboard />);

		await waitFor(() => {
			expect(screen.getByText("Job 1")).toBeInTheDocument();
		});

		const [bookmarkIcon] = screen.getAllByAltText("Unbookmarked");

		await act(async () => {
			fireEvent.click(bookmarkIcon);
		});

		expect(mockBookmarkCrud).not.toHaveBeenCalled();
	});
});
