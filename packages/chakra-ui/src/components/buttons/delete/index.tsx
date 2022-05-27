import React from "react";
import {
    useDelete,
    useTranslate,
    useMutationMode,
    useCan,
    MutationMode,
    SuccessErrorNotification,
    MetaDataQuery,
    BaseKey,
    DeleteOneResponse,
    useResource,
} from "@pankod/refine-core";
import {
    Button,
    ButtonGroup,
    ButtonProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export type DeleteButtonProps = ButtonProps & {
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    onSuccess?: (value: DeleteOneResponse) => void;
    mutationMode?: MutationMode;
    hideText?: boolean;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
    ignoreAccessControlProvider?: boolean;
    confirmTitle?: string;
    confirmOkText?: string;
    confirmCancelText?: string;
} & SuccessErrorNotification;

/**
 * `<DeleteButton>` uses Material UI {@link https://mui.com/components/buttons/  `<Button>`} and {@link https://ant.design/components/button/ `<Popconfirm>`} components.
 * When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    hideText = false,
    ignoreAccessControlProvider = false,
    metaData,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    ...rest
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { resourceName, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { mutate, isLoading, variables } = useDelete();

    const { data } = useCan({
        resource: resourceName,
        action: "delete",
        params: { id },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    const handleCloseOnConfirm = () => {
        onClose();
        mutate(
            {
                id: id ?? "",
                resource: resourceName,
                mutationMode,
                successNotification,
                errorNotification,
                metaData,
                dataProviderName,
            },
            {
                onSuccess: (value) => {
                    onSuccess && onSuccess(value);
                },
            },
        );
    };

    return (
        <>
            <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverTrigger>
                    <Button
                        colorScheme="red"
                        onClick={onOpen}
                        variant="outline"
                        leftIcon={<DeleteIcon />}
                        {...rest}
                    >
                        {!hideText &&
                            (children ?? translate("buttons.delete", "Delete"))}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        {confirmTitle ??
                            translate("buttons.confirm", "Are you sure?")}
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                            <Button variant="outline" onClick={onClose}>
                                {confirmCancelText ??
                                    translate("buttons.cancel", "Cancel")}
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleCloseOnConfirm}
                            >
                                {confirmOkText ??
                                    translate("buttons.delete", "Delete")}
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    );
};
