import React from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    useShow,
    useTranslate,
    useUpdate,
} from "@pankod/refine-core";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    DataGrid,
    GridColumns,
    IconButton,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
    List,
    Paper,
    useMediaQuery,
    useTheme,
} from "@pankod/refine-mui";
import dayjs from "dayjs";
import GoogleMapReact from "google-map-react";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MopedIcon from "@mui/icons-material/Moped";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { MapMarker, CourierInfoBox } from "components";
import { LocationIcon, CourierIcon } from "components/icons";

import { IEvent, IOrder, IProduct } from "interfaces";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { queryResult } = useShow<IOrder>();
    const record = queryResult.data?.data;

    const { goBack } = useNavigation();
    const { mutate } = useUpdate();

    const theme = useTheme();

    const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

    const columns = React.useMemo<GridColumns<IProduct>>(
        () => [
            {
                field: "name",
                headerName: t("orders.deliverables.fields.items"),
                width: 300,
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row" spacing={4} alignItems="center">
                            <Avatar
                                sx={{ width: 108, height: 108 }}
                                src={row.images[0].url}
                            />
                            <Box>
                                <Typography
                                    variant="body1"
                                    whiteSpace="break-spaces"
                                >
                                    {row.name}
                                </Typography>
                                <Typography variant="caption">
                                    #{row.id}
                                </Typography>
                            </Box>
                        </Stack>
                    );
                },
            },
            {
                field: "quantity",
                headerName: t("orders.deliverables.fields.quantity"),
                width: 150,
                sortable: false,
                valueGetter: () => "1x",
            },
            {
                field: "price",
                headerName: t("orders.deliverables.fields.price"),
                width: 100,
                type: "number",
            },
            {
                field: "price",
                headerName: t("orders.deliverables.fields.total"),
                width: 100,
                type: "number",
            },
        ],
        [t],
    );

    const CustomFooter = () => (
        <Stack direction="row" spacing={4} justifyContent="flex-end" p={1}>
            <Typography sx={{ color: "primary.main" }} fontWeight={700}>
                {t("orders.deliverables.mainTotal")}
            </Typography>
            <Typography>{record?.amount}$</Typography>
        </Stack>
    );

    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6">
                                {t("orders.fields.orderID")}
                            </Typography>
                            <Typography variant="caption">{`#${
                                record?.orderNumber ?? ""
                            }`}</Typography>
                        </Stack>
                    }
                    avatar={
                        <IconButton onClick={goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    action={
                        <Stack direction="row" spacing={2}>
                            <Button
                                disabled={record?.status.text !== "Pending"}
                                variant="outlined"
                                size="small"
                                startIcon={<CheckOutlinedIcon />}
                                onClick={() => {
                                    if (record) {
                                        mutate({
                                            resource: "orders",
                                            id: record?.id.toString(),
                                            values: {
                                                status: {
                                                    id: 2,
                                                    text: "Ready",
                                                },
                                            },
                                        });
                                    }
                                }}
                            >
                                {t("buttons.accept")}
                            </Button>
                            <Button
                                disabled={
                                    record?.status.text === "Delivered" ||
                                    record?.status.text === "Cancelled"
                                }
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={
                                    <CloseOutlinedIcon sx={{ bg: "red" }} />
                                }
                                onClick={() => {
                                    if (record) {
                                        mutate({
                                            resource: "orders",
                                            id: record?.id.toString(),
                                            values: {
                                                status: {
                                                    id: 5,
                                                    text: "Cancelled",
                                                },
                                            },
                                        });
                                    }
                                }}
                            >
                                {t("buttons.reject")}
                            </Button>
                        </Stack>
                    }
                />
                <CardContent>
                    <Stepper
                        nonLinear
                        activeStep={record?.events.findIndex(
                            (el) => el.status === record?.status?.text,
                        )}
                        orientation={isSmallOrLess ? "vertical" : "horizontal"}
                    >
                        {record?.events.map((event: IEvent, index: number) => (
                            <Step key={index}>
                                <StepLabel
                                    optional={
                                        <Typography variant="caption">
                                            {event.date &&
                                                dayjs(event.date).format(
                                                    "L LT",
                                                )}
                                        </Typography>
                                    }
                                    error={event.status === "Cancelled"}
                                >
                                    {event.status}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
            </Card>

            <Box sx={{ height: 500 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAP_ID,
                    }}
                    defaultCenter={{
                        lat: 40.73061,
                        lng: -73.935242,
                    }}
                    defaultZoom={9}
                >
                    <MapMarker
                        key={`user-marker-${record?.user.id}`}
                        lat={record?.adress.coordinate[0]}
                        lng={record?.adress.coordinate[1]}
                    >
                        <LocationIcon sx={{ width: "36px", height: "36px" }} />
                    </MapMarker>
                    <MapMarker
                        key={`store-marker-${record?.store.id}`}
                        lat={record?.store.address.coordinate[0]}
                        lng={record?.store.address.coordinate[1]}
                    >
                        <CourierIcon sx={{ width: "64px", height: "64px" }} />
                    </MapMarker>
                </GoogleMapReact>
            </Box>

            <Paper sx={{ padding: 2 }}>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent={isSmallOrLess ? "center" : "space-between"}
                >
                    <Stack
                        direction={isSmallOrLess ? "column" : "row"}
                        alignItems={isSmallOrLess ? "center" : "flex-start"}
                        textAlign={isSmallOrLess ? "center" : "left"}
                        gap={2}
                    >
                        <Avatar
                            alt={record?.courier.name}
                            src={record?.courier.avatar[0].url}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Box>
                            <Typography>COURIER</Typography>
                            <Typography variant="h6">
                                {record?.courier.name} {record?.courier.surname}
                            </Typography>
                            <Typography variant="caption">
                                ID #{record?.courier.id}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        gap={2}
                        padding={1}
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <CourierInfoBox
                            text={t("orders.courier.phone")}
                            icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
                            value={record?.courier.gsm}
                        />
                        <CourierInfoBox
                            text={t("orders.courier.deliveryTime")}
                            icon={<MopedIcon sx={{ fontSize: 36 }} />}
                            value="15:05"
                        />
                    </Stack>
                </Stack>
            </Paper>

            <List
                cardHeaderProps={{
                    title: t("orders.deliverables.deliverables"),
                }}
            >
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={record?.products || []}
                    hideFooterPagination
                    rowHeight={124}
                    components={{
                        Footer: CustomFooter,
                    }}
                />
            </List>
        </Stack>
    );
};
