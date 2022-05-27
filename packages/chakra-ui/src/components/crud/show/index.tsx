import React from "react";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    ResourceRouterParams,
    userFriendlyResourceName,
    BaseKey,
} from "@pankod/refine-core";
import { Button, Stack, StackProps, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    EditButton,
} from "@components";

export interface ShowProps {
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
    isLoading?: boolean;
    resource?: string;
    recordItemId?: BaseKey;
    stackProps?: StackProps;
    stackHeaderProps?: StackProps;
    stackContentProps?: StackProps;
    stackActionsProps?: StackProps;
}

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const Show: React.FC<ShowProps> = ({
    canEdit,
    canDelete,
    actionButtons,
    isLoading = false,
    children,
    resource: resourceFromProps,
    recordItemId,
    stackProps,
    stackHeaderProps,
    stackContentProps,
    stackActionsProps,
}) => {
    const translate = useTranslate();

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible = canDelete ?? resource.canDelete;

    const isEditButtonVisible = canEdit ?? resource.canEdit;

    const id = recordItemId ?? idFromRoute;

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
                            `${resource.name}.titles.show`,
                            `Show ${userFriendlyResourceName(
                                resource.label ?? resource.name,
                                "singular",
                            )}`,
                        )}
                    </Text>
                    <Stack
                        display={"flex"}
                        justifyContent="flex-end"
                        spacing={4}
                    >
                        {!recordItemId && (
                            <ListButton
                                data-testid="show-list-button"
                                resourceNameOrRouteName={resource.route}
                            />
                        )}
                        {isEditButtonVisible && (
                            <EditButton
                                disabled={isLoading}
                                data-testid="show-edit-button"
                                resourceNameOrRouteName={resource.route}
                                recordItemId={id}
                            />
                        )}
                        {isDeleteButtonVisible && (
                            <DeleteButton
                                resourceNameOrRouteName={resource.route}
                                data-testid="show-delete-button"
                                recordItemId={id}
                                onSuccess={() =>
                                    list(resource.route ?? resource.name)
                                }
                            />
                        )}
                        <RefreshButton
                            resourceNameOrRouteName={resource.route}
                            recordItemId={id}
                        />
                    </Stack>
                </Stack>

                <Stack {...stackContentProps}>{children}</Stack>
                <Stack
                    display={"flex"}
                    justifyContent="flex-end"
                    {...stackActionsProps}
                >
                    {actionButtons ? actionButtons : undefined}
                </Stack>
            </Stack>
        </>
    );
};
