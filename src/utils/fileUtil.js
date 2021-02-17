export const modifyFiles = (existingFiles, files) => {
  let fileToUpload = {};
  for (let i = 0; i < files.length; i++) {
    const id = i + Object.keys(existingFiles).length + 1;
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        progress: 0,
      },
    };
  }

  return fileToUpload;
};

export const extractFileName = (contentDispositionValue) => {
  var filename = "";
  if (
    contentDispositionValue &&
    contentDispositionValue.indexOf("attachment") !== -1
  ) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(contentDispositionValue);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  console.log(filename);
  return filename;
};
