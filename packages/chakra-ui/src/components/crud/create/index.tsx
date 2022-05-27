import React from "react";

import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { StackProps, Stack, Button, Text } from "@chakra-ui/react";

import { SaveButton, SaveButtonProps } from "@components";
import { ArrowBackIcon } from "@chakra-ui/icons";

export interface CreateProps {
    actionButtons?: React.ReactNode;
    saveButtonProps?: SaveButtonProps;
    resource?: string;
    isLoading?: boolean;
    stackProps?: StackProps;
    stackHeaderProps?: StackProps;
    stackContentProps?: StackProps;
    stackActionsProps?: StackProps;
}

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 */
export const Create: React.FC<CreateProps> = ({
    actionButtons,
    children,
    saveButtonProps,
    resource: resourceFromProps,
    isLoading = false,
    stackProps,
    stackHeaderProps,
    stackContentProps,
    stackActionsProps,
}) => {
    const { goBack } = useNavigation();

    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    return (
        <>
            <Stack {...stackProps}>
                <Stack
                    direction="row"
                    spacing={4}
                    alignItems="start"
                    {...stackHeaderProps}
                >
                    <Button
                        onClick={routeFromAction ? goBack : undefined}
                        leftIcon={<ArrowBackIcon />}
                    />
                    <Text fontWeight="semibold">
                        {translate(
                            `${resource.name}.titles.create`,
                            `Create ${userFriendlyResourceName(
                                resource.label ?? resource.name,
                                "singular",
                            )}`,
                        )}
                    </Text>
                </Stack>
                <Stack {...stackContentProps}>{children}</Stack>
                <Stack
                    display={"flex"}
                    justifyContent="flex-end"
                    {...stackActionsProps}
                >
                    {actionButtons ?? (
                        <>
                            <SaveButton
                                isLoading={isLoading}
                                {...saveButtonProps}
                            />
                        </>
                    )}
                </Stack>
            </Stack>
        </>
    );
};
