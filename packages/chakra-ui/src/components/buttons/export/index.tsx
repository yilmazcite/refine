import React from "react";
import { useTranslate } from "@pankod/refine-core";

import { Button, ButtonProps } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

export type ExportButtonProps = ButtonProps & {
    hideText?: boolean;
    loading?: boolean;
};

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    loading = false,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <Button
            {...rest}
            isLoading={loading}
            leftIcon={<DownloadIcon />}
            variant="outline"
        >
            {!hideText && (children ?? translate("buttons.export", "Export"))}
        </Button>
    );
};
