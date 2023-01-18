import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationTool = ({ page, setPage }) => {
  const handleChange = (event, nexPage) => {
    setPage(page);
  };

  return (
    <Stack spacing={2}>
      <Pagination page={page} onChange={handleChange} sx={{color:"white", display:"flex", justifyContent:"center" }} showFirstButton showLastButton />
    </Stack>
  );
};

export default PaginationTool;
