function querySuccess(affectedRows) {
  return affectedRows === 1 || affectedRows > 1;
}

export {querySuccess};