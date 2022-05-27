import React from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { Flex, Heading, Stack, StackProps, Text } from "@chakra-ui/react";

import { CreateButton, CreateButtonProps } from "@components";

export interface ListProps {
    canCreate?: boolean;
    createButtonProps?: CreateButtonProps;
    resource?: string;
    stackProps?: StackProps;
    stackHeaderProps?: StackProps;
    stackContentProps?: StackProps;
}

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const List: React.FC<ListProps> = ({
    canCreate,
    children,
    createButtonProps,
    resource: resourceFromProps,
    stackProps,
    stackHeaderProps,
    stackContentProps,
}) => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    return (
        <Stack {...stackProps} bg="white" borderRadius="md">
            <Stack direction="row" padding={4} {...stackHeaderProps}>
                <Heading fontWeight="semibold">
                    {translate(
                        `${resource.name}.titles.list`,
                        userFriendlyResourceName(
                            resource.label ?? resource.name,
                            "plural",
                        ),
                    )}
                </Heading>
                <Flex alignItems={"flex-end"}>
                    {isCreateButtonVisible && (
                        <CreateButton
                            resourceNameOrRouteName={resource.route}
                            data-testid="list-create-button"
                            {...createButtonProps}
                        >
                            Create
                        </CreateButton>
                    )}
                </Flex>
            </Stack>
            <Stack {...stackContentProps}>{children}</Stack>
        </Stack>
    );
};
