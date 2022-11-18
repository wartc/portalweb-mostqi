import Router from "next/router";
import React from "react";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { User, UserTypes } from "../types/User";

export type WithAuthorizationProps = {
  user: User;
};

export function withAuthorization<T extends WithAuthorizationProps = WithAuthorizationProps>(
  WrappedComponent: React.ComponentType<T>,
  requiredType: UserTypes
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuthorization = (props: Omit<T, keyof WithAuthorizationProps>) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loading visible={true} />;
        </div>
      );
    }

    if (!user) {
      Router.push("/login");
      return null;
    }

    if (user.type !== requiredType) {
      Router.push(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
      return null;
    }

    return <WrappedComponent {...(props as T)} user={user} />;
  };

  ComponentWithAuthorization.displayName = `withAuthorization(${displayName})`;

  return ComponentWithAuthorization;
}
