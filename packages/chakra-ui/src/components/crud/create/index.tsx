import React from "react";

import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { StackProps, Stack, Button, Text, Heading } from "@chakra-ui/react";

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
            <Stack {...stackProps} bg="white" borderRadius="md" padding={4}>
                <Stack direction="row" spacing={4} {...stackHeaderProps}>
                    <Button
                        onClick={routeFromAction ? goBack : undefined}
                        bg="transparent"
                        size="lg"
                        variant="ghost"
                        leftIcon={<ArrowBackIcon />}
                    />
                    <Heading fontWeight="semibold">
                        {translate(
                            `${resource.name}.titles.create`,
                            `Create ${userFriendlyResourceName(
                                resource.label ?? resource.name,
                                "singular",
                            )}`,
                        )}
                    </Heading>
                </Stack>
                <Stack {...stackContentProps} padding={6}>
                    {children}
                </Stack>
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
