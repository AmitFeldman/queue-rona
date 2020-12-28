import React from 'react';
import {useDropzone} from 'react-dropzone';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const ExcelDropzone = (props) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <Box p={6}>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop files here, or click to select files</p>
          <em>(Only excel files will be accepted)</em>
        </div>
      </Box>
      <aside>
        <h4>Accepted Files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          console.log(acceptedFileItems);
        }}
        disabled={acceptedFileItems.length === 0}>
        Send Files
      </Button>
    </section>
  );
};

export default ExcelDropzone;
