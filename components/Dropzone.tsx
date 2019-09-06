import * as React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

interface Props {
  dropzoneOptions: DropzoneOptions;
}

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    dropzone: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey[400],
      outline: 'none',
      transition: 'border .24s ease-in-out',
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },
    dragActive: {
      borderColor: theme.palette.primary.main,
    },
    dragAccept: {
      borderColor: theme.palette.primary.main,
    },
    dragReject: {
      borderColor: theme.palette.error.main,
    },
  }),
);

const Dropzone = React.memo<Props>(function Dropzone({ dropzoneOptions }) {
  const classes = useStyles();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: false,
    accept: 'image/*',
    ...dropzoneOptions,
  });

  return (
    <div
      {...getRootProps({
        className: clsx(classes.dropzone, {
          [classes.dragActive]: isDragActive,
          [classes.dragAccept]: isDragAccept,
          [classes.dragReject]: isDragReject,
        }),
      })}
    >
      <input {...getInputProps()} />
      <p>Drag and drop one image here, or click to select file</p>
      <em>(Only *.jpeg and *.png images will be accepted)</em>
    </div>
  );
});

export default Dropzone;
