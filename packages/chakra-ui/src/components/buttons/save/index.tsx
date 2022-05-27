import React from "react";

import { useTranslate } from "@pankod/refine-core";
import { Button, ButtonProps } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export type SaveButtonProps = ButtonProps & {
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
        <Button leftIcon={<CheckIcon />} variant="outline" {...rest}>
            {!hideText && (children ?? translate("buttons.save", "Save"))}
        </Button>
    );
};
