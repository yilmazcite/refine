import React from "react";

import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    MutationMode,
    ResourceRouterParams,
    BaseKey,
} from "@pankod/refine-core";

import {
    Card,
    CardProps,
    Text,
    Group,
    ActionIcon,
    ButtonProps,
    GroupProps,
} from "@mantine/core";
import { ArrowBack } from "tabler-icons-react";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
} from "@components";
import { DeleteButtonProps } from "@components";

export interface EditProps {
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps<"button">;
    mutationMode?: MutationMode;
    recordItemId?: BaseKey;
    canDelete?: boolean;
    deleteButtonProps?: DeleteButtonProps;
    resource?: string;
    isLoading?: boolean;
    cardProps?: CardProps<"div">;
    cardHeaderProps?: GroupProps;
    cardActionsProps?: GroupProps;
    cardContentProps?: GroupProps;
    title?: string;
}

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const Edit: React.FC<EditProps> = ({
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
    cardProps,
    cardHeaderProps,
    cardActionsProps,
    cardContentProps,
    title,
}) => {
    const translate = useTranslate();

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

    const id = recordItemId ?? idFromRoute;

    return (
        <Card {...cardProps}>
            <Group {...cardHeaderProps}>
                <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                    <ArrowBack />
                </ActionIcon>
                <Text>
                    {title
                        ? title
                        : translate(
                              `${resource.name}.titles.edit`,
                              `Edit ${userFriendlyResourceName(
                                  resource.label ?? resource.name,
                                  "singular",
                              )}`,
                          )}
                </Text>
                <>
                    {!recordItemId && (
                        <ListButton
                            data-testid="edit-list-button"
                            resourceNameOrRouteName={resource.route}
                        />
                    )}
                    <RefreshButton
                        resourceNameOrRouteName={resource.route}
                        recordItemId={id}
                    />
                </>
            </Group>
            <Group {...cardContentProps}>{children}</Group>
            <Group
                {...cardActionsProps}
                sx={{ display: "flex", justifyContent: "flex-end" }}
            >
                {actionButtons ?? (
                    <>
                        {isDeleteButtonVisible && (
                            <DeleteButton
                                data-testid="edit-delete-button"
                                mutationMode={mutationMode}
                                onSuccess={() => {
                                    list(resource.route ?? resource.name);
                                }}
                                {...deleteButtonProps}
                            />
                        )}
                        <SaveButton loading={isLoading} {...saveButtonProps} />
                    </>
                )}
            </Group>
        </Card>
    );
};
