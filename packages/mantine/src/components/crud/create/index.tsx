import React from "react";

import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
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

import { SaveButton } from "@components";

export interface CreateProps {
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps<"button">;
    resource?: string;
    isLoading?: boolean;
    cardProps?: CardProps<"div">;
    cardHeadreProps?: GroupProps;
    cardActionsProps?: GroupProps;
    cardContentProps?: GroupProps;
    title?: string;
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
    cardProps,
    cardHeadreProps,
    cardActionsProps,
    cardContentProps,
    title,
}) => {
    const { goBack } = useNavigation();

    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    return (
        <Card {...cardProps}>
            <Group {...cardHeadreProps}>
                <Text title={title}>
                    <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                        <ArrowBack />
                    </ActionIcon>
                    {title
                        ? title
                        : translate(
                              `${resource.name}.titles.create`,
                              `Create ${userFriendlyResourceName(
                                  resource.label ?? resource.name,
                                  "singular",
                              )}`,
                          )}
                </Text>
            </Group>
            <Group {...cardContentProps}>{children}</Group>
            <Group
                {...cardActionsProps}
                sx={{ display: "flex", justifyContent: "flex-end" }}
            >
                {actionButtons ?? (
                    <SaveButton loading={isLoading} {...saveButtonProps} />
                )}
            </Group>
        </Card>
    );
};
