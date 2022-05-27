import { useMemo } from "react";
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    MantineProvider,
    useMediaQuery,
} from "@pankod/refine-mantine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
// import { BasicDataGrid } from "pages/dataGrid";
// import { DataGridWithForm } from "pages/dataGridWithForm";
// import { PostCreate, PostEdit, PostList } from "pages/reactHookForm";
// import {
//     UseStepsList,
//     UseStepsFormCreate,
//     UseStepsFormEdit,
// } from "pages/useStepsForm";

import { DemoList } from "pages/demo";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = useMemo(
        () => (prefersDarkMode ? "dark" : "light"),
        [prefersDarkMode],
    );

    return (
        <MantineProvider theme={{ colorScheme: theme }}>
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: DemoList,
                        options: {
                            route: "demo-list",
                            label: "Demo List",
                        },
                    },
                    // {
                    //     name: "posts",
                    //     list: UseStepsList,
                    //     create: UseStepsFormCreate,
                    //     edit: UseStepsFormEdit,
                    //     options: {
                    //         route: "use-steps-form",
                    //         label: "useStepsForm",
                    //     },
                    // },
                    // {
                    //     name: "posts",
                    //     list: PostList,
                    //     create: PostCreate,
                    //     edit: PostEdit,
                    //     options: {
                    //         route: "refine-react-hook-form",
                    //         label: "React Hook Form",
                    //     },
                    // },
                    // {
                    //     name: "posts",
                    //     list: BasicDataGrid,
                    //     options: {
                    //         route: "basic-data-grid",
                    //         label: "useDataGrid",
                    //     },
                    // },
                    // {
                    //     name: "posts",
                    //     list: DataGridWithForm,
                    //     options: {
                    //         route: "data-grid-with-form",
                    //         label: "DataGrid with Form",
                    //     },
                    // },
                ]}
            />
        </MantineProvider>
    );
};

export default App;
