import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { Layout, RefineList, Edit } from "@pankod/refine-chakra-ui";
import { PostList, PostCreate, PostEdit } from "./pages/posts";

const Hede = () => <RefineList>Page</RefineList>;
const EditView = () => <Edit>Page</Edit>;

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                },
                {
                    name: "categories",
                    list: Hede,
                    create: Hede,
                    edit: EditView,
                },
                {
                    name: "Mantine",
                    list: Hede,
                    create: Hede,
                    edit: EditView,
                    options: {
                        label: "Mantine",
                    },
                },
            ]}
            Layout={Layout}
        />
    );
};

export default App;
