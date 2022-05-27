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
import { Button, ButtonProps, Dialog, Group, Text } from "@mantine/core";
import { Trash } from "tabler-icons-react";

export type DeleteButtonProps = ButtonProps<"button"> & {
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseOnConfirm = () => {
        setOpen(false);
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
        <div>
            <Button
                onClick={handleClickOpen}
                disabled={data?.can === false}
                loading={id === variables?.id && isLoading}
                leftIcon={!hideText && <Trash />}
                {...rest}
            >
                {hideText ? (
                    <Trash />
                ) : (
                    children ?? translate("buttons.delete", "Delete")
                )}
            </Button>
            <Dialog
                opened={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                    {confirmTitle ??
                        translate("buttons.confirm", "Are you sure?")}
                </Text>
                <Group align="flex-end">
                    <Button onClick={handleClose}>
                        {confirmCancelText ??
                            translate("buttons.cancel", "Cancel")}
                    </Button>
                    <Button onClick={handleCloseOnConfirm} autoFocus>
                        {confirmOkText ?? translate("buttons.delete", "Delete")}
                    </Button>
                </Group>
            </Dialog>
        </div>
    );
};
