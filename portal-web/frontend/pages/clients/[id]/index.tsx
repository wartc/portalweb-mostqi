import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUser } from "../../../api/services/users";

import styles from "./ClientProfile.module.scss";
import UnexpectedError from "../../../components/UnexpectedError";
import Image from "next/image";
import Loading from "../../../components/Loading";

const ClientProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
  });

  if (isLoading || !data) return <Loading visible />;

  if (isError) return <UnexpectedError />;

  const { name, email, type, createdAt, clientDetails: { selfieUrl, dob } = {} } = data!;

  return (
    <div className={styles.container}>
      <img className={styles.clientSelfie} src={selfieUrl} alt="Selfie do cliente" />
      <h1 className={styles.clientName}>{name}</h1>
      <h1>{data!.name} Profile</h1>
    </div>
  );
};

const ClientProfileWithAuthorization: NextPageWithLayout = withAuthorization(
  ClientProfile,
  "CONTRIBUTOR"
);

ClientProfileWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientProfileWithAuthorization;
