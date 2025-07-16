import React, { useState } from "react";
import { Box, Button, IconButton, Paper, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const Input = styled("input")({
  display: "none",
});

const PreviewImage = styled("img")({
  width: "100%",
  height: "auto",
  maxHeight: "200px",
  objectFit: "contain",
  borderRadius: "4px",
});

const FileUploadContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const FileUpload = ({
  onFileSelect,
  selectedFiles = [],
  onFileRemove,
  name,
  onChange,
}) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onFileSelect([...selectedFiles, ...files]);
    if (onChange) {
      onChange(event);
    }
  };

  const handleRemoveFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    onFileRemove(newSelectedFiles);
  };

  const renderPreviews = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return null;
    }

    return selectedFiles.map((file, index) => {
      const key = file.name ? `${file.name}-${index}` : `file-${index}`;
      let preview;

      if (typeof file === "string") {
        // Existing file from server
        if (file.match(/\.(jpeg|jpg|gif|png)$/i)) {
          preview = <PreviewImage src={file} alt="Preview" />;
        } else {
          preview = (
            <Link href={file} target="_blank" rel="noopener noreferrer">
              <Typography variant="body1">{file.split("/").pop()}</Typography>
            </Link>
          );
        }
      } else if (file instanceof File) {
        // New file from local
        if (file.type.startsWith("image/")) {
          preview = <PreviewImage src={URL.createObjectURL(file)} alt="Preview" />;
        } else {
          preview = (
            <Link
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body1">{file.name}</Typography>
            </Link>
          );
        }
      }

      return (
        <Box key={key} sx={{ position: "relative", m: 1, display: "inline-flex", alignItems: "center" }}>
          {preview}
          {/* Only show DeleteIcon if there is a file in preview */}
          {((typeof file === "string" && file) || (file instanceof File)) && (
            <IconButton
              size="small"
              onClick={() => handleRemoveFile(index)}
              sx={{
                position: "absolute",
                top: -5,
                right: -5,
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      );
    });
  };

  return (
    <FileUploadContainer elevation={0}>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
        {renderPreviews()}
      </Box>
      <Box>
        <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Drag & drop files here, or click to select files
        </Typography>
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            multiple
            type="file"
            name={name}
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Select Files
          </Button>
        </label>
      </Box>
    </FileUploadContainer>
  );
};

export default FileUpload;