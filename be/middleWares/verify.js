const safeParseFc = (schema, data) => {
  const result = schema.safeParse(data);
  if (result.success === false) {
    console.log(result.error);
    return null
  }
  return result.data;
}

 const verify = (schema) => (req, res, next) => {
  const result = safeParseFc(schema, req.body)
  if (!result) return res.sendStatus(400)
  next()
}

module.exports = { verify }
