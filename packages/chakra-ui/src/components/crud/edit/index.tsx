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
    Button,
    Flex,
    Heading,
    Stack,
    StackProps,
    Text,
    Wrap,
} from "@chakra-ui/react";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
    SaveButtonProps,
} from "@components";
import { DeleteButtonProps } from "@components";
import { ArrowBackIcon } from "@chakra-ui/icons";

export interface EditProps {
    actionButtons?: React.ReactNode;
    saveButtonProps?: SaveButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: BaseKey;
    canDelete?: boolean;
    deleteButtonProps?: DeleteButtonProps;
    resource?: string;
    isLoading?: boolean;
    stackProps?: StackProps;
    stackHeaderProps?: StackProps;
    stackContentProps?: StackProps;
    stackActionsProps?: StackProps;
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
    stackProps,
    stackHeaderProps,
    stackContentProps,
    stackActionsProps,
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
        <Stack {...stackProps} bg="white" borderRadius="md" padding={4}>
            <Stack direction="row" spacing={4} {...stackHeaderProps}>
                <Button
                    onClick={routeFromAction ? goBack : undefined}
                    leftIcon={<ArrowBackIcon />}
                    background="transparent"
                />
                <Heading fontWeight="semibold">
                    {translate(
                        `${resource.name}.titles.edit`,
                        `Edit ${userFriendlyResourceName(
                            resource.label ?? resource.name,
                            "singular",
                        )}`,
                    )}
                </Heading>
                <Wrap>
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
                </Wrap>
            </Stack>

            <Stack {...stackContentProps}>{children}</Stack>
            <Stack
                display={"flex"}
                justifyContent="flex-end"
                {...stackActionsProps}
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
                        <SaveButton
                            isLoading={isLoading}
                            {...saveButtonProps}
                        />
                    </>
                )}
            </Stack>
        </Stack>
    );
};
