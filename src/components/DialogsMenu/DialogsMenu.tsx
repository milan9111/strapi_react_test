import { FC } from "react";
import { Button, Empty } from "antd";
import { FormOutlined } from "@ant-design/icons";

interface DialogsMenuProps {
  showDialogsList: JSX.Element[];
  userID: number;
  onCreateNewDialog: (id: number) => void;
  disabledAddNewDialog: boolean;
}

const DialogsMenu: FC<DialogsMenuProps> = ({
  showDialogsList,
  userID,
  onCreateNewDialog,
  disabledAddNewDialog,
}) => {
  return (
    <div className="dialogsMenu">
      <div className="dialogsMenu__container">
        <div className="dialogsMenu__newDialogBox">
          <Button
            type="primary"
            onClick={() => onCreateNewDialog(userID)}
            disabled={disabledAddNewDialog}
          >
            <FormOutlined />
          </Button>
        </div>
        <p className="dialogsMenu__title">Your dialogs:</p>
        {showDialogsList.length ? (
          <div className="dialogsMenu__dialogsBox">{showDialogsList}</div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ opacity: 0.3 }}
            description={
              <p className="dialogsMenu__emptyText">You don't have dialogs</p>
            }
          />
        )}
      </div>
    </div>
  );
};

export default DialogsMenu;
