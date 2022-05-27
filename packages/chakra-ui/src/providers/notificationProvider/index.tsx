import React from "react";
import { NotificationProvider } from "@pankod/refine-core";

import { useToast } from "@chakra-ui/react";

export const notificationProviderHandle = (): NotificationProvider => {
    const toast = useToast();

    const notificationProvider: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation }) => {
            /*  if (type === "progress") {
                const action = (key: any) => (
                    <IconButton
                        onClick={() => {
                            cancelMutation?.();
                            closeSnackbar(key);
                        }}
                    >
                        <UndoOutlined color="secondary" />
                    </IconButton>
                );
                enqueueSnackbar(
                    <>
                        <CircularDeterminate
                            undoableTimeout={undoableTimeout ?? 0}
                            message={message}
                        />
                    </>,
                    {
                        action,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        preventDuplicate: true,
                        key,
                        autoHideDuration: (undoableTimeout ?? 0) * 1000,
                        disableWindowBlurListener: true,
                    },
                );
            } else { */
            /*       enqueueSnackbar(message, {
                variant: type,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                disableWindowBlurListener: true,
            }); */

            toast({
                title: message,
                status: type as any,
                id: key,
            });
            /*  } */
        },
        close: (key) => {
            toast.close(key);
        },
    };

    return notificationProvider;
};
