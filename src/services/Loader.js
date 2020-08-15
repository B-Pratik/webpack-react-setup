import loadable from "react-loadable";
import Loading from "./Loading";

const loader = (name) =>
  loadable({
    loader: () => import(`../components/${name}`),
    loading: Loading,
  });

export default loader;
