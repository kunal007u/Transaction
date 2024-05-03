import { RxCross2 } from "react-icons/rx";
import {  Dialog, DialogTitle, IconButton } from '@mui/material';
import React from 'react';


const DialogForm = ({
    scroll,
    maxWidth,
    openDialog,
    handleDialogClose,
    title,
    className,
    bodyContent,
    disableEnforceFocus,
    paperProps,
}) => {

    return (
        <Dialog
            open={openDialog}
            // onClose={handleDialogClose}
            className={`${className}`}
            scroll={scroll}
            maxWidth={maxWidth}
            PaperProps={paperProps}
            disableEnforceFocus={disableEnforceFocus}
        >

            <div className="d-flex" >
                {
                    title && (
                        <DialogTitle className='dialog-title'>
                            {title}
                        </DialogTitle>
                    )
                }

                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 99999,
                    }}
                >
                    <RxCross2 style={{ color: '#024d81' }} />
                </IconButton>
            </div>
            {bodyContent}
        </Dialog>
    );
};

export default DialogForm;