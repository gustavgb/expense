export const mapGet = (data, doc) => ({
  ...data,
  amount: data.amount.toFixed(2),
  id: doc.id
})

export const mapCreate = (form) => ({
  date: form.date,
  description: form.description,
  amount: parseInt(form.amount, 10),
  tags: form.tags
})
