import React from "react";
import { NotificationProvider } from "@pankod/refine-core";
import { Box, useToast } from "@chakra-ui/react";

import { CircularDeterminate } from "@components";

export const notificationProviderHandle = (): NotificationProvider => {
    const toast = useToast();

    const notificationProvider: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation }) => {
            if (toast.isActive(key ?? "")) {
                return;
            }

            if (type === "progress") {
                toast({
                    // eslint-disable-next-line react/display-name
                    render: () => (
                        <Box p={3} bg="white">
                            <CircularDeterminate
                                message={message}
                                undoableTimeout={undoableTimeout ?? 0}
                            />
                        </Box>
                    ),
                    id: key,
                    isClosable: false,
                    duration: (undoableTimeout ?? 0) * 1000,
                });
            } else {
                toast({
                    title: message,
                    status: type as any,
                    id: key,
                });
            }
        },
        close: (key) => {
            toast.close(key);
        },
    };

    return notificationProvider;
};
