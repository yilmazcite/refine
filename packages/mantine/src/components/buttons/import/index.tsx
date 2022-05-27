import React from "react";

import { Button, ButtonProps } from "@mantine/core";
import { FileImport } from "tabler-icons-react";

import { useTranslate, UseImportInputPropsType } from "@pankod/refine-core";

export type ImportButtonProps = ButtonProps<"button"> & {
    inputProps: UseImportInputPropsType;
    hideText?: boolean;
    loading?: boolean;
};

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses Material UI {@link https://mui.com/components/buttons/  `<Button>`} .
 *
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
    inputProps,
    hideText = false,
    loading = false,
    children,
}) => {
    const translate = useTranslate();

    return (
        <label htmlFor="contained-button-file">
            <input {...inputProps} id="contained-button-file" multiple hidden />
            <Button
                component="span"
                leftIcon={!hideText && <FileImport />}
                loading={loading}
            >
                {hideText ? (
                    <FileImport />
                ) : (
                    children ?? translate("buttons.import", "Import")
                )}
            </Button>
        </label>
    );
};
