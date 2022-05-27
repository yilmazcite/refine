import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { IconProps, Tooltip, TooltipProps } from "@chakra-ui/react";
import React from "react";

import { FieldProps } from "src/interfaces/field";

type AbstractTooltipProps = Omit<TooltipProps, "title" | "children"> & {
    children?: React.ReactElement;
    title?: NonNullable<React.ReactNode>;
};

export type BooleanFieldProps = FieldProps<unknown> &
    AbstractTooltipProps & {
        valueLabelTrue?: string;
        valueLabelFalse?: string;
        trueIcon?: React.FC | object;
        falseIcon?: React.FC | object;
        svgIconProps?: IconProps;
    };

/**
 * This field is used to display boolean values. It uses the {@link https://chakra-ui.com/docs/components/overlay/tooltip `<Tooltip>`} values from Chakra UI.
 *
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
    value,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    trueIcon,
    falseIcon,
    svgIconProps,
    ...rest
}) => {
    return (
        <Tooltip {...rest} title={value ? valueLabelTrue : valueLabelFalse}>
            {value ? (
                <span>{trueIcon ?? <CheckIcon {...svgIconProps} />}</span>
            ) : (
                <span>{falseIcon ?? <CloseIcon {...svgIconProps} />}</span>
            )}
        </Tooltip>
    );
};
