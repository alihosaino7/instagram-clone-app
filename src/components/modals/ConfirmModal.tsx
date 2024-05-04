import { modalUiActions } from "../../features/modal/modalSlice";
import { ModalType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Modal } from "../common/Modal";

const ConfirmModal = ({ onClose }: ModalType) => {
  const dispatch = useAppDispatch();
  const { warningTitle, onConfirm } = useAppSelector((state) => state.modal);

  return (
    <Modal>
      <Modal.Box className="bg-white rounded-lg text-center relative overflow-hidden">
        {/* {loading && <LoadingLayer />} */}
        <div className="p-8 text-center">
          <h2 className="text-xl font-medium">{warningTitle}</h2>
        </div>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="text-red-500 font-semibold block text-center border-t border-[#ccc] py-4 w-full hover:bg-gray-200"
        >
          Yes
        </button>
        <button
          onClick={() => dispatch(modalUiActions.closeConfirmLogoutModal())}
          className="border-t border-[#ccc] py-4 block text-center w-full hover:bg-gray-200"
        >
          Cancel
        </button>
      </Modal.Box>
    </Modal>
  );
};

export default ConfirmModal;
