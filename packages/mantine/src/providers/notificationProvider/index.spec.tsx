import React from "react";
import * as MantineNotifications from "@mantine/notifications";

import { OpenNotificationParams } from "@pankod/refine-core";

import { RingCountdown } from "@components/ring-countdown";

import { notificationProviderHandle } from ".";

const cancelMutationMock = jest.fn();

const mockNotification: OpenNotificationParams = {
    key: "test-notification",
    message: "Test Notification Message",
    type: "success",
};

const mockNotificationUndoable: OpenNotificationParams = {
    key: "test-notification-undoable",
    message: "Undo Test Notification Message",
    type: "progress",
    undoableTimeout: 5,
    cancelMutation: cancelMutationMock,
};

describe("Notistack notificationProvider", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const showMock = jest.fn();

    const hideMock = jest.fn();

    const showNotification = jest.spyOn(
        MantineNotifications,
        "showNotification",
    );

    const hideNotification = jest.spyOn(
        MantineNotifications,
        "hideNotification",
    );

    showNotification.mockImplementation(showMock);
    hideNotification.mockImplementation(hideMock);

    const notificationProvider = notificationProviderHandle();

    // This test cover the case when the type is not "progress" ("success" or "error")

    it("should render notification snack with success type ", () => {
        notificationProvider.open(mockNotification);

        expect(showMock).toHaveBeenCalled();
        expect(showMock).toHaveBeenCalledWith(
            expect.objectContaining({
                message: mockNotification.message,
                autoClose: 5000,
                color: "green",
            }),
        );
    });

    it("should render error notification if type set as error", async () => {
        notificationProvider.open({ ...mockNotification, type: "error" });

        expect(showMock).toHaveBeenCalledTimes(1);
        expect(showMock).toBeCalledWith(
            expect.objectContaining({
                color: "red",
                message: mockNotification.message,
                autoClose: 5000,
            }),
        );
    });

    // This test cover the case when the type is "progress"

    it("should render notification with undoable when type is progress", async () => {
        notificationProvider.open(mockNotificationUndoable);

        expect(showMock).toHaveBeenCalledTimes(1);
        expect(showMock).toBeCalledWith(
            expect.objectContaining({
                id: "test-notification-undoable",
                autoClose: 5000,
                icon: <RingCountdown undoableTimeout={5} />,
            }),
        );
    });

    // This test cover the case when the `close` is called

    it("should close notification", async () => {
        notificationProvider.close("");

        expect(hideMock).toBeCalledTimes(1);
    });
});
