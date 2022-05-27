import React from "react";
import { IResourceComponentsProps, useSelect } from "@pankod/refine-core";

import {
    Create,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@pankod/refine-chakra-ui";
import { useForm } from "@pankod/refine-react-hook-form";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { errors },
        saveButtonProps,
    } = useForm();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form onSubmit={handleSubmit(onFinish)}>
                <FormControl isInvalid={errors.title} isRequired>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        placeholder="Title"
                        {...register("title", {
                            required: "This field is required",
                            minLength: {
                                value: 4,
                                message: "Minimum length should be 4",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.status} isRequired>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select {...register("status")}>
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </Select>
                </FormControl>

                <FormControl isInvalid={errors.category} isRequired>
                    <FormLabel htmlFor="category.id">Category</FormLabel>
                    <Select
                        {...register("category.id", {
                            required: "This field is required",
                        })}
                    >
                        <option value={""} disabled>
                            Please select
                        </option>
                        {options?.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.category && errors.category.id.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.content} isRequired>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                        {...register("content", {
                            required: "This field is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.content && errors.content.message}
                    </FormErrorMessage>
                </FormControl>
                <br />
            </form>
        </Create>
    );
};
