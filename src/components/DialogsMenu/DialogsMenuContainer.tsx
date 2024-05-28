import { FC } from "react";
import "./dialogsMenu.scss";
import { DeleteOutlined } from "@ant-design/icons";
import {
  createNewDialog,
  deleteDialog,
} from "../../store/actions/dialogsActions";
import {
  setDialogs,
  setSelectedDialog,
  setShowMobileMenu,
} from "../../store/reducers/DialogsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import DialogsMenu from "./DialogsMenu";

const DialogsMenuContainer: FC = () => {
  const { userID } = useAppSelector((state) => state.auth);
  const { dialogs, selectedDialog } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();

  const onCreateNewDialog = (id: number) => {
    dispatch(createNewDialog(id));
    dispatch(setShowMobileMenu(false));
  };

  const onChangeSelectedDialog = (id: number) => {
    const newSelectedDialog = dialogs.find((item) => item.id === id);
    if (newSelectedDialog) {
      dispatch(setSelectedDialog(newSelectedDialog));
      dispatch(setShowMobileMenu(false));
    }
  };

  const onDeleteDialog = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    const status = await dispatch(deleteDialog(id));

    if (status === 200) {
      const filteredDialogs = dialogs.filter((item) => item.id !== id);
      dispatch(setDialogs(filteredDialogs));

      if (filteredDialogs.length === 0) {
        dispatch(setSelectedDialog(null));
      }
    }
  };

  const showDialogsList = dialogs.map((item) => {
    return (
      <div
        key={item.id}
        className={
          selectedDialog?.id === item.id
            ? "dialogsMenu__activeItem"
            : "dialogsMenu__item"
        }
        onClick={() => onChangeSelectedDialog(item.id)}
      >
        <div className="dialogsMenu__item_title">
          {item.content.length
            ? `${item.content[0].message.slice(0, 24)}...`
            : "Dialog is empty..."}
        </div>
        <div
          className="dialogsMenu__item_delete"
          onClick={(e) => onDeleteDialog(e, item.id)}
        >
          <DeleteOutlined
            size={28}
            style={{ fontSize: "18px", color: "#1677ff" }}
          />
        </div>
      </div>
    );
  });

  return (
    <DialogsMenu
      showDialogsList={showDialogsList}
      userID={userID}
      onCreateNewDialog={onCreateNewDialog}
      disabledAddNewDialog={dialogs[0]?.content.length === 0}
    />
  );
};

export default DialogsMenuContainer;
