import { withAuthorization } from "../../helpers/withAuthorization";

const Clients = () => {
  return <h1>Clients</h1>;
};

export default withAuthorization(Clients, "CONTRIBUTOR");
