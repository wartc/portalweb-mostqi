import { NextPageWithLayout } from "../_app";
import { withAuthorization, WithAuthorizationProps } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import styles from "./UserProfile.module.scss";
import profileStyles from "../../styles/Profile.module.scss";
import inputStyles from "../../styles/Input.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { changePassword } from "../../api/services/account";

type ProfileForm = {
  currentPassword: string;
  newPassword: string;
};

const Profile = ({ user }: WithAuthorizationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();

  const handleChangePassword = ({ currentPassword, newPassword }: ProfileForm) => {
    toast.promise(changePassword(currentPassword, newPassword), {
      loading: "Alterando senha...",
      success: "Senha alterada com sucesso!",
      error: (err) => {
        if (err.data?.title) {
          return err.data.title;
        }
        return "Erro ao alterar senha";
      },
    });
  };

  return (
    <div className={profileStyles.container}>
      <h1 className={styles.pageTitle}>Meu Perfil</h1>

      <div className={styles.container}>
        <div className={profileStyles.header}>
          <Image
            src={
              user.clientDetails?.selfieUrl ||
              "https://res.cloudinary.com/dfau0o0g4/image/upload/v1669152377/portalweb/default_user_pic.png"
            }
            alt="Foto do usuário"
            className={profileStyles.clientSelfie}
            style={{ borderRadius: user.clientDetails?.selfieUrl ? "50%" : "0" }}
            width={200}
            height={200}
          />
          <h1 className={profileStyles.clientName}>{user.name}</h1>
        </div>

        <div className={profileStyles.clientDetails}>
          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Email</label>
            <input className={inputStyles.input} disabled value={user.email} />
          </div>

          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Tipo de usuário</label>
            <input
              className={inputStyles.input}
              disabled
              value={user.type === "CLIENT" ? "Cliente" : "Colaborador"}
            />
          </div>

          <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
            <label className={inputStyles.inputLabel}>Cadastrado em</label>
            <input
              className={inputStyles.input}
              disabled
              value={`${new Date(user.createdAt).toLocaleDateString()}, ${new Date(
                user.createdAt
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
            />
          </div>

          {user.clientDetails?.dob ? (
            <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
              <label className={inputStyles.inputLabel}>Data de nascimento</label>
              <input
                className={inputStyles.input}
                disabled
                value={new Date(user.clientDetails.dob).toLocaleDateString()}
              />
            </div>
          ) : null}

          <form className={styles.changePasswordForm} onSubmit={handleSubmit(handleChangePassword)}>
            <h2>Alterar senha</h2>
            <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
              <label htmlFor="currentPassword" className={inputStyles.inputLabel}>
                Senha atual
              </label>
              <input
                id="currentPassword"
                type="password"
                className={inputStyles.input}
                {...register("currentPassword", { required: true })}
              />
              {errors.currentPassword && (
                <span className={styles.errorText}>A senha atual é obrigatória</span>
              )}
            </div>

            <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
              <label htmlFor="newPassword" className={inputStyles.inputLabel}>
                Nova senha
              </label>
              <input
                id="newPassword"
                type="password"
                className={inputStyles.input}
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
                <span className={styles.errorText}>Informe uma nova senha</span>
              )}
            </div>

            <Button type="submit" secondary text="Mudar minha senha" />
          </form>
        </div>
      </div>
    </div>
  );
};

const ProfileWithAuthorization: NextPageWithLayout = withAuthorization(Profile);

ProfileWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ProfileWithAuthorization;
