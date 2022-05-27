import React from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { Card, CardProps, Text, Group, GroupProps } from "@mantine/core";
import { ArrowBack } from "tabler-icons-react";

import { CreateButton, CreateButtonProps } from "@components";

export interface ListProps {
    canCreate?: boolean;
    createButtonProps?: CreateButtonProps;
    resource?: string;
    cardProps?: CardProps<"div">;
    cardHeaderProps?: GroupProps;
    cardContentProps?: GroupProps;
    title?: string;
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
    cardProps,
    cardHeaderProps,
    cardContentProps,
    title,
}) => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    return (
        <Card {...cardProps}>
            <Group {...cardHeaderProps}>
                <Text>
                    {title
                        ? title
                        : translate(
                              `${resource.name}.titles.list`,
                              userFriendlyResourceName(
                                  resource.label ?? resource.name,
                                  "plural",
                              ),
                          )}
                </Text>
                {isCreateButtonVisible && (
                    <CreateButton
                        resourceNameOrRouteName={resource.route}
                        data-testid="list-create-button"
                        {...createButtonProps}
                    />
                )}
            </Group>
            <Group {...cardContentProps}>{children}</Group>
        </Card>
    );
};
