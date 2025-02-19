import React from "react";
import { Route, Routes } from "react-router-dom";

import { act, fireEvent, render, TestWrapper } from "@test";
import { CreateButton } from "./";

describe("Create Button", () => {
    const create = jest.fn();

    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(jest.fn());
        jest.useFakeTimers();
    });

    it("should render button successfuly", async () => {
        const { container, getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("Create");
    });

    it("should render text by children", async () => {
        const { container, getByText } = render(
            <CreateButton>refine</CreateButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", async () => {
        const { container, queryByText } = render(<CreateButton hideText />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
        expect(queryByText("Create")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(
            <CreateButton>Create</CreateButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Create").closest("button")).toBeDisabled();
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <CreateButton ignoreAccessControlProvider>Create</CreateButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Create").closest("button")).not.toBeDisabled();
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(
            <CreateButton>Create</CreateButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () =>
                            Promise.resolve({
                                can: false,
                                reason: "Access Denied",
                            }),
                    },
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Create").closest("button")).toBeDisabled();

        expect(
            getByText("Create").closest("button")?.getAttribute("title"),
        ).toBe("Access Denied");
    });

    it("should render called function successfully if click the button", async () => {
        const { getByText } = render(
            <CreateButton onClick={() => create()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(create).toHaveBeenCalledTimes(1);
    });

    it("should redirect create route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource" element={<CreateButton />} />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(window.location.pathname).toBe("/posts/create");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <CreateButton resourceNameOrRouteName="custom-route-posts" />
                    }
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "custom-route-posts" },
                        },
                        { name: "posts" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Create"));
        });

        expect(window.location.pathname).toBe("/custom-route-posts/create");
    });
});
