import { NextPageWithLayout } from "../_app";
import { withAuthorization, WithAuthorizationProps } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

const Profile = ({ user }: WithAuthorizationProps) => {
  return <h1>{user.name} profile!</h1>;
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(Profile);

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
