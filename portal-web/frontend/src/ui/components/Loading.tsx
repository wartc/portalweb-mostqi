import { FallingLines } from "react-loader-spinner";

type LoadingProps = {
  visible: boolean;
};

const Loading = ({ visible }: LoadingProps) => {
  return (
    <FallingLines color="tomato" width="80" height="80" visible={visible} />
  );
};

export default Loading;
