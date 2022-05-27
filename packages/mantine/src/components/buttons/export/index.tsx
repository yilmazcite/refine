import React from "react";
import { useTranslate } from "@pankod/refine-core";

import { FileExport } from "tabler-icons-react";
import { Button, ButtonProps } from "@mantine/core";

export type ExportButtonProps = ButtonProps<"button"> & {
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
            loading={loading}
            leftIcon={!hideText && <FileExport />}
        >
            {hideText ? (
                <FileExport />
            ) : (
                children ?? translate("LoadingButtons.export", "Export")
            )}
        </Button>
    );
};
