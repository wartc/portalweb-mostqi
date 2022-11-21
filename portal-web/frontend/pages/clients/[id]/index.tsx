import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUser } from "../../../api/services/users";

import styles from "./ClientProfile.module.scss";
import inputStyles from "../../../styles/Input.module.scss";
import UnexpectedError from "../../../components/UnexpectedError";
import BoxContainer from "../../../components/BoxContainer";
import LoadingPage from "../../../components/LoadingPage";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

const ClientProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
  });

  if (isLoading) return <LoadingPage />;

  if (isError && (error as { status: number }).status !== 404) return <UnexpectedError />;

  if (!data) {
    return (
      <div className={styles.userNotFound}>
        <h1>Usuário não encontrado 😔</h1>
      </div>
    );
  }

  const { name, email, type, createdAt, clientDetails: { selfieUrl, dob } = {} } = data!;

  return (
    <div className={styles.container}>
      <BoxContainer className={styles.clientBoxContainer}>
        <FaChevronLeft className={styles.goBack} size="2rem" onClick={() => router.back()} />

        <div className={styles.header}>
          <Image
            src={selfieUrl!}
            alt="Foto do usuário"
            className={styles.clientSelfie}
            width={200}
            height={200}
          />
          <h1 className={styles.clientName}>{name}</h1>
        </div>

        <div className={styles.clientDetails}>
          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Email</label>
            <input className={inputStyles.input} disabled value={email} />
          </div>

          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Tipo de usuário</label>
            <input
              className={inputStyles.input}
              disabled
              value={type === "CLIENT" ? "Cliente" : "Colaborador"}
            />
          </div>

          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Cadastrado em</label>
            <input
              className={inputStyles.input}
              disabled
              value={`${new Date(createdAt!).toLocaleDateString()}, ${new Date(
                createdAt!
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
            />
          </div>

          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Data de nascimento</label>
            <input
              className={inputStyles.input}
              disabled
              value={new Date(dob!).toLocaleDateString()}
            />
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

const ClientProfileWithAuthorization: NextPageWithLayout = withAuthorization(
  ClientProfile,
  "CONTRIBUTOR"
);

ClientProfileWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientProfileWithAuthorization;
