import Modal from "react-modal";

const defaultStyle: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    translate: "-50% -50%",
    padding: "60px",
  },
};

const RegistratedModal = (props: Modal.Props) => {
  return <Modal closeTimeoutMS={150} {...props} style={defaultStyle} />;
};

export default RegistratedModal;
