import React, { ReactNode } from "react";

import { Tag, TagProps } from "@chakra-ui/react";

import { FieldProps } from "src/interfaces/field";

export type TagFieldProps = FieldProps<ReactNode> & TagProps;

/**
 * This field lets you display a value in a tag. It uses Chakra UI {@link https://chakra-ui.com/docs/components/data-display/tag `<Tag>`} component.
 *
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
    return <Tag {...rest}>{value?.toString()}</Tag>;
};
