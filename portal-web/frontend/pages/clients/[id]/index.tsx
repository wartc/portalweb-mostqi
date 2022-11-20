import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

import styles from "./ClientProfile.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUser } from "../../../api/services/users";
import UnexpectedError from "../../../components/UnexpectedError";

const ClientProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <UnexpectedError />;

  return (
    <div className={styles.container}>
      <h1>{data?.name} Profile</h1>
    </div>
  );
};

const ClientProfileWithAuthorization: NextPageWithLayout = withAuthorization(
  ClientProfile,
  "CONTRIBUTOR"
);

ClientProfileWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientProfileWithAuthorization;
