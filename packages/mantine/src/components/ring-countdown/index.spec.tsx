import React from "react";
import { TestWrapper, render } from "@test";

import { RingCountdown } from ".";

jest.useFakeTimers();

describe("RingCountdown", () => {
    it("should render CircularDeterminate", () => {
        const { getByText } = render(
            <RingCountdown undoableTimeout={5} message="test" />,

            {
                wrapper: TestWrapper({}),
            },
        );

        getByText("test");
        expect(getByText("5")).toBeTruthy();
        jest.advanceTimersByTime(1100);

        expect(getByText("4")).toBeTruthy();
    });

    it("should render CircularDeterminate with undoableTimeout is 0", () => {
        const { getByText } = render(
            <RingCountdown undoableTimeout={0} message="test" />,

            {
                wrapper: TestWrapper({}),
            },
        );

        getByText("test");
        expect(getByText("0")).toBeTruthy();
        jest.advanceTimersByTime(1100);

        expect(getByText("0")).toBeTruthy();

        jest.advanceTimersByTime(1100);

        expect(getByText("0")).toBeTruthy();
    });
});
