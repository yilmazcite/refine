import React from "react";

import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mantine/core";
import { SquarePlus } from "tabler-icons-react";

export type CreateButtonProps = ButtonProps<"button"> & {
    resourceNameOrRouteName?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * <CreateButton> uses Material UI {@link https://mui.com/components/buttons/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
    resourceNameOrRouteName,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const { resource, resourceName } = useResource({
        resourceNameOrRouteName,
    });

    const { Link } = useRouterContext();
    const { createUrl: generateCreateUrl } = useNavigation();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "create",
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const createUrl = generateCreateUrl(resource.route!);

    return (
        <Link
            to={createUrl}
            href={createUrl}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            style={{ textDecoration: "none" }}
        >
            <Button
                disabled={data?.can === false}
                leftIcon={!hideText && <SquarePlus />}
                title={disabledTitle()}
                {...rest}
            >
                {hideText ? (
                    <SquarePlus />
                ) : (
                    children ?? translate("buttons.create", "Create")
                )}
            </Button>
        </Link>
    );
};
