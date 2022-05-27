import React from "react";
import { LinkProps, TextProps } from "@chakra-ui/react";

import { UrlField } from "@components";

export type FileFieldProps = LinkProps &
    TextProps & {
        title?: string;
        src: string;
    };

/**
 * This field is used to display files and  uses Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography.Link>`} component.
 *
 */
export const FileField: React.FC<FileFieldProps> = ({
    title,
    src,
    ...rest
}) => {
    return (
        <UrlField value={src} title={title} {...rest}>
            {title ?? src}
        </UrlField>
    );
};
