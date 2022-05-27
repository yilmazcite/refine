import React from "react";

import { useTranslate, UseImportInputPropsType } from "@pankod/refine-core";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

export type ImportButtonProps = {
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
                leftIcon={<ArrowUpIcon />}
                isLoading={loading}
                variant="outline"
            >
                {!hideText &&
                    (children ?? translate("buttons.import", "Import"))}
            </Button>
        </label>
    );
};
