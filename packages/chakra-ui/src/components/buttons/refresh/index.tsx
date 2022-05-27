import React from "react";

import {
    useOne,
    useTranslate,
    MetaDataQuery,
    BaseKey,
    useResource,
} from "@pankod/refine-core";
import { Button, ButtonProps } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

export type RefreshButtonProps = ButtonProps & {
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

    const { refetch, isFetching } = useOne({
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
            leftIcon={<RepeatIcon />}
            isLoading={isFetching}
            onClick={(e) => (onClick ? onClick(e) : refetch())}
            variant="outline"
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.refresh", "Refresh"))}
        </Button>
    );
};
