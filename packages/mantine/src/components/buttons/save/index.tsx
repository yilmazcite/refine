import React from "react";

import { useTranslate } from "@pankod/refine-core";

import { DeviceFloppy } from "tabler-icons-react";
import { Button, ButtonProps } from "@mantine/core";

export type SaveButtonProps = ButtonProps<"button"> & {
    hideText?: boolean;
};

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <Button leftIcon={!hideText && <DeviceFloppy />} {...rest}>
            {hideText ? (
                <DeviceFloppy />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </Button>
    );
};
