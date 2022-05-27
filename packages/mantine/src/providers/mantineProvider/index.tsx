import React, { PropsWithChildren } from "react";
import {
    MantineProvider as MantineBaseProvider,
    MantineProviderProps as MantineBaseProviderProps,
} from "@mantine/core";
import {
    NotificationsProvider,
    NotificationProviderProps,
} from "@mantine/notifications";

type MantineProviderProps = MantineBaseProviderProps & {
    notificationProps?: NotificationProviderProps;
};

export const MantineProvider = ({
    notificationProps,
    children,
    ...props
}: PropsWithChildren<MantineProviderProps>): JSX.Element => {
    return (
        <MantineBaseProvider {...props}>
            <NotificationsProvider {...(notificationProps ?? {})}>
                {children}
            </NotificationsProvider>
        </MantineBaseProvider>
    );
};
