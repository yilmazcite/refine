import React from "react";

import {
    useOne,
    useTranslate,
    MetaDataQuery,
    BaseKey,
    useResource,
} from "@pankod/refine-core";

import { Button, ButtonProps } from "@mantine/core";
import { Refresh } from "tabler-icons-react";

export type RefreshButtonProps = ButtonProps<"button"> & {
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    hideText?: boolean;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

    const { refetch, isFetching, isLoading } = useOne({
        resource: resourceName,
        id: id ?? "",
        queryOptions: {
            enabled: false,
        },
        metaData,
        liveMode: "off",
        dataProviderName,
    });

    return (
        <Button
            leftIcon={!hideText && <Refresh />}
            loading={isFetching}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            {...rest}
        >
            {hideText ? (
                <Refresh />
            ) : (
                children ?? translate("buttons.refresh", "Refresh")
            )}
        </Button>
    );
};
