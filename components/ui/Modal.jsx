import React from 'react'
import ReactModal from 'react-modal'

import styles from './styles/Modal.module.scss'

const Modal = ({ children, isOpen, handleClose, width = '', height = '' }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className={`${styles.modal} ${width} ${height}`}
      overlayClassName={styles.overlay}
      closeTimeoutMS={500}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
